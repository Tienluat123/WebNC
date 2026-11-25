# PA2 — Harness and quality gate

Repository: <https://github.com/Tienluat123/WebNC>

Team: Nguyễn Tiến Luật — 23127221; Đặng Nghi Văn — 23127281; Phạm Chí Bảo Ninh — 23127446.

Status (2026-11-25): submission dossier, not yet tagged. Endpoint `GET /places`, its
contract, HTTP contract tests, required CI and branch protection are in place.
The format red/green demonstration ran on PR #1. The contract-break demonstration
is recorded locally but has not yet run in CI (see below). Claimed total: **95 / 100**, explained in
[SELF_ASSESSMENT_REPORT.md](SELF_ASSESSMENT_REPORT.md). [File map](docs/pa2/README.md).

## Required links

| Lecturer's requirement                          | Evidence                                                                                                                                                                                                                                                                                                                                                                                     |
| ----------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Public repository                               | [Tienluat123/WebNC](https://github.com/Tienluat123/WebNC), public visibility verified through the GitHub API.                                                                                                                                                                                                                                                                                |
| Protected-branch settings (screenshot accepted) | [Settings](https://github.com/Tienluat123/WebNC/settings/branches); screenshots: [main / PR requirement](docs/pa2/evidence/main-protection-01.png), [required checks / admin enforcement](docs/pa2/evidence/main-protection-02.png), [force pushes / deletion disabled](docs/pa2/evidence/main-protection-03.png).                                                                           |
| PR blocked by a red required check              | [PR #1](https://github.com/Tienluat123/WebNC/pull/1); [red commit 868f505](https://github.com/Tienluat123/WebNC/commit/868f505b763e424efeae7cc7cfb044e4fe47fcf8); [failed run](https://github.com/Tienluat123/WebNC/actions/runs/44906808477); [screenshot showing Required failure and disabled merge](docs/pa2/evidence/pr-1-required-check-red.png).                                      |
| PR / commit that turned the check green         | Same PR, [fix commit 2b3c61c](https://github.com/Tienluat123/WebNC/commit/2b3c61ce7116cf8d88e892c0896cdc7f213947eb); [successful run](https://github.com/Tienluat123/WebNC/actions/runs/44907080432); [screenshot showing Required success and enabled merge](docs/pa2/evidence/pr-1-required-check-green.png).                                                                              |
| CI run for the submitted `pa2` tag              | Not yet final. Tag `pa2` currently points to `e2834b6`, which predates this version of the dossier; it must be moved to the commit containing this file and its CI run recorded here. The run for `e2834b6` passed ([run 45213634429](https://github.com/Tienluat123/WebNC/actions/runs/45213634429): `npm ci`, lint, format check, typecheck and 35/35 tests on Node 22.23.2 / npm 10.9.8). |
| Deliberate contract break caught by CI (red)    | Not yet run in CI. Red commit [297d44d](https://github.com/Tienluat123/WebNC/commit/297d44df80cf1050460e126ed0017c84c3e0f457) changes `GET /places` success from 200 to 201; it failed 3 of 35 tests locally (`201 !== 200`). No PR or CI run exists for it yet.                                                                                                                             |
| Contract restored, CI green                     | Not yet run in CI. Restoration commit [531967f](https://github.com/Tienluat123/WebNC/commit/531967f) passed 35/35 locally.                                                                                                                                                                                                                                                                   |

## Criteria 3–4: commands and gate behavior

Owner: Nguyễn Tiến Luật — 23127221. Verified on 2026-11-21.

- [README setup/checks](README.md#setup-và-checks--luật-rubric-3), [npm scripts](package.json), [workflow](.github/workflows/ci.yml): Node.js 22.23.2 / npm 10.9.8; `npm ci`, then `npm run lint`, `npm run format:check`, `npm run typecheck`, `npm test`. Local and CI use the same commands.
- A new remote clone of `luat/p1-checks-ci` at `2b3c61c`, with no existing `node_modules`, passed `npm ci` and `npm run check`. The successful GitHub PR run also completed installation and all four checks.
- `main` requires a PR and the `checks` check from GitHub Actions, with strict up-to-date checks and admin enforcement. Required approvals are 0; force pushes and branch deletion are disabled. These saved settings were verified through the GitHub API on 2026-11-21, in addition to the screenshots.
- Red commit `868f505` removed indentation from the `name` line in `package.json`, leaving valid JSON. CI failed at `npm run format:check` with exit code 1. At that head, GitHub reported the PR merge state as `BLOCKED`.
- Fix commit `2b3c61c` restored only that indentation. CI succeeded and GitHub reported `CLEAN`. Neither tests nor validator rules were changed to make the check pass.
- The red and fix commits remain separate in PR history. No rebase, squash or force push was used for this demonstration. Remote `main` is still `fd93b682f8aaa4ce0501104f59853edecbfa69f1`, unchanged since protection was enabled.

## Criteria 5–6: contract and contract tests

- Contract: [docs/contract/endpoint.md](docs/contract/endpoint.md) (`GET /places`).
  The rubric lists `GET /places` as a valid choice. Its ownership rule is that the
  catalogue is public and shared: anonymous and signed-in callers receive the same
  result, and `userId` / `ownerId` / `groupId` selectors are rejected with 400.
  The endpoint has no owned resource, so there is no "another user's data" case to
  deny; the tests prove the public ownership rule instead. See
  [the ownership note in the contract](docs/contract/endpoint.md#get-places---search-the-shared-checked-catalogue).
- Tests: [backend/test/contract/places.test.js](backend/test/contract/places.test.js)
  and [backend/test/places.test.js](backend/test/places.test.js), 35 tests run by
  `npm test` in the required `checks` job.
- Deliberate break: commit `297d44d` changed only `backend/src/app.js` so the
  success status became 201 instead of the contracted 200. Tests and contract were
  not touched. Locally it failed 3 of 35 tests with `201 !== 200`. A PR/CI run on this
  commit has not been made yet, so criterion 6 is claimed in the 8–12 band.
  Restoration commit `531967f` changed only the same line back to 200.

## Secrets audit

Rerun on 2026-11-25 over every fetched ref; 0 findings. Details and scope:
[secrets-audit.md](docs/pa2/evidence/secrets-audit.md).

## Submission packaging

- Before packaging: commit this dossier, move tag `pa2` to that commit, push the tag and
  confirm its CI run is green on that exact SHA. Not done yet.
- ZIP name: `23127221-23127281-23127446_95.zip` (total matches the self-assessment).
- The ZIP contains the repository including `.git` (with tag `pa2` and full history),
  `PA2.md`, `AI-LOG.md` and `SELF_ASSESSMENT_REPORT.md` at the root. It excludes
  `node_modules`, `.env` and other ignored local files.
- Verify before upload: extract the ZIP, `git checkout pa2`, `npm ci`, `npm run check`.
- One member submits from their `<StudentID>@student.hcmus.edu.vn` Google account.

Lecturer's note: history rebased or rebuilt after work is finished does not count as evidence for criteria 4 and 6. No evidence commit in this dossier was rebased or rebuilt.
