# P1 review - permissions, secrets and endpoint contract

Reviewed on 2026-11-21 against the local PA2 rubric, criteria 2 and 5.
Owner: Nghi Van. Local task branch: `pa2-permissions-places`; reviewed from commit `1a413e6`, which
contains the implementation previously prepared on 2026-11-19.

## Criterion 2 - permissions and secrets

| Requirement                                        | Evidence                                                                                              | State                                                                               |
| -------------------------------------------------- | ----------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| Allowed / Ask first / Never                        | [PERMISSIONS.md](../PERMISSIONS.md), referenced from root AGENTS.md                                   | Written                                                                             |
| Environment variable names without values          | [.env.example](../../../.env.example): PORT, CURSOR_SECRET                                            | Matches current server configuration                                                |
| Ignore local secrets                               | [.gitignore](../../../.gitignore)                                                                     | Audit confirmed .env is ignored                                                     |
| No detected credentials in available history       | [Audit](secrets-audit.md), [script](../../../scripts/audit-secrets.py)                                | Rechecked; see scope limitations                                                    |
| Model API key spending status documented in README | [README](../../../README.md), [redacted account evidence](gemini-free-tier-no-billing-2026-11-21.png) | Free tier with no billing account: no paid billing or spending cap currently exists |
| Cost per synthetic itinerary                       | [Benchmark](model-cost-benchmark.md)                                                                  | Actual Free-tier USD 0; paid-tier equivalent USD 0.00162885 for one measured call   |

The endpoint does not use a model. PA2 introduces the harness before the PA3 LLM
feature; a model integration is not needed to implement GET /places. Criterion 2
asks for a capped model key. For this Free-tier project, there is no paid billing
and no configured spending cap; the tool is free in the current account state.
This cannot be scored as a configured cap, but it accurately explains why no paid
charge is possible currently.

The team reports Google Gemini API project `travel-planner`, model
`gemini-3.5-flash-lite`, Free tier with no billing account linked, and successful API
connectivity testing by a team member. No spending cap is configured. Separately, the project has no billing account, so
current Free-tier use cannot incur charges. This is not a paid-tier budget control or a hard monthly paid
spending limit. If the account gains billing or paid usage, configure a provider
spending cap before continuing.
The dated [redacted account screenshot](gemini-free-tier-no-billing-2026-11-21.png)
retains the project name, Free-tier badge and no-billing message while excluding
the browser URL, email and API key.
Do not supply a key value, account credential or payment details. If billing is
linked later, this evidence becomes invalid and a project spend cap must be configured.
The single-call synthetic itinerary benchmark records 84 prompt tokens and 1,293
candidate tokens. It is measured evidence for the current model, not a production
average or evidence that `GET /places` makes model calls.

## Criterion 5 - one endpoint contract

| Requirement                                  | Contract / implementation evidence                                                              |
| -------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| Same five sections as the lecturer's example | [endpoint.md](../../contract/endpoint.md): conventions, errors, resources, endpoints, versions  |
| Role and ownership                           | Section 4: same public catalogue for anonymous and signed-in callers; user selectors return 400 |
| Request and response field rules             | Sections 1, 3 and 4: bounds, types, required fields, defaults and examples                      |
| Each error type and status                   | Section 2: validation 400, cursor-expired 410, internal 500; RFC 9457 bodies                    |
| Paging                                       | Section 4: default 20/max 100, stable order/time/revision, signed cursor, 24-hour expiry        |
| Idempotency applicability                    | Read-only GET with no model calls or writes; no idempotency key needed                          |
| Changes and compatibility                    | Section 5: compatible additions, separate documented version for breaking changes               |
| Implemented behavior                         | [places.js](../../../backend/src/places.js), [app.js](../../../backend/src/app.js)              |

The review did not identify a change needed to the adopted API semantics.
No access policy, schema, filter or pagination behavior was changed.

## Verification and handoff

- `npm test`: 35 passed, 0 failed and 0 skipped locally on 2026-11-23,
  including the HTTP contract tests for success, errors, paging, ownership-independent
  public access and private-selector rejection. No tests were changed or disabled
  to obtain the pass.
- `python -X utf8 scripts/audit-secrets.py`: 18 reachable commits and 96 unique
  history blobs; no findings or incomplete extraction. The final working-file
  count and scope limitations are in the audit evidence.
- These are local checks, not required-CI, blocked-merge or tag-run evidence.

Handoff to Ninh (#6): strengthen HTTP assertions where needed for full field
rules, all error shapes, complete pagination and public access. The public-catalogue
tests do not establish denial of access to an owned resource; resolve the rubric's
explicit other-user-data expectation before claiming full ownership-test marks.
Do not silently turn the adopted public endpoint into a private endpoint.

Handoff to Luat (#3/#4): use the existing package test commands when wiring checks
and required CI; preserve genuine red/green evidence and protect main. These
items were not implemented or marked complete by this P1 review.

Update 2026-11-25: the repository is <https://github.com/Tienluat123/WebNC>
(public). This review was written on 2026-11-21 against an earlier local remote
name; current PR/CI evidence is linked from [PA2.md](../../../PA2.md).
