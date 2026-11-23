# PA2 — Harness and quality gate

Repository: <https://github.com/Tienluat123/WebNC_Proposal>

Status (2026-11-21): P1 permissions and GET /places contract/implementation are
present. The team has selected Google Gemini API and `gemini-3.5-flash-lite`;
the Free-tier project has no linked billing account, enforcing a USD 0 paid-spend
boundary. Redacted account evidence is included.
Checks/required CI, protected-branch evidence and final self-assessment are not
complete. [File map](docs/pa2/README.md).

## P1 evidence - criteria 2 and 5

| Item | Evidence |
| --- | --- |
| Permission tiers and secret policy | [PERMISSIONS.md](docs/pa2/PERMISSIONS.md) |
| Environment variable names | [.env.example](.env.example) |
| Local history/working-file audit | [Audit evidence](docs/pa2/evidence/secrets-audit.md) |
| Adopted endpoint contract | [GET /places](docs/contract/endpoint.md) |
| Endpoint implementation and setup | [Backend README](backend/README.md) |
| Rubric review, verification and handoff | [P1 review](docs/pa2/evidence/p1-review.md) |
| Model spending control and cost benchmark | [README](README.md), [redacted account evidence](docs/pa2/evidence/gemini-free-tier-no-billing-2026-11-21.png), [cost evidence](docs/pa2/evidence/model-cost-benchmark.md): Free tier, no billing account, USD 0 paid-spend boundary; one synthetic itinerary measured |

These file links are local work evidence, not PR/CI or full-score claims.

## Required links

| Lecturer's requirement | Evidence |
| --- | --- |
| Public repository | TODO: verify public access |
| Protected-branch settings (screenshot accepted) | TODO |
| PR blocked by a red required check | TODO |
| PR / commit that turned the check green | TODO |
| CI run for submitted pa2 tag | TODO |
| Deliberate contract break caught by CI | TODO |

## Submission checklist

- TODO: tag the submitted commit pa2 and push the tag.
- Finalize PA2.md, AI-LOG.md and SELF_ASSESSMENT_REPORT.md in English; the current score and remote evidence are incomplete.
- TODO: include the repository and .git in one ZIP.
- TODO: name it `23127221-23127281-23127446_<total>.zip`; total must match the self-assessment.
- TODO: one member submits using their student Google account.

Lecturer's note: history rebased or rebuilt after work is finished does not count as evidence for criteria 4 and 6.
