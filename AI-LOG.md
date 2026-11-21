# AI-LOG — PA2 template

This is the AI-usage journal for criterion 7, not the Rules file. AGENTS.md holds current rules; an entry here may support a rule by recording a real incident.

Lecturer's requirement: state which tool was used for which part, with real Changed / Rejected entries. Generic entries are insufficient. Tool: none is valid if no assistant was used.

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

## Entry template

Date: TODO — actual work date.

Tool: TODO — tool actually used.

Used for: TODO — specific work performed with the assistant.

Changed: TODO — what the assistant proposed, what the team changed, and why.

Rejected: TODO — which suggestion was rejected and why.

Evidence: TODO — relevant file, commit or CI run when available. If this incident leads to a rule in AGENTS.md, link that rule to this entry.
