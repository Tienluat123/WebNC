# AI Travel Planner

Repository: <https://github.com/Tienluat123/WebNC_Proposal>.

## PA2 status - 2026-11-21

GET /places is implemented with Express and explicitly synthetic fixtures.
The adopted [contract](docs/contract/endpoint.md) defines public access, four
AND-combined filters, signed cursor pagination and RFC 9457 errors.
See the [P1 review](docs/pa2/evidence/p1-review.md) for evidence and remaining work.

| Owner | Scope | Current state |
| --- | --- | --- |
| Nghi Van | #2 Permissions/secrets, #5 contract and endpoint | Implemented; actual model spending-cap evidence pending |
| Luat | #3 commands, #4 required CI/protection | Pending; workflow is still a non-active example |
| Ninh | #1 rules, #6 contract tests | Rules still contain TODOs; tests exist, full CI/red-green evidence pending |
| All | #7 AI log and submission | Log updated; final score, evidence links and submission packaging pending |

## Setup and verification

Use Node.js 22.18.x and npm 10.9.3, as documented in
[backend/README.md](backend/README.md). Run from the repository root:

```sh
npm ci
npm run test:service
npm test
```

For server setup, copy .env.example to .env, set PORT and a private CURSOR_SECRET
of at least 32 bytes, then run npm start. Follow the backend instructions to
generate the secret locally; never commit or share its value.

The 2026-11-21 service run passed 27 tests. The user's 2026-11-19 full run passed
31 tests. The current assistant environment blocks localhost connections with
EACCES, so its four HTTP tests could not be reverified. No current full-suite or
CI pass is claimed. Lint, formatting and typecheck commands are not implemented.

## Permissions, secrets and model budget

Assistant actions follow [PERMISSIONS.md](docs/pa2/PERMISSIONS.md).
The backend currently reads only PORT and CURSOR_SECRET; both variable names
have empty values in .env.example. GET /places makes no model calls.

Run `python -X utf8 scripts/audit-secrets.py` for the local heuristic audit.
See [audit results and limitations](docs/pa2/evidence/secrets-audit.md).

**Model provider, model identifier and enforced spending cap: pending.**
Criterion 2 is not complete without actual capped-key evidence. No model key has
been created or added in this task. The account owner must supply the provider,
model, cap amount/currency/period, enforcement behavior and redacted dated evidence.
A notification budget alone must not be described as a hard cap.
**Cost per plan: not measured.** Label any later estimate with its assumptions.

## Project and submission references

- [PA2 assignment map and ownership](docs/pa2/README.md).
- [PA2 submission entry](PA2.md) and [self-assessment](SELF_ASSESSMENT_REPORT.md).
- [AI usage log](AI-LOG.md).
- [PA2 rubric](<docs/reference/PA2 Rubric Harness Quality Gate.pdf>).
- [Lecturer's contract example](docs/reference/Contract.md).
- [Project brief](<docs/reference/AI Travel Planner Project Brief.pdf>).
- [PA1 proposal](docs/pa1/proposal.pdf).
