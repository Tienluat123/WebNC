# Local secrets audit - 2026-11-21

Command: `python -X utf8 scripts/audit-secrets.py` from the repository root.

| Item | Observed result |
| --- | --- |
| HEAD | `b50355d883edac6c2e8bb46b59433b7208a88ba5` |
| Locally reachable commits, all refs plus HEAD | 17 |
| Unique history blobs inspected | 65 |
| Existing tracked and non-ignored working files inspected | 40 |
| Credential-pattern findings | 0 |
| Historical `.env` / `.env.*` paths other than `.env.example` | 0 |
| `.env` ignored by Git | Yes |
| Current env-example variable names | `PORT`, `CURSOR_SECRET`, both empty |
| Explicit synthetic test-secret assignments | Allowlisted; not real credentials |
| PDF extraction or archive inspection reported incomplete | No |

The working-tree count includes the uncommitted implementation, policy, audit
script, P1 review and evidence files. The rerun used the writable P1 copy with
the source checkout's local refs and working files preserved; no remote refs
were fetched. The HEAD and history counts refer to the existing
Git history; they do not claim these new files have already been committed.

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
