import test from 'node:test';
import assert from 'node:assert/strict';
import { createPlacesService } from '../src/places.js';
import { createFixtureCatalogue } from '../src/fixtures.js';

const initialTime = Date.parse('2026-11-19T03:00:00.000Z'); // Thursday, 10:00 local.
const secret = 'synthetic-test-secret-never-a-real-key';
function setup() {
  let time = initialTime;
  let records = createFixtureCatalogue();
  const list = createPlacesService({
    cursorSecret: secret,
    now: () => time,
    loadCatalogue: () => records,
  });
  return {
    list: (query = '') => list(new URLSearchParams(query)),
    setTime: (value) => {
      time = value;
    },
    setRecords: (value) => {
      records = value;
    },
  };
}
function isProblem(status, type, parameter) {
  return (error) => {
    assert.equal(error.body.status, status);
    assert.equal(error.body.type, `/problems/${type}`);
    if (parameter) assert.equal(error.body.errors[0].parameter, parameter);
    return true;
  };
}

test('success projects public fields and sorts stable IDs', async () => {
  const api = setup();
  const records = createFixtureCatalogue();
  records[0].ownerEmail = 'private@example.invalid';
  api.setRecords(records.reverse());
  const page = await api.list();
  assert.equal(page.items.length, 6);
  assert.equal(page.nextCursor, null);
  assert.equal(page.evaluatedAt, new Date(initialTime).toISOString());
  const ids = page.items.map((p) => p.id);
  assert.deepEqual(ids, [...ids].sort());
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

test('all four filters combine with AND and unknown valid slugs return empty results', async () => {
  const api = setup();
  const page = await api.list(
    'type=cafe&district=district-1&priceLevel=1&openNow=true',
  );
  assert.deepEqual(
    page.items.map((p) => p.id),
    ['fixture-cafe-001'],
  );
  assert.deepEqual((await api.list('type=unknown-type')).items, []);
  assert.deepEqual((await api.list('district=unknown-district')).items, []);
  assert.equal((await api.list('openNow=false')).items.length, 6);
});

for (const [query, parameter] of [
  ['limit=0', 'limit'],
  ['limit=101', 'limit'],
  ['limit=01', 'limit'],
  ['limit=1.0', 'limit'],
  ['limit=1e1', 'limit'],
  ['limit=%202', 'limit'],
  ['limit=2&limit=2', 'limit'],
  ['type=', 'type'],
  ['type=Cafe', 'type'],
  ['type[]=cafe', 'type[]'],
  ['priceLevel=cheap', 'priceLevel'],
  ['openNow=1', 'openNow'],
  ['userId=someone-else', 'userId'],
  ['ownerId=someone-else', 'ownerId'],
  ['groupId=other', 'groupId'],
  ['cursor=', 'cursor'],
  ['cursor=broken', 'cursor'],
]) {
  test(`reject invalid query: ${query}`, async () => {
    await assert.rejects(
      setup().list(query),
      isProblem(400, 'validation', parameter),
    );
  });
}

test('validation aggregates ordinary errors before decoding cursor', async () => {
  await assert.rejects(
    setup().list('type=Cafe&limit=0&cursor=broken'),
    (error) => {
      assert.deepEqual(
        error.body.errors.map((v) => v.parameter),
        ['limit', 'type'],
      );
      return true;
    },
  );
});

test('paging retains time and revision while later searches see changed data', async () => {
  const api = setup();
  const query = 'openNow=true&limit=1';
  const full = await api.list('openNow=true');
  let page = await api.list(query);
  const ids = page.items.map((p) => p.id);
  api.setTime(initialTime + 10 * 60 * 60 * 1000);
  api.setRecords([]);
  assert.deepEqual((await api.list()).items, []);
  while (page.nextCursor) {
    page = await api.list(
      `${query}&cursor=${encodeURIComponent(page.nextCursor)}`,
    );
    assert.ok(page.items.length > 0);
    assert.equal(page.evaluatedAt, new Date(initialTime).toISOString());
    ids.push(...page.items.map((p) => p.id));
  }
  assert.deepEqual(
    ids,
    full.items.map((p) => p.id),
  );
  assert.equal(new Set(ids).size, ids.length);
});

test('cursor rejects changed filters, changed limit and tampering', async () => {
  const api = setup();
  const { nextCursor } = await api.list('limit=1');
  for (const query of [
    `limit=2&cursor=${nextCursor}`,
    `limit=1&type=cafe&cursor=${nextCursor}`,
    `limit=1&cursor=${nextCursor.slice(0, -2)}xx`,
  ]) {
    await assert.rejects(
      api.list(query),
      isProblem(400, 'validation', 'cursor'),
    );
  }
  assert.ok(
    (await api.list(`openNow=false&limit=1&cursor=${nextCursor}`)).items.length,
  );
});

test('cursor is valid before 24h and expires exactly at 24h', async () => {
  const api = setup();
  const { nextCursor } = await api.list('limit=1');
  const query = `limit=1&cursor=${nextCursor}`;
  api.setTime(initialTime + 86400000 - 1);
  assert.equal((await api.list(query)).items.length, 1);
  api.setTime(initialTime + 86400000);
  await assert.rejects(api.list(query), isProblem(410, 'cursor-expired'));
});

test('restart with the same signing key reports lost snapshot as expired', async () => {
  const { nextCursor } = await setup().list('limit=1');
  await assert.rejects(
    setup().list(`limit=1&cursor=${nextCursor}`),
    isProblem(410, 'cursor-expired'),
  );
});

test('open-now honors inclusive start and exclusive end in local time', async () => {
  const api = setup();
  api.setTime(Date.parse('2026-11-19T00:59:59.000Z'));
  assert.equal(
    (await api.list('type=cafe&priceLevel=1&openNow=true')).items.length,
    0,
  );
  api.setTime(Date.parse('2026-11-19T01:00:00.000Z'));
  assert.equal(
    (await api.list('type=cafe&priceLevel=1&openNow=true')).items.length,
    1,
  );
  api.setTime(Date.parse('2026-11-19T05:00:00.000Z'));
  assert.equal(
    (await api.list('type=cafe&priceLevel=1&openNow=true')).items.length,
    0,
  );
});

test('unchecked, outside-city and incomplete entries never become candidates', async () => {
  const api = setup();
  const records = createFixtureCatalogue();
  records[0].checked = false;
  records[1].city = 'another-city';
  records[2].menu = [];
  records[3].openingHours = [];
  api.setRecords(records);
  assert.deepEqual(
    (await api.list()).items.map((p) => p.id),
    ['fixture-park-001', 'fixture-restaurant-001'],
  );
});

test('invalid supplied catalogue fails instead of inventing or coercing prices', async () => {
  const api = setup();
  const records = createFixtureCatalogue();
  records[0].ticketPriceVnd = 0.5;
  api.setRecords(records);
  await assert.rejects(api.list(), /Invalid catalogue record/);
});
