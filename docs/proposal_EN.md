# Proposal and Planning - PA#1

**Project name:** Travel Planning Assistant<br>
**Members:** Nguyễn Tiến Luật - 23127221; Đặng Nghi Văn - 23127281; Phạm Chí Bảo Ninh - 23127446 <br>
**Repository link:** <https://github.com/Tienluat123/WebNC>

## 1. Target user group and problem statement

**Target user:** Students that are responsible for planning for a trip of a group within 1 or multiple days.

**Scenario:** Person X planned a 2-day-1-night trip to Đà Lạt for a group of 4, with a budget of 1.500.000đ for each person. Every member send a name, images, reviews,... of some particular location that they like and their preferences. Person X now has to take all of that information, look at the map and see when the shop opens and how much money is expected to be spent at each shop. Additionally any changes or new additions forces Person X to reconsider and replan a large part of the trip.

**Main problem**: When planning a long trip, the person managing the trip has to combine and hold a lot of information and make it into a plausible plan, including the route, the time, and the budget. If there is any changes it mostly has to be done again.

## 2. LLM features and the consequences of it making a mistake.

**Core functionality - Create and adjust the plan from random information**: From the time to budget to where to stay, all gathered from the user through multiple different input type like images, links, or videos, the LLM can give the user a detailed schedule. The map API can provide the address, availability, route time; Business rules will calculate the time of arrival/departure as well as the total cost and check for constraints relating to budgeting and such. If the schedule is invalid, the system will request the LLM to adjust. If any information is vague, the user must confirm it themselves to make sure.

Private information are not sent to the LLM

**If it make a mistake:** The plan could go overbudget, or cause people to meet up at the wrong time or miss their window. Causing the group to spend more money, or discarding some activity due to time or even cancel the entire trip.

**Example of mistake:** User has given images of a menu from 8 months ago with an expected price of 100.000đ per person. If the LLM use this exact price as if it were the current price, the schedule could think that the budget won't be a problem when in fact the real price has been raised to 140.00đ per person.

| Question                      | Answer                                                                                                                                         |
| ----------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| Who faces the consequences?   | The whole group need to spend more money than expected and Person X need to reconsider the rest of the plan.                                         |
| What is the cost?             | Overbudget by 160.000đ : `(140.000 - 100.000) x 4`.                                                                                            |
| Can this be fixed?            | They could adjust or choose another location if they have yet to leave. If the money has already been spent then it is harder or not possible. |
| How to spot and prevent this? | Prices that lack a source, a date, among other things, will be marked Unverified. User must then confirm themselves                            |

**Assessment in PA#4:** The evaluation set has 20 cases with approval; No schedules could be confirm if it violate the budget or contains unverified prices.

## 3. Scope

**Within this semester:**

- 1 person manage and adjust a multi-day plan for a city in Viet Nam
- LLM can extract locations from text, images, or online links and create the schedule.
- Map API can identify the location, opening hours, routes, and time to travel.
- Business rules calculate the prices and budgets, arrival/departure time, check constraints. The screen must show the map route according to the date of the schedule.

**Outside of scope**:

- Book tickets, rooms,...
- Calculate prices for external modes of transport like planes, minibuses,...
- Real time use for many people within 1 schedule.
- Public uploading of schedules.
- Login verification
- Real time traffic/weather updates/optimization.

<div class="page-break"></div>

## 4. Schedule and Roles

6 checkpoints covering 5PA as listed; owners take responsibility for their section, the rest of the members assist and review.

| Checkpoint                           | Target Date  | Key Deliverables                                                                                               | Owner             |
| ------------------------------------ | ------------ | -------------------------------------------------------------------------------------------------------------- | ----------------- |
| **CP1 - Proposal & Planning**        | W3 (Oct 23)  | Confirm the target user group, LLM features, consequences of failure, scope, risks, tools and ownership (PA#1) | Đặng Nghi Văn     |
| **CP2 - System Design**              | W5 (Nov 6)   | Data schema, API contracts, mock itinerary and proof of concept Map API                                        | Phạm Chí Bảo Ninh |
| **CP3 - Harness & Core Web**         | W7 (Nov 20)  | Conventions, lint, type checks, automated tests, CI quality gates and integrate Frontend/Backend (PA#2).       | Phạm Chí Bảo Ninh |
| **CP4 - Itinerary MVP**              | W8 (Nov 27)  | Create/adjust schedule with mock data, check constraints and deploy an MVP without LLM.                        | Nguyễn Tiến Luật  |
| **CP5 - LLM Integration**            | W9 (Dec 4)   | Extract location and create/adjust schedule using LLM, has schema validation and human confirmation (PA#3).    | Nguyễn Tiến Luật  |
| **CP6 - Evaluation & Final Release** | W11 (Dec 18) | Evals, guardrails, red-team (PA#4), observability, final deployment and post-mortem (PA#5).                    | Đặng Nghi Văn     |

## 5. Two biggest risks.

**Risk 1 - Schedule is unreliable:** If the LLM regularly create schedules that exceeds budgets or time windows, the core functionality loses its value. **Risk management:** Business rules verify independently and return any violations for the LLM to adjust; User needs to confirm prices when uncertain. **Immediate tasks:** Create 20 evaluation cases following section 2 and measure the baseline.

**Risk 2: - Wrong location attachments:** Identical location name can cause the system to pick the wrong branch, causing the route and timing to all be wrong. **Risk management:** Limit search space to within a city, save the location ID and request the user to verify when there are multiple similar results. **Immediate tasks:** Create test cases with clear locations, identical names but different cities/provinces, different branches, and missing address.

## 6. Tool choice and cost

| Tool                    | Reason for choosing                                                                                                |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------ |
| React + JavaScript      | Enable sync between map states, the list locations, and the date on the schedule.                                  |
| Node.js + Express + Zod | Contains API keys in the backend, route LLM/API and verify schema JSON before processing                           |
| Google Maps Platform    | Provide the API that will give all the necessary information like location, working hours,... and display the map  |
| Gemini 3.5 Flash-Lite   | Accept multi-input, allow structured outputs and has a low token cost for certain tasks.                           |


**Expected price for 1000 creation of schedules: 3,10 USD.** Gemini uses on average 2.000 input tokens and 1.000 output tokens per turn; Following the paid tiers, 2 million input tokens cost ~0.60 USD and 1 million output tokens cost 2.50 USD. Google Maps Platform is expcted to cost **Nothing** because the quota set by the system does not exceed the limit. Cost of servers are not yet calculated.

**Sources for the prices, verified on 20/10/2026:** [Gemini](https://ai.google.dev/gemini-api/docs/pricing); [Google Maps Platform](https://developers.google.com/maps/billing-and-pricing/pricing).
