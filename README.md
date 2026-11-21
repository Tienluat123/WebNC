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

The 2026-11-21 local rerun passed all 31 service and HTTP tests. This supersedes
the earlier same-day run where the assistant environment blocked localhost with
`EACCES`; the restriction did not reproduce in this checkout. This is local
verification, not a CI pass. Lint, formatting and typecheck commands are not implemented.

## Permissions, secrets and model budget

Assistant actions follow [PERMISSIONS.md](docs/pa2/PERMISSIONS.md).
The backend currently reads only PORT and CURSOR_SECRET; both variable names
have empty values in .env.example. GET /places makes no model calls.

Run `python -X utf8 scripts/audit-secrets.py` for the local heuristic audit.
See [audit results and limitations](docs/pa2/evidence/secrets-audit.md).

The team reports the following model-account configuration:

- Provider: Google Gemini API.
- Project: `travel-planner`.
- Model: `gemini-3.5-flash-lite`.
- Billing: Free tier; no billing account is linked to the project.
- API connectivity: successfully tested by a team member; no key or test output is stored here.
- Paid-spend ceiling: USD 0, enforced continuously by the absence of a linked billing account.
- Configurable project spend-cap feature: not applicable while the project remains on the Free tier.
- Full itinerary-generation cost: not measured.

This is an account-side zero paid-spend boundary, not a budget alert and not a
claim that the configurable paid-tier spend-cap control was set. Google documents
the Free-tier billing cap as N/A; API keys inherit the project's billing status.
If a billing account is linked later, the USD 0 boundary no longer applies and
the team must configure a project spend cap before using the key. See the
[Gemini API billing documentation](https://ai.google.dev/gemini-api/docs/billing).
No model key is committed or requested. A redacted account screenshot should
retain the project name, Free-tier badge and no-billing message while hiding the
email address and project identifier. The repository includes that
[redacted account evidence](docs/pa2/evidence/gemini-free-tier-no-billing-2026-11-21.png).

## Project and submission references

- [PA2 assignment map and ownership](docs/pa2/README.md).
- [PA2 submission entry](PA2.md) and [self-assessment](SELF_ASSESSMENT_REPORT.md).
- [AI usage log](AI-LOG.md).
- [PA2 rubric](<docs/reference/PA2 Rubric Harness Quality Gate.pdf>).
- [Lecturer's contract example](docs/reference/Contract.md).
- [Project brief](<docs/reference/AI Travel Planner Project Brief.pdf>).
- [PA1 proposal](docs/pa1/proposal.pdf).
