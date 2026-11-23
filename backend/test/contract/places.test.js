import test from 'node:test';
import assert from 'node:assert/strict';
import { once } from 'node:events';
import { createApp } from '../../src/app.js';
import { createFixtureCatalogue } from '../../src/fixtures.js';

async function serve(t, overrides = {}) {
  const app = createApp({
    loadCatalogue: createFixtureCatalogue,
    cursorSecret: 'synthetic-http-test-secret-not-a-real-key',
    now: () => Date.parse('2026-11-19T03:00:00.000Z'),
    ...overrides,
  });
  const server = app.listen(0, '127.0.0.1');
  await once(server, 'listening');
  t.after(
    () =>
      new Promise((resolve, reject) => {
        server.close((error) => (error ? reject(error) : resolve()));
        server.closeAllConnections();
      }),
  );
  return (path, options) =>
    fetch(`http://127.0.0.1:${server.address().port}${path}`, options);
}

async function readProblem(response) {
  assert.match(
    response.headers.get('content-type'),
    /^application\/problem\+json/,
  );
  return response.json();
}

function assertPlaceShape(place) {
  assert.deepEqual(
    Object.keys(place).sort(),
    [
      'id',
      'name',
      'type',
      'district',
      'priceLevel',
      'indoor',
      'ticketPriceVnd',
      'openingHours',
    ].sort(),
  );
  assert.equal(typeof place.id, 'string');
  assert.equal(typeof place.name, 'string');
  assert.equal(typeof place.type, 'string');
  assert.equal(typeof place.district, 'string');
  assert.ok(place.priceLevel >= 1 && place.priceLevel <= 4);
  assert.equal(typeof place.indoor, 'boolean');
  assert.ok(Number.isInteger(place.ticketPriceVnd));
  assert.ok(place.ticketPriceVnd >= 0);
  assert.equal(place.openingHours.length, 7);
  assert.deepEqual(
    place.openingHours.map((day) => day.weekday),
    [1, 2, 3, 4, 5, 6, 7],
  );
  for (const day of place.openingHours) {
    assert.ok(Array.isArray(day.intervals));
    for (const interval of day.intervals) {
      assert.ok(Number.isInteger(interval.startMinute));
      assert.ok(Number.isInteger(interval.endMinute));
      assert.ok(interval.startMinute < interval.endMinute);
    }
  }
}

test('HTTP success is public JSON and cursor pages preserve the response shape', async (t) => {
  const request = await serve(t);
  const response = await request('/places?limit=2');
  assert.equal(response.status, 200);
  assert.match(response.headers.get('content-type'), /^application\/json/);
  const page = await response.json();
  assert.equal(page.items.length, 2);
  assert.equal(typeof page.nextCursor, 'string');
  const next = await (
    await request(`/places?limit=2&cursor=${page.nextCursor}`)
  ).json();
  assert.equal(next.evaluatedAt, page.evaluatedAt);
  assert.ok(
    next.items.every((p) => !page.items.some((old) => old.id === p.id)),
  );
  const withHeader = await (
    await request('/places?limit=2', {
      headers: { Authorization: 'Bearer synthetic-user-b' },
    })
  ).json();
  assert.deepEqual(withHeader, page);
  assert.deepEqual(
    page.items.map((place) => place.id),
    [...page.items.map((place) => place.id)].sort(),
  );
  page.items.forEach(assertPlaceShape);
});

test('HTTP filters combine with AND and well-formed unknown slugs return 200 empty pages', async (t) => {
  const request = await serve(t);

  const filteredResponse = await request(
    '/places?type=cafe&district=district-1&priceLevel=1&openNow=false&limit=100',
  );
  assert.equal(filteredResponse.status, 200);
  const filtered = await filteredResponse.json();
  assert.deepEqual(
    filtered.items.map((place) => place.id),
    ['fixture-cafe-001'],
  );

  for (const query of ['type=unknown-type', 'district=unknown-district']) {
    const response = await request(`/places?${query}`);
    assert.equal(response.status, 200);
    assert.deepEqual(await response.json(), {
      items: [],
      nextCursor: null,
      evaluatedAt: '2026-11-19T03:00:00.000Z',
    });
  }
});

test('HTTP validation reports duplicate parameters and rejects private selectors', async (t) => {
  const request = await serve(t);
  for (const query of [
    'limit=2&limit=2',
    'userId=another-user',
    'ownerId=another-owner',
    'groupId=another-group',
    'cursor=broken',
  ]) {
    const response = await request(`/places?${query}`);
    assert.equal(response.status, 400);
    assert.match(
      response.headers.get('content-type'),
      /^application\/problem\+json/,
    );
    const body = await response.json();
    assert.equal(body.type, '/problems/validation');
    assert.equal(body.status, 400);
    assert.ok(body.errors.length > 0);
  }
});

test('HTTP validation rejects malformed ordinary values and sorts aggregate errors', async (t) => {
  const request = await serve(t);
  const response = await request(
    '/places?openNow=1&type=Cafe&limit=0&priceLevel=cheap&cursor=broken',
  );
  assert.equal(response.status, 400);
  const body = await readProblem(response);
  assert.equal(body.type, '/problems/validation');
  assert.equal(body.title, 'Invalid request');
  assert.equal(body.status, 400);
  assert.deepEqual(
    body.errors.map((error) => error.parameter),
    ['limit', 'openNow', 'priceLevel', 'type'],
  );
  assert.ok(body.errors.every((error) => typeof error.detail === 'string'));
});

test('HTTP cursor rejects a changed limit and changed filters', async (t) => {
  const request = await serve(t);
  const first = await (await request('/places?limit=1&type=cafe')).json();

  for (const query of [
    `limit=2&type=cafe&cursor=${first.nextCursor}`,
    `limit=1&type=museum&cursor=${first.nextCursor}`,
    `limit=1&type=cafe&cursor=${first.nextCursor.slice(0, -2)}xx`,
  ]) {
    const response = await request(`/places?${query}`);
    assert.equal(response.status, 400);
    const body = await readProblem(response);
    assert.equal(body.type, '/problems/validation');
    assert.equal(body.errors[0].parameter, 'cursor');
  }
});

test('HTTP does not accept writes or authorization-dependent private access', async (t) => {
  const request = await serve(t);
  const publicPage = await request('/places?limit=1');
  assert.equal(publicPage.status, 200);
  const publicBody = await publicPage.json();

  const authorizedPage = await request('/places?limit=1', {
    headers: { Authorization: 'Bearer synthetic-user-b' },
  });
  assert.equal(authorizedPage.status, 200);
  assert.deepEqual(await authorizedPage.json(), publicBody);
  assert.ok(
    publicBody.items.every(
      (place) =>
        !Object.hasOwn(place, 'ownerId') &&
        !Object.hasOwn(place, 'ownerEmail') &&
        !Object.hasOwn(place, 'groupId'),
    ),
  );

  const writeResponse = await request('/places', { method: 'POST' });
  assert.equal(writeResponse.status, 404);
});

test('HTTP cursor expiration returns 410 problem details', async (t) => {
  let time = Date.parse('2026-11-19T03:00:00.000Z');
  const request = await serve(t, { now: () => time });
  const page = await (await request('/places?limit=1')).json();
  time += 86400000;
  const response = await request(`/places?limit=1&cursor=${page.nextCursor}`);
  assert.equal(response.status, 410);
  const body = await response.json();
  assert.equal(body.type, '/problems/cursor-expired');
  assert.equal(body.status, 410);
  assert.equal(body.title, 'Cursor expired');
  assert.ok(!Object.hasOwn(body, 'errors'));
});

test('HTTP loader failures are redacted 500 problem details', async (t) => {
  const request = await serve(t, {
    loadCatalogue: () => {
      throw new Error('private-db-password');
    },
  });
  const response = await request('/places');
  assert.equal(response.status, 500);
  assert.match(
    response.headers.get('content-type'),
    /^application\/problem\+json/,
  );
  assert.deepEqual(await response.json(), {
    type: '/problems/internal',
    title: 'Internal error',
    status: 500,
    detail: 'The request could not be completed.',
  });
});
