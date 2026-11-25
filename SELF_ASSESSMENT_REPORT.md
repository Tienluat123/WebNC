# Self-assessment — PA2

Team: Nguyễn Tiến Luật — 23127221; Đặng Nghi Văn — 23127281; Phạm Chí Bảo Ninh — 23127446.

Repository: <https://github.com/Tienluat123/WebNC>. Total claimed: **95**. ZIP: `23127221-23127281-23127446_95.zip`.

| Criterion                   |     Max |  Claim | Evidence                                                                                                                                                                                                                                                                                                                                        |
| --------------------------- | ------: | -----: | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Rules file                  |      15 |     15 | [AGENTS.md](AGENTS.md): stack, commands, conventions, never. Two rules trace to real events: the format red run ([868f505](https://github.com/Tienluat123/WebNC/commit/868f505), [run](https://github.com/Tienluat123/WebNC/actions/runs/44906808477)) and the contract break ([297d44d](https://github.com/Tienluat123/WebNC/commit/297d44d)). |
| Permissions and secrets     |      10 |      8 | [Three-tier policy](docs/pa2/PERMISSIONS.md), [.env.example](.env.example) with blank names, `.env` ignored, [audit on all refs, 0 findings](docs/pa2/evidence/secrets-audit.md), [Free-tier/no-billing evidence](docs/pa2/evidence/gemini-free-tier-no-billing-2026-11-21.png). No configured spending cap (see below).                        |
| One command for every check |      10 |     10 | [README commands](README.md), [package scripts](package.json), [CI workflow](.github/workflows/ci.yml), remote tag `pa2` at `39c66e5` [run 45651154508](https://github.com/Tienluat123/WebNC/actions/runs/45651154508) passed all four checks; a separate fresh local clone passed all four on 2026-11-26                                       |
| CI that blocks a merge      |      20 |     20 | [PR #1](https://github.com/Tienluat123/WebNC/pull/1), [red run](https://github.com/Tienluat123/WebNC/actions/runs/44906808477), [green run](https://github.com/Tienluat123/WebNC/actions/runs/44907080432), [screenshots and protection](docs/pa2/evidence/README.md)                                                                           |
| One endpoint contract       |      25 |     25 | [GET /places contract](docs/contract/endpoint.md): role and public ownership rule, field rules, RFC 9457 error types with statuses, cursor paging, change policy; [implementation](backend/src/places.js)                                                                                                                                       |
| Contract tests that bite    |      15 |     12 | [HTTP contract tests](backend/test/contract/places.test.js): every error type, public ownership rule, paging, run in required CI. Deliberate break shown locally only ([297d44d](https://github.com/Tienluat123/WebNC/commit/297d44d) red, [531967f](https://github.com/Tienluat123/WebNC/commit/531967f) green); no CI red run yet.            |
| AI-LOG.md                   |       5 |      5 | [AI-LOG.md](AI-LOG.md): tools, Changed / Rejected entries with commits                                                                                                                                                                                                                                                                          |
| **Total**                   | **100** | **95** | 15 + 8 + 10 + 20 + 25 + 12 + 5 = 95                                                                                                                                                                                                                                                                                                             |

Reviewed against the supplied rubric on 2026-11-26. The total is a self-assessment,
not a guaranteed grade; the evidence supports the claimed bands, with the ownership
interpretation below still subject to lecturer judgment.
The remote tag/CI above verifies `39c66e5`; this documentation review must be
published and included in the final tagged commit before submission.

## What we did not manage

- **Spending cap (criterion 2, −2).** The Gemini API project is on the Free tier with
  no billing account, so it cannot incur charges. That is a different fact from a
  configured spending cap, and no cap is configured. The rubric's capped-key line is
  therefore not met, and we claim 8 rather than 10.
- **Contract break not caught in CI (criterion 6).** Red commit `297d44d` and
  restoration `531967f` exist and were verified locally, but no PR or CI run was made
  on the red commit. Without it the rubric places criterion 6 in the 8–12 band, so we
  claim 12.
- **Ownership test against another user's data (criterion 6).** `GET /places`
  is a public shared catalogue with no owned records. Our tests prove the public rule
  (same result anonymous or signed in, user selectors rejected with 400, no private
  fields), but they cannot show a 403/404 for another user's resource because none
  exists. We did not invent a private resource to manufacture that case. Full marks
  here depend on the lecturer accepting this interpretation.
- **Production scale.** The cursor revision store is in-memory and process-local,
  with no retention bound; it would need shared persistence before production.
  The place data is synthetic. Neither is a PA2 requirement.
