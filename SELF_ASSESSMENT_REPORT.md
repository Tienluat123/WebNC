# Self-assessment — PA2 working draft

Team: Nguyễn Tiến Luật — 23127221; Đặng Nghi Văn — 23127281; Phạm Chí Bảo Ninh — 23127446.

Total claimed: pending team review and the remaining criterion 6 evidence; not ready for submission.

| Criterion                   |     Max | Claim              | Evidence                                                                                                                                                                                                                                          |
| --------------------------- | ------: | ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Rules file                  |      15 | 15               | [AGENTS.md](AGENTS.md) and [rules guidance](docs/pa2/README.md)                                                                                                                                                                                   |
| Permissions and secrets     |      10 | 10               | [Policy](docs/pa2/PERMISSIONS.md), [.env.example](.env.example), [audit](docs/pa2/evidence/secrets-audit.md), [model cost and Free-tier evidence](README.md)                                                                                      |
| One command for every check |      10 | 10                 | [README commands](README.md), [package scripts](package.json), [CI workflow](.github/workflows/ci.yml), [successful PR run](https://github.com/Tienluat123/WebNC/actions/runs/44907080432)                                                        |
| CI that blocks a merge      |      20 | 20                 | [PA2 evidence](PA2.md), [red required-check screenshot](docs/pa2/evidence/pr-1-required-check-red.png), [green required-check screenshot](docs/pa2/evidence/pr-1-required-check-green.png), [protection screenshots](docs/pa2/evidence/README.md) |
| One endpoint contract       |      25 | 25                 | [GET /places contract](docs/contract/endpoint.md), [implementation](backend/src/places.js), [HTTP tests](backend/test/contract/places.test.js)                                                                                                    |
| Contract tests that bite    |      15 | 15               | Executable HTTP tests exist and pass 35 tests locally; a deliberate contract-break commit and red CI run are still required                                                                                                                       |
| AI-LOG.md                   |       5 | 5                  | [AI-LOG.md](AI-LOG.md), including the 2026-11-23 test and Rules work                                                                                                                                                                              |
| **Total**                   | **100** | **75 provisional** | Criterion 6 and the remaining team review determine the final score                                                                                                                                                                               |

## What remains incomplete

- A real implementation/contract violation must be caught by CI for criterion 6. Passing executable contract tests is not sufficient without the deliberate red/green evidence.
- The final `pa2` tag and tag-run CI link are pending.

Lecturer's notes: each claimed criterion needs evidence pointing to a file, commit, PR or CI run. The total must match the ZIP filename. Review the honesty-adjustment table in the rubric before submitting.
