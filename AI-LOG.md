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

## Entry template

Used for: Reviewing the PA2 guidance, project brief, README, package manifest,
contract template, permissions template, and Git history; drafting
[AGENTS.md](AGENTS.md) and this log.

Changed: Replaced the AGENTS template TODOs with a provisional React/TypeScript +
Express/Node stack, the checks named by the PA2 guidance, product safety
invariants from the brief, and explicit skeleton-repository status. Added this
entry so the work is traceable. The draft intentionally does not choose a model,
database, Node version, or claim that checks pass because the repository does not
yet contain those decisions or scripts.

Rejected: The assistant did not invent setup/check commands, model or database
choices, incident evidence, or successful CI results. It also rejected treating
the lecturer's example rules as evidence of incidents in this repository.

Evidence: [AGENTS.md](AGENTS.md), [README.md](README.md),
[docs/pa2/README.md](docs/pa2/README.md),
[docs/AI-Travel-Planner-final-project-brief.md](docs/AI-Travel-Planner-final-project-brief.md),
and `package.json` (scripts currently empty). No incident-backed rule is claimed
yet; add real evidence here before linking one.
