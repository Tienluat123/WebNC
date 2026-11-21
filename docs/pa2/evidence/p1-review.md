# P1 review - permissions, secrets and endpoint contract

Reviewed on 2026-11-21 against the local PA2 rubric, criteria 2 and 5.
Owner: Nghi Van. Local task branch: `p1`, based on `b50355d` with the
existing uncommitted 2026-11-19 implementation preserved.

## Criterion 2 - permissions and secrets

| Requirement | Evidence | State |
| --- | --- | --- |
| Allowed / Ask first / Never | [PERMISSIONS.md](../PERMISSIONS.md), referenced from root AGENTS.md | Written |
| Environment variable names without values | [.env.example](../../../.env.example): PORT, CURSOR_SECRET | Matches current server configuration |
| Ignore local secrets | [.gitignore](../../../.gitignore) | Audit confirmed .env is ignored |
| No detected credentials in available history | [Audit](secrets-audit.md), [script](../../../scripts/audit-secrets.py) | Rechecked; see scope limitations |
| Model API key spending cap documented in README | [README](../../../README.md) | Pending actual provider/account configuration |

The endpoint does not use a model. PA2 introduces the harness before the PA3 LLM
feature; a model integration is not needed to implement GET /places. However,
criterion 2 explicitly asks for a capped model key. Do not claim full completion
of this criterion until actual account-side evidence exists.

To finish that item, supply only the provider name, model identifier, actual limit
amount/currency/period, enforcement behavior and a redacted settings screenshot
or export with its date. Do not supply a key value, account credential or payment
details. An alert threshold is not evidence of an enforced cap. The provider has
not been chosen in this task, and no account or billing setting was changed.
Cost per plan is a separate brief requirement; it has not been measured.

## Criterion 5 - one endpoint contract

| Requirement | Contract / implementation evidence |
| --- | --- |
| Same five sections as the lecturer's example | [endpoint.md](../../contract/endpoint.md): conventions, errors, resources, endpoints, versions |
| Role and ownership | Section 4: same public catalogue for anonymous and signed-in callers; user selectors return 400 |
| Request and response field rules | Sections 1, 3 and 4: bounds, types, required fields, defaults and examples |
| Each error type and status | Section 2: validation 400, cursor-expired 410, internal 500; RFC 9457 bodies |
| Paging | Section 4: default 20/max 100, stable order/time/revision, signed cursor, 24-hour expiry |
| Idempotency applicability | Read-only GET with no model calls or writes; no idempotency key needed |
| Changes and compatibility | Section 5: compatible additions, separate documented version for breaking changes |
| Implemented behavior | [places.js](../../../backend/src/places.js), [app.js](../../../backend/src/app.js) |

The review did not identify a change needed to the adopted API semantics.
No access policy, schema, filter or pagination behavior was changed.

## Verification and handoff

- `npm run test:service`: 27 passed, 0 failed on 2026-11-21.
- `python -X utf8 scripts/audit-secrets.py`: 17 reachable commits, 65 unique
  history blobs; no findings or incomplete extraction reported before these
  documentation updates. Final working-file counts are in the audit evidence.
- The original checkout's `npm test` run on 2026-11-21 reached 31 tests:
  27 passed and 4 HTTP tests failed to connect. An independent minimal local
  HTTP server reproduced `connect EACCES 127.0.0.1`, establishing an environment
  restriction. These four tests were not changed or disabled.
- The user's 2026-11-19 run with all 31 tests passing remains historical evidence;
  it is not a current full-suite pass or a CI run.

Handoff to Ninh (#6): strengthen HTTP assertions where needed for full field
rules, all error shapes, complete pagination and public access. The public-catalogue
tests do not establish denial of access to an owned resource; resolve the rubric's
explicit other-user-data expectation before claiming full ownership-test marks.
Do not silently turn the adopted public endpoint into a private endpoint.

Handoff to Luat (#3/#4): use the existing package test commands when wiring checks
and required CI; preserve genuine red/green evidence and protect main. These
items were not implemented or marked complete by this P1 review.

The source repo's configured remote is
<https://github.com/Tienluat123/WebNC_Proposal>. Older submission templates linked
to WebNC instead; the README and PA2 entry now use the configured remote.
Public visibility, remote branch state and PR/CI evidence have not been verified.
