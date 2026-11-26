# Synthetic itinerary cost benchmark - 2026-11-21

This is a one-call benchmark, not a production average or a claim that
`GET /places` invokes a model. A team member ran a local PowerShell request with
the Free-tier `travel-planner` API key and model `gemini-3.5-flash-lite`. The
prompt requested a complete synthetic one-day Ho Chi Minh City itinerary for two
adults with a 1,500,000 VND budget, meals, three attractions, travel time,
estimated costs, opening-hour checks and warnings. No personal data was used.

Only response metadata was retained:

| Field            |          Observed value |
| ---------------- | ----------------------: |
| Model version    | `gemini-3.5-flash-lite` |
| Service tier     |              `standard` |
| Prompt tokens    |                      84 |
| Candidate tokens |                   1,293 |
| Thinking tokens  |        0 / not reported |
| Total tokens     |                   1,377 |

The total equals prompt plus candidate tokens, so no additional thinking-token
count is inferred for this response. No grounding, caching or paid tools were
reported.

## Cost result

Actual billed cost on the current Free-tier project with no linked billing
account: **USD 0**.

For comparison, the paid-tier equivalent uses the Google price observed on
2026-11-21: USD 0.15 per million input tokens and USD 1.25 per million output
tokens, including thinking tokens. Source: [Gemini API pricing](https://ai.google.dev/gemini-api/docs/pricing).

```text
input  = 84    * 0.15 / 1,000,000 = USD 0.00001260
output = 1,293 * 1.25 / 1,000,000 = USD 0.00161625
total                              = USD 0.00162885
```

This estimate excludes future price changes and any future grounding, caching,
multi-call agent loop or retry behavior. Re-benchmark the implemented itinerary
feature with representative inputs before using this value for production planning.
No API key, response body or account credential is stored in this evidence.
