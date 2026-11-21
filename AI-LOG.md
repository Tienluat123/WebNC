# AI-LOG — PA2

This is the AI-usage journal for criterion 7, not the Rules file. AGENTS.md holds current rules; an entry here may support a rule by recording a real incident.

Lecturer's requirement: state which tool was used for which part, with real Changed / Rejected entries. Generic entries are insufficient. Tool: none is valid if no assistant was used.

## 2026-11-21 — Luật: commands, CI and evidence

Date: 2026-11-21 (Asia/Ho_Chi_Minh).

Tool: Codex.

Used for: Nguyễn Tiến Luật's criteria 3–4: npm commands/dependencies, JS/TS lint and typecheck, formatting, Node test runner, GitHub Actions, README updates, a real required-check failure/fix and evidence assembly. Luật configured branch protection in the GitHub UI and supplied the screenshots; Codex verified the saved settings through read-only API calls.

Changed: Empty tool configs and the inactive workflow template became executable checks using Node.js 22.23.2 / npm 10.9.8. `jsconfig.json` was replaced by `tsconfig.json`, an npm lockfile was generated, and README commands were aligned with CI. Commit `03521d7` introduced the setup. At the user's request, Codex deliberately removed indentation from one `package.json` line in `868f505`: CI failed in format check and the required check blocked PR #1. After Luật supplied the blocked-PR screenshot, `2b3c61c` restored the indentation; all four checks passed and the merge gate cleared. Existing tests/validator rules were not altered. A separate remote clone passed `npm ci` and `npm run check`. Five user-supplied screenshots were then copied unchanged into the existing evidence directory.

Rejected: Luật rejected extra explanatory documents (`CI.md`, a proposed protection JSON payload and a separate local-check report), asking for explanations in chat. Codex initially interpreted that too broadly and reverted the setup as well. Luật clarified that the setup must remain; Codex restored it and kept those extra guide documents removed. Later, Luật explicitly requested README updates and completion of this evidence dossier. The artifact scope was corrected to the existing submission documents plus the requested screenshots.

Environment issue: The default Homebrew Node 24.9.0 could not start because `libsimdjson.27.dylib` was missing. The installed Node 22.23.2 worked, so checks used that binary and `.nvmrc`/CI selected the same version. No system library or global runtime was modified.

Evidence: [PR #1](https://github.com/Tienluat123/WebNC/pull/1), [setup commit](https://github.com/Tienluat123/WebNC/commit/03521d78f2eb7b65d1534612d6cd815804cd2761), [red commit](https://github.com/Tienluat123/WebNC/commit/868f505b763e424efeae7cc7cfb044e4fe47fcf8), [red run](https://github.com/Tienluat123/WebNC/actions/runs/44906808477), [fix commit](https://github.com/Tienluat123/WebNC/commit/2b3c61ce7116cf8d88e892c0896cdc7f213947eb), [green run](https://github.com/Tienluat123/WebNC/actions/runs/44907080432), [screenshots and verification details](docs/pa2/evidence/README.md).

Limitations: The contract test is still a comment-only file; no contract-break or final-tag evidence is claimed. Other members must add their own actual AI usage and assessment. Rule changes based on these incidents remain for the team's Rules review.

## Entry template

Date: TODO — actual work date.

Tool: TODO — tool actually used.

Used for: TODO — specific work performed with the assistant.

Changed: TODO — what the assistant proposed, what the team changed, and why.

Rejected: TODO — which suggestion was rejected and why.

Evidence: TODO — relevant file, commit or CI run when available. If this incident leads to a rule in AGENTS.md, link that rule to this entry.
