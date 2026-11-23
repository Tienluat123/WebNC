# Contract-test fixtures

The `GET /places` contract currently uses synthetic catalogue records from
`backend/src/fixtures.js`. No separate JSON fixture files are required for the
present HTTP tests.

Keep fixtures synthetic and public unless a future contract explicitly adds a
private/owned resource. Any future fixture for a private resource must cover
another user's denied access, paging or idempotency as required by its contract.
