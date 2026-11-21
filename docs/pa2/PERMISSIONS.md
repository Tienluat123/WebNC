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

## Model and spending cap - not yet configured

`GET /places` has no model integration or model API key. Provider, model, spending
cap and measured cost per plan remain unselected/unverified. The spending-cap
requirement is therefore still incomplete; no completed secret-management score
is claimed solely because this endpoint does not call a model.

Before submission, the account owner must choose the provider/model, configure an
enforced spending limit appropriate to that provider, and record the exact amount,
currency, billing period and enforcement behavior in the root README. A budget
notification alone must not be described as a hard cap. Include redacted evidence
with the configuration date; never include the API key. Record cost per plan only
after measuring it, or label an estimate and its assumptions explicitly.
