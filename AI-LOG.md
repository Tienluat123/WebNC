# AI-LOG — PA2

## 2026-11-21 — Luật: commands, CI and evidence

Tool: Codex.

Used for: Criteria 3–4: npm scripts, ESLint/Prettier/TypeScript configuration, Node test runner, GitHub Actions and evidence documentation.

Changed: Codex configured the checks and lockfile, replaced the empty `jsconfig.json` with `tsconfig.json`, and aligned README/CI commands. Node.js 22.23.2 was selected after the local Node 24 binary failed to start. A deliberate format error in `package.json` made the required check fail and blocked PR #1; a separate fix commit restored green CI. A fresh remote clone passed `npm ci` and `npm run check`. Tests and validator rules were unchanged during the demonstration.

Human work: Luật created the PR, configured `main` protection in GitHub and captured the protection/red/green screenshots.

Rejected: Extra CI guide and proposed protection-payload files were dropped; the setup uses the workflow, GitHub's saved protection rule and the existing submission documents.

Evidence: [PA2 dossier](PA2.md), [screenshots and CI runs](docs/pa2/evidence/README.md), [red commit 868f505](https://github.com/Tienluat123/WebNC/commit/868f505b763e424efeae7cc7cfb044e4fe47fcf8), [fix commit 2b3c61c](https://github.com/Tienluat123/WebNC/commit/2b3c61ce7116cf8d88e892c0896cdc7f213947eb).

Pending: Real contract tests/contract-break evidence and the final submitted tag run.
