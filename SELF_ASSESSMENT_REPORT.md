# Self-assessment — PA2 working draft

Team: Nguyễn Tiến Luật — 23127221; Đặng Nghi Văn — 23127281; Phạm Chí Bảo Ninh — 23127446.

Total claimed: pending team review and the remaining criterion 6 evidence; not ready for submission.

| Criterion                   |     Max | Claim                  | Evidence                                                                                                                                                                                                                                                                          |
| --------------------------- | ------: | ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Rules file                  |      15 | 15                     | [AGENTS.md](AGENTS.md) and [rules guidance](docs/pa2/README.md)                                                                                                                                                                                                                   |
| Permissions and secrets     |      10 | TODO - verify evidence | [Policy](docs/pa2/PERMISSIONS.md), [.env.example](.env.example), [audit](docs/pa2/evidence/secrets-audit.md), [no-billing/Free-tier evidence](README.md). No paid spending cap exists because the tool is currently free; this may not satisfy the rubric's 9-10-band requirement |
| One command for every check |      10 | 10                     | [README commands](README.md), [package scripts](package.json), [CI workflow](.github/workflows/ci.yml), [successful PR run](https://github.com/Tienluat123/WebNC/actions/runs/44907080432)                                                                                        |
| CI that blocks a merge      |      20 | 20                     | [PA2 evidence](PA2.md), [red required-check screenshot](docs/pa2/evidence/pr-1-required-check-red.png), [green required-check screenshot](docs/pa2/evidence/pr-1-required-check-green.png), [protection screenshots](docs/pa2/evidence/README.md)                                 |
| One endpoint contract       |      25 | 25                     | [GET /places contract](docs/contract/endpoint.md), [implementation](backend/src/places.js), [HTTP tests](backend/test/contract/places.test.js)                                                                                                                                    |
| Contract tests that bite    |      15 | 15 local / CI pending  | HTTP tests pass 35/35 locally; red commit `297d44d` failed 3/35, and fix commit `531967f` restored 35/35. GitHub PR CI red/green runs are still required                                                                                                                          |
| AI-LOG.md                   |       5 | 5                      | [AI-LOG.md](AI-LOG.md), including the 2026-11-23 test and Rules work                                                                                                                                                                                                              |
| **Total**                   | **100** | **75 provisional**     | Criterion 6 CI is still pending; remaining team review determines the final score                                                                                                                                                                                                 |

## What remains incomplete

- A real implementation/contract violation must be caught by GitHub CI for criterion 6. Local red/green proof is complete at `297d44d` / `531967f`, but PR CI runs are still required.
- The submission `pa2` tag and tag-run CI link require the final team-approved commit and push.

Lecturer's notes: each claimed criterion needs evidence pointing to a file, commit, PR or CI run. The total must match the ZIP filename. Review the honesty-adjustment table in the rubric before submitting.
