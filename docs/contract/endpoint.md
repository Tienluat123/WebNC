# Places API contract - version 1

Endpoint: `GET /places`.

Status: adopted by the user on 2026-11-19 for this PA2 implementation. The user
confirmed the endpoint was already selected by the team, then accepted the public
access policy, filters, pagination, response schema and errors. This records the
user's decision, not a claim that every team member separately reviewed this file.
The user's local run passed all 35 service and HTTP tests on 2026-11-23.
See [backend status](../../backend/README.md). Numeric limits and schema choices
are project decisions, not requirements quoted from the lecturer.

Sources: [PA2 rubric](<../reference/PA2 Rubric Harness Quality Gate.pdf>),
[project brief](<../reference/AI Travel Planner Project Brief.pdf>) sections 3, 4 and 6,
[lecturer's contract example](../reference/Contract.md), and
[RFC 9457](https://www.rfc-editor.org/rfc/rfc9457.html).

## 1. Conventions

- This contract covers only `GET /places`; there is no implicit `/v1` prefix.
- Responses are UTF-8 JSON. Successful responses use `application/json`;
  errors use `application/problem+json`. A `charset` parameter is permitted.
- Field and query names are case-sensitive. Clients ignore additional response fields.
- IDs are stable strings of 1-64 ASCII letters, digits, underscores or hyphens.
  Clients treat IDs as opaque; internal source IDs may be mapped by a data adapter.
- Prices are non-negative integer VND, never floating-point thousands of VND.
- Timestamps use UTC RFC 3339 strings with milliseconds, such as `2026-11-19T03:00:00.000Z`.
  Opening hours use the `Asia/Ho_Chi_Minh` timezone.
- Type and district identifiers are lowercase ASCII slugs matching
  `[a-z0-9]+(?:-[a-z0-9]+)*`, at most 64 characters. Display names are separate from identifiers.
- Only checked Ho Chi Minh City places with complete weekly opening hours and
  3-8 checked menu items or tickets with prices may appear. An unavailable or
  invalid data source causes an internal error, not an invented place or price.
- PA2 may use explicitly synthetic fixtures. They are not evidence that real places
  have been verified. The shared dataset is adapted when available; its exact schema
  is not assumed to be known by this document.

## 2. Errors

Every application error from this operation has the following members:

| Member   | Rule                                                                                                                                                                |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `type`   | One of the exact URI references in the table below. Resolve against the API origin.                                                                                 |
| `title`  | The exact title in the table below.                                                                                                                                 |
| `status` | Integer equal to the HTTP response status.                                                                                                                          |
| `detail` | Non-empty English description of this occurrence. Never include stack traces, secrets, database messages or local file paths. Clients must not branch on this text. |
| `errors` | Required only for `validation`: a non-empty array of `{ "parameter": string, "detail": string }`. Omitted for other types.                                          |

| Type                       | Status | Title           | Condition                                                                                                                                                   |
| -------------------------- | -----: | --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/problems/validation`     |    400 | Invalid request | Unknown or repeated query parameter; invalid query value; unreadable, tampered or structurally invalid cursor; cursor used with different filters or limit. |
| `/problems/cursor-expired` |    410 | Cursor expired  | An otherwise valid cursor is older than 24 hours, or its catalogue revision is no longer available. Restart from the first page.                            |
| `/problems/internal`       |    500 | Internal error  | An unexpected application or data-source failure. `detail` is always `The request could not be completed.`                                                  |

Validation returns one entry per invalid parameter name, sorted by ASCII parameter name.
For an unknown name, `parameter` contains that name. Repeated parameters are invalid
even if their values match. If both ordinary query fields and the cursor are invalid,
return ordinary field errors first; decode the cursor only after those fields pass.
Cursor failures use `parameter: "cursor"`. A malformed cursor is never treated as expired.

Example:

```http
HTTP/1.1 400 Bad Request
Content-Type: application/problem+json

{
  "type": "/problems/validation",
  "title": "Invalid request",
  "status": 400,
  "detail": "1 query parameter is invalid.",
  "errors": [
    { "parameter": "limit", "detail": "must be an integer from 1 to 100" }
  ]
}
```

## 3. Resources

### PlaceSummary

All fields below are required and non-null. Extra fields may be added compatibly.

| Field            | Type and rule                                                                                                         |
| ---------------- | --------------------------------------------------------------------------------------------------------------------- |
| `id`             | ID as defined in section 1. Unique in the catalogue.                                                                  |
| `name`           | Non-empty Unicode string, at most 200 characters.                                                                     |
| `type`           | Type slug, such as `cafe` or `museum`.                                                                                |
| `district`       | District slug supplied by the catalogue, such as `district-1`. This API does not prescribe administrative boundaries. |
| `priceLevel`     | Integer 1-4: ascending catalogue price category. It is not a budget calculation or a promised VND range.              |
| `indoor`         | Boolean: true for an indoor place, false for outdoor.                                                                 |
| `ticketPriceVnd` | Non-negative integer admission price; 0 for free admission. Excludes food, transport and optional purchases.          |
| `openingHours`   | Seven `DayHours` objects, ordered Monday (1) through Sunday (7).                                                      |

`DayHours` has exactly the required fields `weekday` (integer 1-7) and `intervals`
(array of `OpeningInterval`). An empty array means closed that day.
Each interval has `startMinute` (integer 0-1439) and `endMinute` (integer 1-1440),
with `startMinute < endMinute`. Intervals are ordered, disjoint and half-open:
start is included, end is excluded. Overnight hours are split across the two days.
Hours describe the published weekly schedule; they do not guarantee that an
unreported exceptional closure has been discovered.

### PlacePage

| Field         | Type and rule                                                                          |
| ------------- | -------------------------------------------------------------------------------------- |
| `items`       | Array of `PlaceSummary`, length 0 to `limit`, ordered by ASCII `id` ascending.         |
| `nextCursor`  | Opaque non-empty string or `null`. Null exactly when no further matching items remain. |
| `evaluatedAt` | Timestamp captured for the first page, reused throughout this pagination walk.         |

Example resource (synthetic, not a claim about a real business):

```json
{
  "items": [
    {
      "id": "fixture-cafe-001",
      "name": "Fixture Cafe",
      "type": "cafe",
      "district": "district-1",
      "priceLevel": 2,
      "indoor": true,
      "ticketPriceVnd": 0,
      "openingHours": [
        {
          "weekday": 1,
          "intervals": [{ "startMinute": 480, "endMinute": 1320 }]
        },
        {
          "weekday": 2,
          "intervals": [{ "startMinute": 480, "endMinute": 1320 }]
        },
        {
          "weekday": 3,
          "intervals": [{ "startMinute": 480, "endMinute": 1320 }]
        },
        {
          "weekday": 4,
          "intervals": [{ "startMinute": 480, "endMinute": 1320 }]
        },
        {
          "weekday": 5,
          "intervals": [{ "startMinute": 480, "endMinute": 1320 }]
        },
        {
          "weekday": 6,
          "intervals": [{ "startMinute": 480, "endMinute": 1320 }]
        },
        { "weekday": 7, "intervals": [] }
      ]
    }
  ],
  "nextCursor": null,
  "evaluatedAt": "2026-11-19T03:00:00.000Z"
}
```

Menu details, photos, descriptions and personal activity are outside this summary resource;
their future endpoints are outside this PA2 contract.

## 4. Endpoints

### GET /places - search the shared checked catalogue

**Role and ownership policy:** anonymous visitors and signed-in users may
read the same public checked catalogue. No user owns these shared records. This
operation neither reads nor changes profiles, want-to-go lists, visits, reviews,
group membership, budgets or saved plans. Authentication is not required and
an Authorization header does not change the result or expose private fields.
There are no 401 or 403 responses in this operation's application contract.

A `userId`, `ownerId` or `groupId` query is an unknown parameter and returns
400 validation; it can never select another person's data.

**Team review checkpoint:** the rubric explicitly asks for an ownership test involving
another user's data. For this public endpoint, tests can prove user-independent
catalogue access, rejection of user selectors and absence of private fields, but
these do not demonstrate denial of access to an owned resource. Review whether
this meets the lecturer's expectation before claiming full ownership-test marks;
do not invent a private-place feature merely to manufacture a 403 response.

There is no request body. Clients must not send one; it does not supply search
parameters and the handler must not parse it as JSON or use it for filtering.

| Query parameter | Allowed value                                                                                   | Default       |
| --------------- | ----------------------------------------------------------------------------------------------- | ------------- |
| `type`          | One type slug. A well-formed slug absent from the catalogue produces zero matches.              | All types     |
| `district`      | One district slug. A well-formed slug absent from the catalogue produces zero matches.          | All districts |
| `priceLevel`    | Exactly `1`, `2`, `3` or `4`; exact category match.                                             | All levels    |
| `openNow`       | Exactly `true` or `false`. True keeps places open at `evaluatedAt`; false disables this filter. | `false`       |
| `limit`         | Canonical decimal integer 1-100; no sign, whitespace, leading zeros, fraction or exponent.      | `20`          |
| `cursor`        | An unchanged `nextCursor` previously returned by this endpoint, at most 4096 characters.        | First page    |

Filters combine with AND. Empty strings and repeated parameters are invalid.
Decoded values are not trimmed or case-folded. Unknown query names are errors,
not silently ignored filters. For example, `openNow=1`, `limit=01`,
`priceLevel=cheap` and `type[]=cafe` are 400 validation.

Processing order:

1. Validate all ordinary query parameters, including duplicates, unknown names and cursor length.
2. If present, validate cursor integrity, structure and binding to the effective filters and limit.
3. Check cursor expiry and availability of its catalogue revision.
4. Load the pinned catalogue revision, filter, order and return a page.
5. Unexpected failures at any step return 500 internal.

### Paging and time

- The first request pins a catalogue revision and `evaluatedAt` from the server clock.
  An open-now check converts that timestamp to local weekday and minute in
  `Asia/Ho_Chi_Minh` and checks the weekly intervals. Seconds do not change the minute index.
- Later requests must repeat the same effective filters and limit and include the
  cursor. Omitting a parameter equals its default; query parameter order does not matter.
- A cursor is integrity-protected and bound to the revision, evaluation time,
  effective filters, limit and continuation position. It is not an authentication token.
  Clients never construct or decode it; its encoding is not part of the public contract.
- A cursor remains usable for 24 hours from first-page evaluation, including all
  catalogue revisions needed for that period. At exactly 24 hours it expires.
  Restart or loss of retained state must return 410 rather than silently switching revisions.
- While walking valid pages, later catalogue changes or clock changes never duplicate,
  skip or add items. The open-now filter uses the original time on all pages.
- `nextCursor` is non-null only if another matching item exists. It must not lead to
  an empty terminal page. An initial search with no matches returns 200 with
  `items: []` and `nextCursor: null`, never 404.
- GET has no writes or model calls. No idempotency key is needed.

Example first request:

```http
GET /places?type=cafe&district=district-1&openNow=true&limit=2
Accept: application/json, application/problem+json
```

For a continuation request, keep those filters and `limit=2`, then append
`&cursor=` followed by the URL-encoded returned cursor.

## 5. Versions and the legacy API

- This is version 1 of the unprefixed `/places` contract. No legacy API exists.
- Make an adopted contract change in a separate explained commit before
  implementation/test changes that depend on it.
- Adding optional response fields is compatible. Clients ignore fields they do not know.
- Renaming/removing fields, changing types or units, changing access policy, filter
  semantics, default sorting or existing error behavior is breaking. Publish a
  separately documented version such as `/v2/places` and retain `/places` until an
  announced migration and retirement date. Do not silently repurpose the old path.
- Adding an optional query parameter must preserve existing valid requests and
  cursor compatibility; old unknown-parameter tests must change only with an
  intentional documented contract change.
