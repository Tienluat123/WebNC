// Synthetic PA2 data only. These names and prices do not describe real businesses.
const hours = (startMinute, endMinute) => Array.from({ length: 7 }, (_, i) => ({
  weekday: i + 1, intervals: [{ startMinute, endMinute }],
}));

export function createFixtureCatalogue() {
  return [
    ['fixture-cafe-001', 'Fixture Morning Cafe', 'cafe', 'district-1', 1, true, 0, 480, 720],
    ['fixture-cafe-002', 'Fixture Evening Cafe', 'cafe', 'district-1', 2, true, 0, 1020, 1320],
    ['fixture-cafe-003', 'Fixture Garden Cafe', 'cafe', 'district-3', 2, false, 0, 480, 1320],
    ['fixture-museum-001', 'Fixture Museum', 'museum', 'district-1', 2, true, 40000, 480, 1020],
    ['fixture-park-001', 'Fixture Park', 'park', 'district-3', 1, false, 0, 0, 1440],
    ['fixture-restaurant-001', 'Fixture Restaurant', 'restaurant', 'district-1', 3, true, 0, 660, 1320],
  ].map(([id, name, type, district, priceLevel, indoor, ticketPriceVnd, start, end]) => ({
    id, name, type, district, priceLevel, indoor, ticketPriceVnd,
    city: 'ho-chi-minh-city', checked: true, openingHours: hours(start, end),
    menu: [1, 2, 3].map((n) => ({ id: `${id}-item-${n}`, name: `Fixture item ${n}`,
      priceVnd: type === 'museum' ? ticketPriceVnd : n * 10000, checked: true })),
  }));
}
