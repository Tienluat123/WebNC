# Secrets audit

## Current audit — 2026-11-25

Command: `python -X utf8 scripts/audit-secrets.py` from the repository root, in a
fresh clone of <https://github.com/Tienluat123/WebNC> after fetching every remote
branch and tag (`git fetch origin '+refs/heads/*:refs/remotes/origin/*' '+refs/tags/*:refs/tags/*'`).
PyMuPDF was installed so PDF text extraction ran.

| Item                                                         | Observed result                                                                                                                                                                      |
| ------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| HEAD                                                         | `e2834b69edb76436664f18d02a806f4f7cec4ff2` (`pa2`)                                                                                                                                   |
| Refs in scope                                                | `main` `fd93b68`, `pa2` `e2834b6`, tag `pa2`, `pa2-contract-break-demonstration` `297d44d`, `pa2-permissions-places` `5ec8d1a`, `setup/pa2` `7ff5399`, `luat/p1-checks-ci` `a29d707` |
| Reachable commits, all refs plus HEAD                        | 38 (equal to `git rev-list --all`)                                                                                                                                                   |
| Unique history blobs inspected                               | 207                                                                                                                                                                                  |
| Tracked and non-ignored working files inspected              | 49                                                                                                                                                                                   |
| Credential-pattern findings                                  | 0                                                                                                                                                                                    |
| Historical `.env` / `.env.*` paths other than `.env.example` | 0                                                                                                                                                                                    |
| `.env` ignored by Git                                        | Yes                                                                                                                                                                                  |
| Env-example variable names                                   | `PORT`, `CURSOR_SECRET`, both empty                                                                                                                                                  |
| Incomplete extraction                                        | None                                                                                                                                                                                 |

Result: no credential was detected in any commit on any remote branch or tag, nor
in the working tree. No rotation was needed. Commits added after this audit change
only Markdown documentation.

Spending control, stated as two separate facts:

- Billing: the Gemini API project is on the Free tier with no billing account, so it
  cannot incur charges in its current state.
- Spending cap: none is configured. The rubric's capped-key requirement is not met;
  see [SELF_ASSESSMENT_REPORT.md](../../../SELF_ASSESSMENT_REPORT.md).

## Earlier audit — 2026-11-21 (superseded)

Command: `python -X utf8 scripts/audit-secrets.py` from the repository root.

| Item                                                         | Observed result                            |
| ------------------------------------------------------------ | ------------------------------------------ |
| HEAD                                                         | `1a413e658c6bca13571d82a13d69f7587082f644` |
| Locally reachable commits, all refs plus HEAD                | 18                                         |
| Unique history blobs inspected                               | 96                                         |
| Existing tracked and non-ignored working files inspected     | 41                                         |
| Credential-pattern findings                                  | 0                                          |
| Historical `.env` / `.env.*` paths other than `.env.example` | 0                                          |
| `.env` ignored by Git                                        | Yes                                        |
| Current env-example variable names                           | `PORT`, `CURSOR_SECRET`, both empty        |
| Explicit synthetic test-secret assignments                   | Allowlisted; not real credentials          |
| PDF extraction or archive inspection reported incomplete     | No                                         |

The rerun used branch `pa2-permissions-places` directly in the repository on drive D. The implementation,
policy, audit script and prior evidence are present in HEAD; the evidence updates are
tracked working-tree changes. All current local refs, including local Codex turn-diff
refs, are in scope. No remote refs were fetched.

The script inspects raw bytes and extracts PDF text and selected textual ZIP
members. Rules cover private-key headers, AWS access-key IDs, GitHub tokens,
common model/Google API-key formats, Slack tokens, JWT-like strings,
credential-bearing URLs and literal secret assignments. Matching values are
never emitted. No gitleaks or trufflehog installation was available, so this is
a documented repository-specific heuristic audit, not a scan attributed to those tools.

Limitations: no remote refs were fetched; only refs already available locally and
HEAD were inspected. Reflog/unreachable objects, ignored local env files, OCR of
images/scanned PDFs, unknown secret formats and provider-side key status are not
covered. Zero matches means no detected credentials within this scope, not proof
that every possible secret is absent. Rerun after commits/fetches before submission.

No credential exposure was detected by these checks, so no rotation is claimed.
The team selected Google Gemini API Free tier; no paid billing account or
configured spending cap exists. This is not a paid-spend-control finding, because
the current tool has no paid usage to bill.
