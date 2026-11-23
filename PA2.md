# PA2 — Harness and quality gate

Repository: <https://github.com/Tienluat123/WebNC_Proposal>

Status (2026-11-21): P1 permissions and GET /places contract/implementation are
present. The team has selected Google Gemini API and `gemini-3.5-flash-lite`;
the Free-tier project has no linked billing account, enforcing a USD 0 paid-spend
boundary. Redacted account evidence is included.
Checks/required CI, protected-branch evidence and final self-assessment are not
complete. [File map](docs/pa2/README.md).

## P1 evidence - criteria 2 and 5

| Item                                      | Evidence                                                                                                                                                                                                                                                               |
| ----------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Permission tiers and secret policy        | [PERMISSIONS.md](docs/pa2/PERMISSIONS.md)                                                                                                                                                                                                                              |
| Environment variable names                | [.env.example](.env.example)                                                                                                                                                                                                                                           |
| Local history/working-file audit          | [Audit evidence](docs/pa2/evidence/secrets-audit.md)                                                                                                                                                                                                                   |
| Adopted endpoint contract                 | [GET /places](docs/contract/endpoint.md)                                                                                                                                                                                                                               |
| Endpoint implementation and setup         | [Backend README](backend/README.md)                                                                                                                                                                                                                                    |
| Rubric review, verification and handoff   | [P1 review](docs/pa2/evidence/p1-review.md)                                                                                                                                                                                                                            |
| Model spending control and cost benchmark | [README](README.md), [redacted account evidence](docs/pa2/evidence/gemini-free-tier-no-billing-2026-11-21.png), [cost evidence](docs/pa2/evidence/model-cost-benchmark.md): Free tier, no billing account, USD 0 paid-spend boundary; one synthetic itinerary measured |

These file links are local work evidence, not PR/CI or full-score claims.
Status: Luật's criteria 3–4 evidence is assembled. The team submission is not final: contract-break evidence, the submitted `pa2` tag/run and assessment of the other criteria remain pending. [File map](docs/pa2/README.md).

## Required links

| Lecturer's requirement                          | Evidence                                                                                                                                                                                                                                                                                                                                                |
| ----------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Public repository                               | [Tienluat123/WebNC](https://github.com/Tienluat123/WebNC), public visibility verified through the GitHub API on 2026-11-21.                                                                                                                                                                                                                             |
| Protected-branch settings (screenshot accepted) | [Settings](https://github.com/Tienluat123/WebNC/settings/branches); screenshots: [main / PR requirement](docs/pa2/evidence/main-protection-01.png), [required checks / admin enforcement](docs/pa2/evidence/main-protection-02.png), [force pushes / deletion disabled](docs/pa2/evidence/main-protection-03.png).                                      |
| PR blocked by a red required check              | [PR #1](https://github.com/Tienluat123/WebNC/pull/1); [red commit 868f505](https://github.com/Tienluat123/WebNC/commit/868f505b763e424efeae7cc7cfb044e4fe47fcf8); [failed run](https://github.com/Tienluat123/WebNC/actions/runs/44906808477); [screenshot showing Required failure and disabled merge](docs/pa2/evidence/pr-1-required-check-red.png). |
| PR / commit that turned the check green         | Same PR, [fix commit 2b3c61c](https://github.com/Tienluat123/WebNC/commit/2b3c61ce7116cf8d88e892c0896cdc7f213947eb); [successful run](https://github.com/Tienluat123/WebNC/actions/runs/44907080432); [screenshot showing Required success and enabled merge](docs/pa2/evidence/pr-1-required-check-green.png).                                         |
| CI run for submitted pa2 tag                    | Pending: create/push the final `pa2` tag only when the whole team submission is ready, then add its run URL. The PR run above is not a tag run.                                                                                                                                                                                                         |
| Deliberate contract break caught by CI          | Pending Văn/Ninh's implementation and real contract tests. The format failure above demonstrates criterion 4 only; it is not a contract violation.                                                                                                                                                                                                      |

## Criteria 3–4: commands and gate behavior

Owner: Nguyễn Tiến Luật — 23127221. Verified on 2026-11-21.

- [README setup/checks](README.md#setup-và-checks--luật-rubric-3), [npm scripts](package.json), [workflow](.github/workflows/ci.yml): Node.js 22.23.2 / npm 10.9.8; `npm ci`, then `npm run lint`, `npm run format:check`, `npm run typecheck`, `npm test`. Local and CI use the same commands.
- A new remote clone of `luat/p1-checks-ci` at `2b3c61c`, with no existing `node_modules`, passed `npm ci` and `npm run check`. The successful GitHub PR run also completed installation and all four checks.
- `main` requires a PR and the `checks` check from GitHub Actions, with strict up-to-date checks and admin enforcement. Required approvals are 0; force pushes and branch deletion are disabled. These saved settings were verified through the GitHub API, in addition to the screenshots.
- Red commit `868f505` removed indentation from the `name` line in `package.json`, leaving valid JSON. CI failed at `npm run format:check` with exit code 1. At that head, GitHub reported the PR merge state as `BLOCKED`.
- Fix commit `2b3c61c` restored only that indentation. CI succeeded and GitHub reported `CLEAN`. Neither tests nor validator rules were changed to make the check pass.
- The red and fix commits remain separate in PR history. No rebase, squash or force push was used for this demonstration. During verification, remote `main` was still `fd93b682f8aaa4ce0501104f59853edecbfa69f1`, unchanged from before protection was enabled; assistant work was pushed only to the feature branch.

The test runner currently reports a passing comment-only test file. There are no endpoint assertions yet. This evidence validates the commands and merge gate, not criterion 6. See the [evidence index](docs/pa2/evidence/README.md) and [AI usage record](AI-LOG.md#2026-11-21--luật-commands-ci-and-evidence).

## Submission checklist

- TODO: tag the submitted commit pa2 and push the tag.
- Finalize PA2.md, AI-LOG.md and SELF_ASSESSMENT_REPORT.md in English; the current score and remote evidence are incomplete.
- These three root documents are written in English; remaining team entries and assessment still need completion and review.
- TODO: include the repository and .git in one ZIP.
- TODO: name it `23127221-23127281-23127446_<total>.zip`; total must match the self-assessment.
- TODO: one member submits using their student Google account.

Lecturer's note: history rebased or rebuilt after work is finished does not count as evidence for criteria 4 and 6.
