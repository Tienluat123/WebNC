# AI-LOG — PA2

This journal records actual assistant use. Current entries do not claim an incident
or a passing check unless the repository contains evidence for it.

## 2026-11-19 — Drafting repository rules

Tool: Copilot SDK in VS Code, using workspace file inspection and patch editing.

## 2026-11-19 - Places contract draft

Date: 2026-11-19.

Tool: ChatGPT / Codex.

Used for: reading the local PA2 rubric, project brief, assignment map and contract
example; drafting the GET /places contract and checking RFC 9457 against its
official publication.

Changed: replaced the empty endpoint contract outline with a proposed schema,
four search filters, cursor pagination, error types and compatibility rules.
Marked these choices as a draft for team review, because implementation and team
approval have not happened. Documented the mismatch between a public catalogue
and the rubric's explicit test of access to another user's data.

Rejected: no team rejection has been recorded in this session. This entry does
not claim a reviewed decision, a past failure, passing checks or completed CI evidence.

Evidence: [contract draft](docs/contract/endpoint.md). No commit or CI run yet.

## 2026-11-19 - Places implementation and local verification

Date: 2026-11-19.

Tool: ChatGPT / Codex.

Used for: implementing the draft places endpoint, synthetic catalogue, environment
setup, signed cursor pagination, service tests and HTTP contract tests.

Changed: added an Express application factory separate from server startup, with
an injected clock and catalogue loader. Added a public-field projection so source
metadata cannot leak into responses. Replaced the comment-only contract-test
outline with executable HTTP tests and added dependency-free service tests.

Rejected: the assistant did not substitute another HTTP framework or fabricate a
lockfile when npm installation failed. These are assistant implementation choices,
not a claim that a team member reviewed and rejected a proposal.

Verification: `npm run test:service` passed 27 tests. Source syntax checks and
`git diff --check` passed. `npm install` failed with ENOTFOUND for registry.npmjs.org;
`npm test` therefore failed to import Express. HTTP behavior remains unverified.
This is not deliberate contract-break evidence, required CI, or a completed PA2 gate.

Evidence: [backend setup and verification](backend/README.md),
[service tests](backend/test/places.test.js),
[HTTP contract tests](backend/test/contract/places.test.js).
No commit, PR or CI run was created.

## 2026-11-19 - User verified dependency installation and HTTP tests

Date: 2026-11-19.

Tool: ChatGPT / Codex for documentation updates; the user ran npm locally.

Used for: reconciling the implementation status with terminal results supplied
by the user after successful dependency installation.

Changed: README, backend instructions and contract status now report the user's
successful run: 31 tests passed, 0 failed, 0 skipped, including 4 HTTP tests.
Confirmed package-lock.json exists and documented npm ci for fresh clones.
The user's install reported 68 packages added and 0 audit vulnerabilities.

Rejected: no new rejected suggestion was recorded. The previous network failure
remains documented as history; it is not deliberate contract-break evidence.

Evidence: user-provided terminal output in this session,
[lockfile](package-lock.json), [backend verification](backend/README.md).
No PR, CI run or branch-protection evidence is claimed.

## 2026-11-19 - Adopted API decisions, permissions and local secrets audit

Date: 2026-11-19.

Tool: ChatGPT / Codex.

Used for: documenting the API decisions accepted by the user, completing assistant
permission tiers, and auditing locally available Git history and working files.

Changed: recorded the adopted public GET /places access policy, filters, response
and cursor behavior; filled Allowed / Ask first / Never with concrete repository
actions; added a repeatable Python/Git audit that prints locations, not credentials.
The audit inspected 17 reachable commits and 65 unique history blobs, including
PDF text extraction. No credential-pattern matches or committed private env paths
were detected. Working files and env-example/ignore rules were checked too.

Rejected: no additional user rejection was recorded. The provider/model and actual
spending cap remain pending; documentation does not represent them as configured.
The public-access decision does not establish that the lecturer has accepted the
owned-resource-test interpretation. No fabricated incident-derived rules were added.

Evidence: [permissions](docs/pa2/PERMISSIONS.md),
[audit script](scripts/audit-secrets.py),
[audit scope and counts](docs/pa2/evidence/secrets-audit.md),
[adopted contract](docs/contract/endpoint.md).
The audit is heuristic and limited to locally reachable history; no remote fetch,
credential validity check, commit, push or CI run was performed.

## 2026-11-21 - P1 continuation and rubric review

Tool: ChatGPT / Codex.

Used for: inspecting the existing local repo, reading the PA2 rubric and reviewing
Nghi Van's assigned criteria 2 and 5 against the adopted contract and implementation.

Changed: replaced stale scaffold-only status in the root README, PA2 entry and
assignment-map introduction; added P1 evidence links to the self-assessment
without inventing scores. Added a rubric-to-file review and explicit handoff to
the checks/CI and rules/tests owners. Corrected the repository URL to the configured
WebNC_Proposal remote, without claiming public visibility was checked.

The source checkout was detached at b50355d with existing uncommitted work.
The current session could read the source but could not switch branches there.
Prepared a separate writable copy preserving the existing files and Git history,
then created local branch p1 there. The original checkout was not changed.

Verification: 27 service tests passed on 2026-11-21. The audit inspected 17
reachable commits and 65 history blobs with no credential findings or incomplete
extraction; current working-file counts are recorded in the audit evidence.
The original checkout's four HTTP tests could not connect; a minimal independent
HTTP server reproduced connect EACCES on localhost. No HTTP tests were disabled
or changed, and this is not a current 31-test pass.

Rejected: did not treat the existence of a policy/audit as completion of the
actual spending-cap requirement; did not change the adopted public API to invent
an owned-resource denial, and did not claim PR/CI evidence from local checks.
These are recorded assistant decisions, not fabricated team-review rejections.

Remaining: actual provider/model/cap evidence; owned-resource interpretation for
criterion 6; required checks/CI and final submission owned by the rest of the team.
No provider account, billable call, remote push, merge or tag change was made.

Evidence: [P1 review](docs/pa2/evidence/p1-review.md),
[audit](docs/pa2/evidence/secrets-audit.md), [PA2 entry](PA2.md).

## 2026-11-21 - Direct checkout verification and evidence refresh

Tool: ChatGPT / Codex.

Used for: continuing Nghi Van's criteria 2 and 5 work directly on branch `p1`
on drive D, verifying the committed state, rerunning the complete suite and
refreshing local evidence against the rubric.

Changed: replaced the stale localhost-restriction status with the observed local
result: `npm test` passed all 31 tests, including four HTTP tests. Refreshed the
secret-audit HEAD and final pre-commit local-ref scope after commit `1a413e6`:
18 reachable commits and 96 unique history blobs, with no detected findings or
incomplete extraction.

Rejected: did not add a provider or model merely to make `GET /places` appear
AI-backed; the endpoint does not need one. Did not label a budget alert as a hard
cap or claim criterion 2 complete without account-side evidence. Did not change
the public contract or add a fabricated 403 to imitate an owned-resource test.

Evidence: [P1 review](docs/pa2/evidence/p1-review.md),
[audit](docs/pa2/evidence/secrets-audit.md), [backend verification](backend/README.md).
No push, merge, billing change or tag move was performed.

## 2026-11-21 - Model account status recorded

Tool: ChatGPT / Codex.

Used for: documenting the model-account configuration supplied by the user for
criterion 2 without requesting or storing an API key.

Changed: recorded Google Gemini API project `travel-planner`, model
`gemini-3.5-flash-lite`, Free tier with no billing account linked, and team-reported
successful connectivity. The user supplied an AI Studio Spend screenshot showing
that no billing is set up, then supplied a cropped copy that excludes the browser
URL, email and API key. Stored that copy as account-side evidence. Kept full
itinerary-generation cost as not measured.

Rejected: did not enable paid billing merely to manufacture rubric evidence and
did not describe the Free-tier state as use of Google's configurable spend-cap
feature. Instead, documented the stronger account-side fact that no linked billing
account enforces a continuous USD 0 ceiling on paid usage. If billing is linked
later, this evidence must be replaced with a configured project spend cap.

Evidence: [root README](README.md), [permissions and model status](docs/pa2/PERMISSIONS.md),
[P1 review](docs/pa2/evidence/p1-review.md),
[redacted account screenshot](docs/pa2/evidence/gemini-free-tier-no-billing-2026-11-21.png).
No API key, account credential, connectivity output or payment detail was requested or recorded.

The local task branch was subsequently renamed from `p1` to
`pa2-permissions-places` before committing this evidence refresh. No remote branch,
submission tag or shared history was changed by the rename.

## 2026-11-21 - Synthetic itinerary cost benchmark

Tool: ChatGPT / Codex for the measurement procedure and calculation; a team
member ran the Gemini API request locally.

Used for: replacing the unmeasured cost-per-itinerary placeholder with a
reproducible, synthetic one-call benchmark without storing or sharing the API key.

Changed: recorded model version `gemini-3.5-flash-lite`, 84 prompt tokens, 1,293
candidate tokens and 1,377 total tokens. The current Free-tier billed cost is
USD 0. At the official price recorded on 2026-11-21, the paid-tier equivalent is
USD 0.00162885 for this call.

Rejected: did not call the result a production average and did not infer missing
agent loops, retries, grounding or caching costs. Did not add the API key, response
body or personal travel data to the repository.

Evidence: [cost benchmark](docs/pa2/evidence/model-cost-benchmark.md),
[billing-state screenshot](docs/pa2/evidence/gemini-free-tier-no-billing-2026-11-21.png).

## 2026-11-21 — Luật: commands, CI and evidence

Tool: Codex.

Used for: Criteria 3–4: npm scripts, ESLint/Prettier/TypeScript configuration, Node test runner, GitHub Actions and evidence documentation.

Changed: Codex configured the checks and lockfile, replaced the empty `jsconfig.json` with `tsconfig.json`, and aligned README/CI commands. Node.js 22.23.2 was selected after the local Node 24 binary failed to start. A deliberate format error in `package.json` made the required check fail and blocked PR #1; a separate fix commit restored green CI. A fresh remote clone passed `npm ci` and `npm run check`. Tests and validator rules were unchanged during the demonstration.

Human work: Luật created the PR, configured `main` protection in GitHub and captured the protection/red/green screenshots.

Rejected: Extra CI guide and proposed protection-payload files were dropped; the setup uses the workflow, GitHub's saved protection rule and the existing submission documents.

Evidence: [PA2 dossier](PA2.md), [screenshots and CI runs](docs/pa2/evidence/README.md), [red commit 868f505](https://github.com/Tienluat123/WebNC/commit/868f505b763e424efeae7cc7cfb044e4fe47fcf8), [fix commit 2b3c61c](https://github.com/Tienluat123/WebNC/commit/2b3c61ce7116cf8d88e892c0896cdc7f213947eb).

Pending: Real contract tests/contract-break evidence and the final submitted tag run.

## 2026-11-23 — Contract tests and Rules alignment

Date: 2026-11-23.

Tool: Copilot SDK in VS Code, using workspace file inspection and patch editing.

Used for: reviewing the PA2 assignment guidance, comparing it with `AGENTS.md`
and the adopted `GET /places` contract, expanding the HTTP contract test suite,
and recording the result of this work.

Changed: updated `docs/pa2/README.md` to remove stale skeleton/comment-test language
and describe the current public `/places` implementation. Aligned `AGENTS.md` with
the actual Node 22 setup, package scripts, public-catalogue ownership policy,
`GET /places` conventions and HTTP contract-test requirements.

Expanded `backend/test/contract/places.test.js` with HTTP assertions for:
public response shape and field projection, Authorization independence, private
selector rejection, AND-combined filters, unknown-slug empty results, malformed
aggregate validation, cursor filter/limit tampering, write rejection, cursor expiry
and redacted 500 problem details.

Rejected: did not change implementation or validator behavior to make tests pass,
did not fabricate an owned-resource 403 for the public catalogue endpoint, and did
not claim a test pass before verification.

Verification: ran `npm.cmd test` on 2026-11-23. The suite passed 35 tests,
0 failed, including all HTTP contract tests and service tests.

Evidence: [PA2 guidance](docs/pa2/README.md),
[Rules file](AGENTS.md),
[adopted endpoint contract](docs/contract/endpoint.md),
[HTTP contract tests](backend/test/contract/places.test.js),
[service tests](backend/test/places.test.js).

## 2026-11-23 — Submission dossier reconciliation

Date: 2026-11-23.

Tool: Copilot SDK in VS Code, using workspace file inspection and patch editing.

Used for: cross-checking the PA2 assignment guidance against the project brief and
removing stale status claims across the repository submission documents.

Changed: reconciled root and backend setup instructions to Node.js 22.23.2 /
npm 10.9.8, updated test counts to the verified 35-test local run, replaced the
duplicated [self-assessment](SELF_ASSESSMENT_REPORT.md) draft with one table,
and clarified that a local passing suite is not criterion 6 evidence by itself.
Updated the PA2 dossier and evidence index so they do not describe HTTP contract
tests as comment-only or classify the format red/green demonstration as a
deliberate contract break.

Rejected: did not assign a final team score or claim that the submitted tag,
public visibility, contract-break CI, or team approval had been completed.

Evidence: [PA2 dossier](PA2.md),
[assignment map](docs/pa2/README.md),
[evidence index](docs/pa2/evidence/README.md),
[root setup](README.md),
[backend setup](backend/README.md),
[self-assessment](SELF_ASSESSMENT_REPORT.md).

## 2026-11-23 — Deliberate GET /places contract-break proof

Date: 2026-11-23.

Tool: Copilot SDK in VS Code, using Git and Node.js commands.

Used for: creating and verifying separate red/green evidence for rubric 6,
without changing contract tests or validator rules.

Changed: committed the reconciliation state as `3be11a7`.
At red commit `297d44d`, changed only `GET /places` success handling from status
200 to 201. No test, fixture or validator rule was edited for the break.

Verification: `npm.cmd test` at `297d44d` failed 3 of 35 tests and passed 32:
the public success test, unknown-slug empty-page test and Authorization/public
access test all expected contract status 200 but received 201.

Restored status 200 in separate fix commit `531967f`, again without changing
tests or validators. `npm.cmd test` at `531967f` passed 35 tests, 0 failed.
Evidence commit `d42da42` records the reconciliation and red/green proof.
The local `pa2` annotated tag is being pointed to the evidence commit; it has
not been pushed.

Rejected: did not alter test assertions to accept 201, relax status checks or
modify the implementation under test merely to obtain a green result.

Evidence: [red commit 297d44d](https://github.com/Tienluat123/WebNC/commit/297d44d),
[fix commit 531967f](https://github.com/Tienluat123/WebNC/commit/531967f),
[HTTP contract tests](backend/test/contract/places.test.js),
[PA2 evidence index](docs/pa2/evidence/README.md).

## 2026-11-23 — Free-tier spending status and criterion 6 review

Date: 2026-11-23.

Tool: Copilot SDK in VS Code, using workspace file review and rubric PDF extraction.

Used for: replacing misleading paid-spending-cap claims with the actual
no-billing/Free-tier status and explaining the exact rubric 6 evidence required.

Changed: the repository now states that the Gemini API project is Free tier, has
no billing account, and has no configured spending cap because the tool is free
in its current state. It does not describe no-billing as a paid-tier spending cap.
Updated the rubric map and self-assessment to distinguish local contract-break
proof from required PR/CI red-green evidence.

Rejected: did not claim criterion 2 is fully satisfied with a nonexistent
spending cap and did not count a format red/green demo or local-only test run as
criterion 6 evidence.

Rubric 6 requirements recorded: tests must follow the contract, cover each error
type, the ownership rule against another user's data, and paging/idempotency where
applicable; tests must check content/schema rather than status alone; they must run
in required CI; and a separate commit or PR must deliberately violate the contract
while CI goes red and then return to green through a fix.

Evidence: [spending status](docs/pa2/PERMISSIONS.md),
[PA2 rubric PDF](docs/reference/PA2%20Rubric%20Harness%20Quality%20Gate.pdf),
[contract test guide](docs/pa2/README.md),
[HTTP contract tests](backend/test/contract/places.test.js),
[red commit 297d44d](https://github.com/Tienluat123/WebNC/commit/297d44d),
[fix commit 531967f](https://github.com/Tienluat123/WebNC/commit/531967f).

## 2026-11-23 — Criterion 6 coverage and honest scoring adjustment

Date: 2026-11-23.

Tool: Copilot SDK in VS Code, using Node.js test tools and rubric review.

Used for: strengthening `GET /places` HTTP contract assertions and adjusting
rubric claims when the rubric requirement cannot be reproduced safely.

Changed: added RFC 9457 problem-detail shape checks for validation, cursor
expiration and internal errors. Reconfirmed that 400/410/500 problem bodies
have exact keys, status, type, title and non-empty details.

Adjusted scoring: criterion 2 is provisional 5-8 instead of a 9-10 claim,
because no paid billing account or configured spending cap exists. The Free-tier
state is honest evidence but does not satisfy the rubric's specific capped-key
requirement.

Adjusted criterion 6 to 8-12 provisionally. Existing tests cover success,
filter combinations, public/authorization independence, private selectors,
pagination/cursors, all three application error types and schema details. The
public catalogue has no owned private record, so it cannot demonstrate another
user's denied owned data. Required PR CI red/green proof is also not yet
available. The final 13-15 band is therefore not claimed.

Verification: `npm test` and `npm run format:check` must pass after the test
assertion changes. No implementation or test acceptance rule was weakened.
