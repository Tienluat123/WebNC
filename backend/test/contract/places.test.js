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
    Object.keys(page.items[0]).sort(),
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
});

test('HTTP validation reports duplicate parameters and rejects private selectors', async (t) => {
  const request = await serve(t);
  for (const query of [
    'limit=2&limit=2',
    'userId=another-user',
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
