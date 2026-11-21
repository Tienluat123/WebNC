# Permissions and secrets

Applies to AI-assisted work in this repository. User authorization for a task also
covers its necessary local edits and checks. Do not ask again for a decision the
user has already made. These tiers concern development assistants, not the
Travel Planner agent or the roles allowed to call the API.

## Permission tiers

| Tier | Concrete actions |
| --- | --- |
| Allowed | Read repository code, contracts and supplied course documents; implement and fix the assigned feature locally; add meaningful tests; run documented checks; install already declared dependencies; update the lockfile through npm; audit locally available Git history with redacted results; update README, env variable names and AI-LOG to reflect actual work. |
| Ask first | Change an adopted API contract or access policy; add an unselected database, provider or paid service; make real billable model calls; create accounts or change billing limits; deploy or publish; push, merge, move submission tags or change remote branch protection unless those actions are already explicitly authorized. |
| Never | Commit, print or send real secrets; expose model keys in browser code; send names, email addresses or credentials to the model; use real model calls in unit/contract tests; bypass required checks; edit tests, eval data or validator rules merely to conceal an implementation failure; fabricate incident history, review, audit or CI evidence; force-push or rewrite shared history to manufacture submission evidence. |

## Environment and secret handling

- `.env.example` lists the variables currently read by the server, with empty values:
  `PORT` and `CURSOR_SECRET`. Add new names only when runtime configuration uses them.
- `.gitignore` excludes `.env` and `.env.*`, with an exception for `.env.example`.
  Ignoring files does not remove secrets already committed in older versions.
- `CURSOR_SECRET` is a private random signing value of at least 32 bytes, generated
  locally and loaded only by the backend. Keep it in ignored `.env` locally or a
  deployment secret store. Never include its value in screenshots or evidence.
- Test signing values deliberately start with `synthetic-`; they are not production
  secrets. Real secrets must not be reused as test fixtures.
- If exposure is detected, stop publishing the affected material, notify the owner
  using a redacted location, revoke/rotate the credential, and record the actual
  response in AI-LOG. Do not claim that deleting the latest file fixes history.
- Git-history rewriting requires a separate authorized remediation plan; it cannot
  replace rotation and must not erase the real PA2 red/green evidence.

## Audit

Run `python scripts/audit-secrets.py` from the repository root. The script reads
every unique blob reachable from local refs and HEAD, plus tracked and non-ignored
working files. It checks private-key markers, common provider/token formats,
credential-bearing URLs and literal secret assignments. It also checks historical
env paths, blank env-example values and the ignore rule. Findings show only
locations and rule names, never matched values.

The script uses Python 3 and Git; PyMuPDF is needed to extract embedded text from
the repository's PDFs. Missing PDF support is reported as incomplete, not clean.
The script performs no network requests or file modifications.

See [latest audit evidence](evidence/secrets-audit.md) for the actual scope,
counts, findings and limitations. A heuristic scan cannot guarantee the absence
of all credentials. Rerun after new commits or fetched refs before submission.

## Model and spending control

`GET /places` has no model integration or model API key. Provider, model, spending
cap and measured cost are independent of this endpoint. The team reports Google
Gemini API project `travel-planner`, model `gemini-3.5-flash-lite`, Free tier with
no billing account linked, and successful connectivity testing by a team member.
No key or connectivity output is stored here. With no billing account, the
account-side ceiling for paid usage is USD 0 and is enforced continuously; the
paid-tier configurable spend-cap feature is not applicable on the Free tier.
A single synthetic full-itinerary call was measured at 84 prompt tokens and
1,293 candidate tokens: actual Free-tier cost USD 0 and paid-tier equivalent
USD 0.00162885 at the price recorded on 2026-11-21. See the
[benchmark evidence](evidence/model-cost-benchmark.md); it is not a production average.

Before submission, include redacted evidence of the Free-tier and no-billing state;
never include the API key, email address or project identifier. Do not relabel this
state as use of Google's configurable spend-cap feature. If the account owner later
links billing, first configure an enforced project spend cap and record its amount,
currency, monthly period and enforcement behavior. A budget notification alone
must not be described as a hard cap. Re-measure cost per plan after the production
prompt, tools and agent loop are implemented; label estimates and assumptions explicitly.
