# Repository rules — AI Travel Planner

This is the working draft for PA#2 criterion 1. Keep current decisions here; record
assistant usage and incidents in [AI-LOG.md](AI-LOG.md).

## Stack

- Frontend: React with TypeScript.
- Backend: Express on Node.js.
- Runtime: Node.js 22.23.2 and npm 10.9.8. Use `.nvmrc`, `package.json` and
  `package-lock.json` as the setup source of truth; use the same runtime locally and in CI.
- Checks: ESLint, Prettier, TypeScript (`tsc`) and Node's `node:test`.
- No database is selected. The model provider/model for the project is Google Gemini
  `gemini-3.5-flash-lite` for this draft, but no model key or real model call belongs
  in browser code or unit/contract tests.
- The current PA2 endpoint is `GET /places`. It uses synthetic public catalogue data;
  it is not evidence that real places are checked or owned. Contract behavior is
  defined in `docs/contract/endpoint.md`.

## Commands

- Setup: `npm ci`
- Lint: `npm run lint`
- Format check: `npm run format:check`
- Type check: `npm run typecheck`
- Tests: `npm test`
- All checks: `npm run check`
- Start the server: `npm start`

Keep these commands identical in `package.json`, the root README and CI. Do not
change tests, fixtures or validators solely to make a failing check pass.

## Conventions

- Keep frontend code under `frontend/` and backend code under `backend/`; place
  backend tests under `backend/test/`.
- Keep backend contract tests under `backend/test/contract/` and exercise the HTTP
  boundary, not only internal helpers. Verify status, media type, JSON/problem schema,
  public fields, ownership-independent behavior, filters, paging and cursor errors.
- `GET /places` contract tests must cover public success, public-field projection,
  AND-combined filters, unknown or repeated parameters, private-selector rejection,
  cursor binding and expiry, 500 redaction and the absence of write behavior.
- Run `npm test` after changing `GET /places`, its contract or its contract tests.
  Record actual pass/fail evidence in `AI-LOG.md`; do not claim a test pass before
  running the command.
- Use TypeScript types and schema validation for model-facing JSON and API
  boundaries. Return explicit, structured errors; do not silently fall back.
- For `GET /places`, preserve the adopted public-catalogue ownership policy: anonymous
  and signed-in requests receive the same public result. Reject `userId`, `ownerId`,
  `groupId` and other unknown query parameters. Never project owner email or private
  catalogue metadata into `PlaceSummary`.
- Combine place filters with AND semantics. Preserve cursor binding, catalogue revision,
  evaluation time and 24-hour expiry. Do not silently switch revisions or trim/case-fold
  query values.
- The model may access place and profile data only through the seven backend JSON
  tools. Money calculations and plan validation must remain plain backend code.
- Keep both user confirmations: candidate review before scheduling and schedule/
  spending review before Save. The backend must validate once more before sharing.
- Keep model keys in the backend, and never send names or email addresses to the
  model.
- Document endpoint changes in `docs/contract/`, including errors, ownership,
  paging or idempotency where applicable, and update contract tests in the same
  change.
- Do not claim incident-backed rules until a real incident is recorded in
  [AI-LOG.md](AI-LOG.md) or a commit.

Permission policy: [docs/pa2/PERMISSIONS.md](docs/pa2/PERMISSIONS.md). Complete
its Allowed / Ask first / Never tiers before using this as final policy. Assistants
must follow those tiers within the user's authorized task.

The lecturer requires at least two rules to trace to something that actually went
wrong through a commit or AI-LOG entry. No such incidents are recorded yet; add
the evidence and link the affected rules when they occur.

## Never

- No model key in the browser bundle.
- No real model call in unit tests.
- Never edit a test, eval data or a validator rule just to make a check pass.
- Never share a schedule before the user presses Save and the backend validator
  passes.
- Never let the model calculate money, bypass the tool boundary, or use
  unverified places in a schedule.
- Never send names or email addresses to the model.
