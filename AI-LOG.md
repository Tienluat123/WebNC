# AI-LOG.md — CSC13114 — PA#1

## 2026-10-19 — Drafting the proposal
Tool: Codex.
Asked for: Help draft a proposal based on the team's idea for a group travel itinerary app.
Kept: The six-section structure and the description of users combining scattered information into an itinerary.
Changed: Asked AI to keep React + JavaScript, update team details and adjust task assignments based on the team's choices.
Rejected: Limits on location, number of days and number of stops that AI added before the team agreed on the scope.
By hand: The team provided the idea, names and student IDs, and chose the project direction; AI helped turn these into a draft.

## 2026-10-20 — Clarifying the LLM feature and narrowing the scope
Tool: Codex.
Asked for: Review and revise the LLM feature using the instructor's feedback, focusing on creating and editing itineraries.
Kept: The LLM extracts information from text, images or public links to suggest itineraries; the map API provides place data and travel times.
Changed: Asked AI to clarify the trip coordinator's role, inputs, time and budget checks, and user confirmation when information is uncertain.
Rejected: An overly broad description, assigning route calculation to the LLM, and including community itinerary sharing in the semester scope.
By hand: The team supplied the instructor's feedback, selected the user flow and decided which features to include or postpone.

## 2026-10-20 — Cost of wrong answers and error detection
Tool: Codex.
Asked for: Suggest concrete failure scenarios explaining who is affected, how much harm occurs, whether it can be undone and how to prevent it.
Kept: Checking the source, date and unit of prices; marking unverified information and requiring user confirmation before finalizing the itinerary.
Changed: The team suggested an outdated menu showing VND 100,000 per person when the current price is VND 140,000; AI reworded the example and calculated the extra VND 160,000 for four people.
Rejected: Cost figures without a clear calculation, too many scattered scenarios and vague responses that only said to check again.
By hand: The team proposed the price increase example, asked to distinguish AI errors from changes in the real world, and selected the example to keep in the proposal.

## 2026-10-20 — Reviewing the rubric, plan and self-assessment
Tool: Codex.
Asked for: Review the proposal against the rubric, suggest improvements to the plan and technology choices, help with self-assessment and shorten the text.
Kept: The score table with evidence, the presentation of risks and the proposed evaluation suite of at least 20 cases with reference answers.
Changed: Asked AI to revise the six checkpoints, task assignments and cost presentation to reflect the team's plan, and shorten the LLM section while keeping the example and error detection approach.
Rejected: Repetitive, lengthy passages and excessive jargon that made the text hard to understand.
By hand: The team finalized task assignments, revised and approved the final version, decided the claimed scores and took responsibility for the submission.

**Status:** No user survey, application implementation, map API trial or evaluation run has been completed. The harm example is hypothetical, costs are estimates and the 20 evaluation cases are planned for PA#4.

**Data sent to the product's LLM:** We plan to send trip details, places, preferences and the text, images or link content needed to extract information and suggest an itinerary. Only data needed for the task will be sent; API keys, personal data and secrets will be excluded. This is a design principle, not an implemented mechanism.
