import { createHash, createHmac, timingSafeEqual } from 'node:crypto';

const DAY_MS = 24 * 60 * 60 * 1000;
const slug = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const compare = (a, b) => (a < b ? -1 : a > b ? 1 : 0);
const isSlug = (value) => typeof value === 'string' && value.length <= 64 && slug.test(value);

export class Problem extends Error {
  constructor(status, type, title, detail, errors) {
    super(detail);
    this.body = { type: `/problems/${type}`, title, status, detail };
    if (errors) this.body.errors = errors;
  }
}

function invalid(errors) {
  return new Problem(400, 'validation', 'Invalid request',
    `${errors.length} query parameter${errors.length === 1 ? ' is' : 's are'} invalid.`, errors);
}

function expired() {
  return new Problem(410, 'cursor-expired', 'Cursor expired', 'Restart the search from the first page.');
}

function queryOptions(params) {
  const rules = {
    type: [isSlug, 'must be a lowercase slug of at most 64 characters'],
    district: [isSlug, 'must be a lowercase slug of at most 64 characters'],
    priceLevel: [(v) => /^[1-4]$/.test(v), 'must be 1, 2, 3 or 4'],
    openNow: [(v) => v === 'true' || v === 'false', 'must be true or false'],
    limit: [(v) => /^(?:[1-9][0-9]?|100)$/.test(v), 'must be an integer from 1 to 100'],
    cursor: [(v) => v.length > 0 && v.length <= 4096, 'must contain 1 to 4096 characters'],
  };
  const errors = [];
  for (const parameter of [...new Set(params.keys())].sort(compare)) {
    const rule = Object.hasOwn(rules, parameter) ? rules[parameter] : null;
    const values = params.getAll(parameter);
    const detail = !rule ? 'is not a supported query parameter'
      : values.length !== 1 ? 'must occur only once'
        : !rule[0](values[0]) ? rule[1] : null;
    if (detail) errors.push({ parameter, detail });
  }
  if (errors.length) throw invalid(errors);
  return {
    type: params.get('type'), district: params.get('district'),
    priceLevel: params.has('priceLevel') ? Number(params.get('priceLevel')) : null,
    openNow: params.get('openNow') === 'true', limit: Number(params.get('limit') ?? 20),
  };
}

// Validate at the adapter boundary and project public fields explicitly.
function catalogueRecords(records) {
  if (!Array.isArray(records)) throw new Error('Invalid catalogue');
  const ids = new Set();
  const summaries = [];
  for (const record of records) {
    // Incomplete or unchecked places are never candidates.
    if (!record || record.checked !== true || record.city !== 'ho-chi-minh-city') continue;
    if (!Array.isArray(record.openingHours) || record.openingHours.length !== 7
      || !Array.isArray(record.menu) || record.menu.length < 3 || record.menu.length > 8) continue;
    const validHours = record.openingHours.every((day, i) => {
      if (!day || day.weekday !== i + 1 || !Array.isArray(day.intervals)) return false;
      let previousEnd = 0;
      return day.intervals.every((interval) => {
        if (!interval || !Number.isInteger(interval.startMinute) || !Number.isInteger(interval.endMinute)
          || interval.startMinute < previousEnd || interval.startMinute < 0
          || interval.endMinute > 1440 || interval.startMinute >= interval.endMinute) return false;
        previousEnd = interval.endMinute;
        return true;
      });
    });
    const validMenu = record.menu.every((item) => item && item.checked === true
      && typeof item.id === 'string' && typeof item.name === 'string' && item.name.length > 0
      && Number.isSafeInteger(item.priceVnd) && item.priceVnd >= 0);
    if (!validHours || !validMenu || typeof record.id !== 'string'
      || !/^[A-Za-z0-9_-]{1,64}$/.test(record.id) || ids.has(record.id)
      || typeof record.name !== 'string' || !record.name.trim() || [...record.name].length > 200
      || !isSlug(record.type) || !isSlug(record.district)
      || !Number.isInteger(record.priceLevel) || record.priceLevel < 1 || record.priceLevel > 4
      || typeof record.indoor !== 'boolean' || !Number.isSafeInteger(record.ticketPriceVnd)
      || record.ticketPriceVnd < 0) throw new Error('Invalid catalogue record');
    ids.add(record.id);
    const { id, name, type, district, priceLevel, indoor, ticketPriceVnd } = record;
    summaries.push({ id, name, type, district, priceLevel, indoor, ticketPriceVnd,
      openingHours: record.openingHours.map((day) => ({ weekday: day.weekday,
        intervals: day.intervals.map(({ startMinute, endMinute }) => ({ startMinute, endMinute })) })) });
  }
  return summaries.sort((a, b) => compare(a.id, b.id));
}

const localClock = new Intl.DateTimeFormat('en-GB', {
  timeZone: 'Asia/Ho_Chi_Minh', weekday: 'short', hour: '2-digit', minute: '2-digit', hourCycle: 'h23',
});

function isOpen(place, instant) {
  const parts = Object.fromEntries(localClock.formatToParts(instant).map((p) => [p.type, p.value]));
  const weekday = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].indexOf(parts.weekday);
  const minute = Number(parts.hour) * 60 + Number(parts.minute);
  return place.openingHours[weekday].intervals.some((v) => v.startMinute <= minute && minute < v.endMinute);
}

export function createPlacesService({ loadCatalogue, cursorSecret, now = Date.now }) {
  if (typeof loadCatalogue !== 'function' || typeof cursorSecret !== 'string'
    || Buffer.byteLength(cursorSecret) < 32) throw new Error('A loader and a 32-byte cursor secret are required');
  const revisions = new Map();
  const sign = (payload) => createHmac('sha256', cursorSecret).update(payload).digest('base64url');
  const encode = (value) => {
    const payload = Buffer.from(JSON.stringify(value)).toString('base64url');
    return `${payload}.${sign(payload)}`;
  };
  function decode(token, options, time) {
    let value;
    try {
      if (!/^[A-Za-z0-9_-]+\.[A-Za-z0-9_-]{43}$/.test(token)) throw new Error();
      const [payload, signature] = token.split('.');
      if (!timingSafeEqual(Buffer.from(signature), Buffer.from(sign(payload)))) throw new Error();
      value = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'));
      if (!value || value.version !== 1 || typeof value.revision !== 'string'
        || !/^[a-f0-9]{64}$/.test(value.revision) || !Number.isSafeInteger(value.time)
        || value.time < 0 || typeof value.after !== 'string'
        || !/^[A-Za-z0-9_-]{1,64}$/.test(value.after)
        || JSON.stringify(value.options) !== JSON.stringify(options)) throw new Error();
    } catch {
      throw invalid([{ parameter: 'cursor', detail: 'is invalid or does not match the search' }]);
    }
    if (time - value.time >= DAY_MS || !revisions.has(value.revision)) throw expired();
    return value;
  }

  return async function listPlaces(params) {
    const options = queryOptions(params);
    const time = now();
    if (!Number.isSafeInteger(time) || time < 0) throw new Error('Invalid clock');
    // Retain immutable revisions for 24 hours after their latest first-page request.
    for (const [key, entry] of revisions) {
      if (time - entry.lastUsed >= DAY_MS) revisions.delete(key);
    }
    let state;
    if (params.has('cursor')) {
      state = decode(params.get('cursor'), options, time);
    } else {
      const records = catalogueRecords(await loadCatalogue());
      const revision = createHash('sha256').update(JSON.stringify(records)).digest('hex');
      revisions.set(revision, { records, lastUsed: time });
      state = { version: 1, revision, time, options, after: null };
    }
    const records = revisions.get(state.revision).records;
    const matching = records.filter((p) => (!options.type || p.type === options.type)
      && (!options.district || p.district === options.district)
      && (!options.priceLevel || p.priceLevel === options.priceLevel)
      && (!options.openNow || isOpen(p, state.time))
      && (state.after === null || compare(p.id, state.after) > 0));
    const items = matching.slice(0, options.limit);
    const nextCursor = matching.length > options.limit
      ? encode({ ...state, after: items.at(-1).id }) : null;
    return { items, nextCursor, evaluatedAt: new Date(state.time).toISOString() };
  };
}
