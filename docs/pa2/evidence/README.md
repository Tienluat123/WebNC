# PA2 evidence

## Current evidence

- The [HTTP contract test suite](../../../backend/test/contract/places.test.js) was
  run locally on 2026-11-23: 35 tests passed, 0 failed. This verifies the local
  implementation, but it is not a GitHub Actions run or criterion 6 evidence.
- [Gemini API Free-tier and no-billing state](gemini-free-tier-no-billing-2026-11-21.png),
  captured 2026-11-21. The crop retains the project name, Free-tier badge and
  no-billing message while excluding the browser URL, email and API key.
- [Synthetic itinerary cost benchmark](model-cost-benchmark.md): one measured
  Free-tier call with paid-tier equivalent calculation and limitations.

## Remaining submission evidence

# PA2 evidence — Luật, criteria 3–4

The following screenshots were supplied by Luật on 2026-11-21 and copied unchanged. Original files remain in the user's Screenshots directory. This index links the actual images; it is not a substitute for evidence.

| Repository file                                                | Original screenshot                   | What it shows                                                                                        |
| -------------------------------------------------------------- | ------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| [main-protection-01.png](main-protection-01.png)               | Screenshot 2026-11-21 at 19.58.15.png | Target `main`, required PRs, approvals unchecked, required status checks and up-to-date requirement. |
| [main-protection-02.png](main-protection-02.png)               | Screenshot 2026-11-21 at 19.58.25.png | `checks` selected from GitHub Actions; admin bypass disabled.                                        |
| [main-protection-03.png](main-protection-03.png)               | Screenshot 2026-11-21 at 19.58.30.png | Force pushes and branch deletion disabled.                                                           |
| [pr-1-required-check-red.png](pr-1-required-check-red.png)     | Screenshot 2026-11-21 at 20.04.04.png | Failed `CI / checks`, the Required badge and disabled merge button.                                  |
| [pr-1-required-check-green.png](pr-1-required-check-green.png) | Screenshot 2026-11-21 at 20.06.23.png | Successful required check and enabled merge button after the fix.                                    |

The protection screenshots show the edit form. GitHub API inspection additionally confirmed the saved rule: required `checks` from GitHub Actions (app ID 15368), strict up-to-date checks, admin enforcement, 0 required approvals, force pushes/deletion disabled.

## Remote history

PR: [#1](https://github.com/Tienluat123/WebNC/pull/1), feature branch `luat/p1-checks-ci` into `main`.

| Stage                     | Commit                                                                                          | CI run                                                                       | Result                                                                 |
| ------------------------- | ----------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| Initial setup             | [03521d7](https://github.com/Tienluat123/WebNC/commit/03521d78f2eb7b65d1534612d6cd815804cd2761) | [44905373897](https://github.com/Tienluat123/WebNC/actions/runs/44905373897) | Success before the deliberate format failure.                          |
| Deliberate format failure | [868f505](https://github.com/Tienluat123/WebNC/commit/868f505b763e424efeae7cc7cfb044e4fe47fcf8) | [44906808477](https://github.com/Tienluat123/WebNC/actions/runs/44906808477) | `npm run format:check` failed on `package.json`; exit 1; PR `BLOCKED`. |
| Format restored           | [2b3c61c](https://github.com/Tienluat123/WebNC/commit/2b3c61ce7116cf8d88e892c0896cdc7f213947eb) | [44907080432](https://github.com/Tienluat123/WebNC/actions/runs/44907080432) | All four checks passed; PR `CLEAN`.                                    |

Both demo commits change only indentation on the `name` line of `package.json`. The JSON remained valid. Tests, fixtures and validator rules were unchanged. Keep both commits; do not rebuild their history.

## Fresh-clone verification

On 2026-11-21, a separate clone from GitHub at `2b3c61c` was checked with Node.js 22.23.2 / npm 10.9.8. `npm ci` installed 117 packages and `npm run check` exited 0. The original working tree's `node_modules` was not reused. The installer used a separate npm cache; audit/funding network requests were disabled for this local verification.

The green CI run above independently shows successful `npm ci`, lint, format check, typecheck and tests on GitHub's runner.

## Still pending for the team submission

- A real implementation/contract-test violation caught by CI (criterion 6). The HTTP contract tests now cover the adopted `/places` behavior; the format demo only satisfies criterion 4 and must not be reused as contract-break evidence.
- The CI run for the final submitted `pa2` tag. No final tag has been created for this work.
- Review of the remaining criteria and the final team score/ZIP.

The root [PA2.md](../../../PA2.md) is the submission link hub.
