# Self-assessment — PA2

Team: Nguyễn Tiến Luật — 23127221; Đặng Nghi Văn — 23127281; Phạm Chí Bảo Ninh — 23127446.

Repository: <https://github.com/Tienluat123/WebNC>. Total claimed: **95**. ZIP: `23127221-23127281-23127446_95.zip`.

| Criterion                   |     Max |  Claim | Evidence                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| --------------------------- | ------: | -----: | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Rules file                  |      15 |     15 | [AGENTS.md](AGENTS.md): stack, commands, conventions, never. Two rules trace to real events: the format red run ([868f505](https://github.com/Tienluat123/WebNC/commit/868f505), [run](https://github.com/Tienluat123/WebNC/actions/runs/44906808477)) and the contract break ([297d44d](https://github.com/Tienluat123/WebNC/commit/297d44d)).                                                                                                                                   |
| Permissions and secrets     |      10 |      8 | [Three-tier policy](docs/pa2/PERMISSIONS.md), [.env.example](.env.example) with blank names, `.env` ignored, [audit on all refs, 0 findings](docs/pa2/evidence/secrets-audit.md), [Free-tier/no-billing evidence](docs/pa2/evidence/gemini-free-tier-no-billing-2026-11-21.png). No configured spending cap (see below).                                                                                                                                                          |
| One command for every check |      10 |     10 | [README commands](README.md), [package scripts](package.json), [CI workflow](.github/workflows/ci.yml), remote tag `pa2` at `39c66e5` [run 45651154508](https://github.com/Tienluat123/WebNC/actions/runs/45651154508) passed all four checks; a separate fresh local clone passed all four on 2026-11-26                                                                                                                                                                         |
| CI that blocks a merge      |      20 |     20 | [PR #1](https://github.com/Tienluat123/WebNC/pull/1), [red run](https://github.com/Tienluat123/WebNC/actions/runs/44906808477), [green run](https://github.com/Tienluat123/WebNC/actions/runs/44907080432), [screenshots and protection](docs/pa2/evidence/README.md)                                                                                                                                                                                                             |
| One endpoint contract       |      25 |     25 | [GET /places contract](docs/contract/endpoint.md): role and public ownership rule, field rules, RFC 9457 error types with statuses, cursor paging, change policy; [implementation](backend/src/places.js)                                                                                                                                                                                                                                                                         |
| Contract tests that bite    |      15 |     12 | [HTTP tests](backend/test/contract/places.test.js): application error types, public ownership policy and paging. [PR #2](https://github.com/Tienluat123/WebNC/pull/2) demonstrates real required CI [red](https://github.com/Tienluat123/WebNC/actions/runs/45742980185) then [green](https://github.com/Tienluat123/WebNC/actions/runs/45743114867) without changing tests or contract. The claim remains conservative for a public endpoint with no owned-resource denial case. |
| AI-LOG.md                   |       5 |      5 | [AI-LOG.md](AI-LOG.md): tools, Changed / Rejected entries with commits                                                                                                                                                                                                                                                                                                                                                                                                            |
| **Total**                   | **100** | **95** | 15 + 8 + 10 + 20 + 25 + 12 + 5 = 95                                                                                                                                                                                                                                                                                                                                                                                                                                               |

Reviewed against the supplied rubric on 2026-11-26. The total is a self-assessment,
not a guaranteed grade. The contract-break CI demonstration is now complete.
Criterion 6 stays at a conservative 12/15 rather than increasing the submitted total.
The remote tag/CI above verifies `39c66e5`; this documentation review must be
published and included in the final tagged commit before submission.

## What we did not manage

- **Spending cap (criterion 2, −2).** The Gemini API project is on the Free tier with
  no billing account, so it cannot incur charges. That is a different fact from a
  configured spending cap, and no cap is configured. The rubric's capped-key line is
  therefore not met, and we claim 8 rather than 10.
- **Production scale.** The cursor revision store is in-memory and process-local,
  with no retention bound; it would need shared persistence before production.
  The place data is synthetic. Neither is a PA2 requirement.

## Ownership decision

The selected endpoint is `GET /places`, explicitly offered in the rubric. It exposes
one public shared catalogue, not private records owned by a user. Its ownership rule
is therefore the same public result for every caller; user, owner and group selectors
are rejected with 400. HTTP tests inject private source metadata, exclude it from
responses, compare anonymous and synthetic caller A/B contexts, and reject other-user
selectors for both callers. The headers are not an authentication implementation.

No private-place resource or 403/404 rule was added. The contract-test claim remains
conservative because this public-policy proof does not demonstrate denial of an
owned private record. This is the team's chosen scope, not an outstanding request
for a new feature. The CI red/green evidence is complete and linked above.
