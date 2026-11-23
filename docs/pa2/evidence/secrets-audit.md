# Local secrets audit - 2026-11-21

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
Model/provider selection and actual spending-cap configuration are still pending.
