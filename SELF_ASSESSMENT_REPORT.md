# Self-assessment — PA2 working draft

Team: Nguyễn Tiến Luật — 23127221; Đặng Nghi Văn — 23127281; Phạm Chí Bảo Ninh — 23127446.

Total claimed: pending team review and the remaining criterion 6 evidence; not ready for submission.

| Criterion                   |     Max | Claim              | Evidence                                                                                                                                                                                                                                                                   |
| --------------------------- | ------: | ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Rules file                  |      15 | 15                 | [AGENTS.md](AGENTS.md) and [rules guidance](docs/pa2/README.md)                                                                                                                                                                                                            |
| Permissions and secrets     |      10 | 8 provisional      | [Policy](docs/pa2/PERMISSIONS.md), [.env.example](.env.example), [audit](docs/pa2/evidence/secrets-audit.md), [no-billing/Free-tier evidence](README.md). Permissions and secret handling are complete, but no paid spending cap exists because the tool is currently free |
| One command for every check |      10 | 10                 | [README commands](README.md), [package scripts](package.json), [CI workflow](.github/workflows/ci.yml), [successful PR run](https://github.com/Tienluat123/WebNC/actions/runs/44907080432)                                                                                 |
| CI that blocks a merge      |      20 | 20                 | [PA2 evidence](PA2.md), [red required-check screenshot](docs/pa2/evidence/pr-1-required-check-red.png), [green required-check screenshot](docs/pa2/evidence/pr-1-required-check-green.png), [protection screenshots](docs/pa2/evidence/README.md)                          |
| One endpoint contract       |      25 | 25                 | [GET /places contract](docs/contract/endpoint.md), [implementation](backend/src/places.js), [HTTP tests](backend/test/contract/places.test.js)                                                                                                                             |
| Contract tests that bite    |      15 | 8 provisional      | HTTP tests cover success, validation, cursor, paging, private selectors and every application error shape locally. The public `GET /places` contract has no other-user owned resource. GitHub PR red/green CI proof is also still required                                 |
| AI-LOG.md                   |       5 | 5                  | [AI-LOG.md](AI-LOG.md), including the 2026-11-23 test and Rules work                                                                                                                                                                                                       |
| **Total**                   | **100** | **91 provisional** | 15 + 8 + 10 + 20 + 25 + 8 + 5 = 91. Remaining GitHub and owned-resource evidence determines criterion 6                                                                                                                                                                    |

## What remains incomplete

- Criterion 6 is capped at 8-12 until a GitHub PR required-check run demonstrates a deliberate contract-break commit going red and a fix commit going green. The public catalogue cannot test access to another user's private data; an owned-resource implementation or a rubric-approved equivalent is needed for 13-15.
- The submission `pa2` tag and tag-run CI link require the final team-approved commit and push.

Lecturer's notes: each claimed criterion needs evidence pointing to a file, commit, PR or CI run. The total must match the ZIP filename. Review the honesty-adjustment table in the rubric before submitting.
