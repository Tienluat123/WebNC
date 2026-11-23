# Repository rules — AI Travel Planner

This is the working draft for PA#2 criterion 1. Keep current decisions here; record
assistant usage and incidents in [AI-LOG.md](AI-LOG.md).

## Stack

- Frontend: React with TypeScript.
- Backend: Express on Node.js. Pin the Node.js version before implementation and use
  the same version locally and in CI.
- Checks: ESLint, Prettier, TypeScript (`tsc`) and Node's `node:test`.
- No database, model provider, or model is selected in this draft. Do not add one
  here until the team records the decision in the README and AI-LOG.

## Commands

The repository is currently a skeleton: `package.json` has no scripts and dependencies
are not installed. Until implementation adds them, these checks must be treated as
unavailable rather than as passing:

- Setup: `npm install`
- Lint: `npm run lint`
- Format check: `npm run format:check`
- Type check: `npm run typecheck`
- Tests: `npm test`

When scripts are added, keep these commands identical in `package.json`, the root
README and CI.

## Conventions

- Keep frontend code under `frontend/` and backend code under `backend/`; place
  backend tests under `backend/test/`.
- Use TypeScript types and schema validation for model-facing JSON and API
  boundaries. Return explicit, structured errors; do not silently fall back.
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
