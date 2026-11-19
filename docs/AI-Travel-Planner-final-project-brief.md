# **AI Travel Planner — the class project** 

**CSC13114 · class** **`2609-AWAD-23KTPM1` · from** **`PA#2` to** **`PA#6` , every team builds this product** AI Travel Planner was proposed in `PA#1` by **Lê Nhựt Duy (23127178), Nguyễn Thành Dâng (23127334) and Trương Thành Đạt (23127344)** , and it won the final project topic poll. They are the class's **product owners** (section 8), and each of them earns **0.5 bonus points on the final project** . 

Your own `PA#1` proposal keeps its mark. Nobody redoes `PA#1` . Every team keeps its members and, from `PA#2` on, builds AI Travel Planner in its own repository. 

## **1. Why one product for the whole class** 

- **Your evals become comparable.** Every team's agent is scored on the same held-out requests, which the lecturer keeps (section 6). "No plan over budget" becomes a number we can compare, not a claim. 

- **Red-teaming has a target.** In `PA#4` you attack another team's deployment of the same product. You know exactly what it is supposed to refuse. 

- **You compete on engineering, not on the idea.** What gets marked is how the harness, the gates, the eval and the operations hold up, and whether you can explain them in the oral. 

## **2. The user and the problem** 

**The user** is Linh, 20, a student from Cần Thơ. She is coming to Ho Chi Minh City for a weekend with three friends. They have about 1,000,000 VND each, not counting a place to stay, and they get around by Grab and motorbike. 

**The problem:** the group spends a whole evening putting a schedule together from TikTok videos and pins on Google Maps. They still arrive at places that are closed, ride back and forth across districts, overspend, or get caught by the afternoon rain at an outdoor stop. Today one person types the schedule into Notes and sends it on Zalo. Nobody checks opening hours, distances, the total cost or the forecast, and a change of mind means sending the whole list again. 

Asking ChatGPT does not solve it. It does not know the current hours and prices of small places in the city, it cannot add up a budget for a group whose members spend different amounts, and nothing stops it when it invents a place. 

## **3. The LLM feature and the cost of being wrong** 

**An agent that builds a day-by-day schedule and spending plan.** The user enters the dates, the hours, the starting point and the budget: either individual (one amount) or group (a group total, where each member may set a personal spending cap). 

**The model does not read the database and does not calculate money.** It works only through seven JSON tools that the backend provides: 

|**Tool**|**What it gives the model**|
|---|---|
|`get_profile`|interests, places already visited|
|`search_places`|the checked places, filtered by type, district, opening hours and price<br>level|
|`get_menu`|3–8 items or tickets with prices|
|`get_travel_time`|a precomputed motorbike travel-time matrix|
|`get_weather`|hourly rain, public holidays|
|`compute_cost`|plain code, no model|
|`validate_plan`|plain code, no model|



#### **The flow has two points where the user confirms:** 

1. Collect candidates with the first three tools. 

2. The model scores each candidate 0–10 against each member's interests, with one sentence of reasoning based only on real data. 

3. It proposes 8–12 places and a frame for the day by time of day. **The user removes or pins places, then confirms.** 

4. It builds the schedule as JSON: places, times, chosen items. 

5. It calls `compute_cost` and `validate_plan` . On a violation it repairs itself, at most 2 rounds. The whole flow is limited to 12 tool calls and 90 seconds; past that it returns the best draft with a red warning. 

6. **The user reviews the schedule and the spending, may edit by hand, and presses Save.** Only then is the schedule shared with the group. 

**The validator always runs one last time in the backend.** It checks that: 

every place and item exists; 

every stop is within opening hours; 

- the motorbike time fits the gap between two stops; 

- each person's spending stays within their own amount or the lowest cap in the group, and the total stays within the group total; 

- no outdoor stop is scheduled when the chance of rain is above 60% (within the 7-day forecast). 

**Manual mode** (choose places yourself, drag and drop, choose items) uses the same data and the same validator, so that we can measure how much the agent saves over doing it by hand. 

**Why being wrong is expensive.** The schedule belongs to everyone: one person creates it and the whole group trusts it, so one mistake reaches all four people. 

|**The agent's mistake**|**Who pays**|**How much**|**Can it be**<br>**undone?**|
|---|---|---|---|
|A closed place, two<br>places too far apart,<br>or an outdoor stop on<br>a rainy afternoon|All 4|About 40 minutes and<br>80,000–120,000 VND of<br>wasted Grab; 1 of about 5<br>stops lost; later stops run<br>late|No. Only the rest of<br>the schedule can<br>be fixed|
|A plan over the group<br>total or over one<br>member's cap|The member<br>with the least<br>money|100,000 VND over per<br>person leaves the group<br>400,000 short; that member<br>drops out of an activity or<br>feels the pressure|Yes, if caught<br>before the trip|
|A wrong fit: places<br>nobody likes, or that<br>suit one person only|All, especially<br>the one<br>ignored|Time spent choosing again; if<br>nobody notices, a whole dull<br>day|Yes. Step 3 lets the<br>user remove or pin<br>places|
|An old menu price, so<br>the plan comes in low|All|Real spending above the<br>plan, over budget in the<br>middle of the trip|Not on the day. Fix<br>the data when<br>someone reports a<br>wrong price|



#### **The bar:** 

|**Metric**|**Target**|
|---|---|
|Plans over a cap or the group total, after the validator|**0**|
|Tool calls with the correct structure|**≥ 80%**|
|Time for one plan, p90|**< 60 seconds**|
|Time to a saved schedule with no violations, against doing it by hand|**at most half**|



### **Fixed for every team** 

- The model reaches data only through the tools. Money is calculated by code only. 

- Model output is validated against a schema before the validator sees it. 

- The validator runs in the backend, and the two confirmations stay. Nothing reaches the group before Save. 

- The limits above stay in place: 2 repair rounds, 12 tool calls, 90 seconds. 

- Keys stay in the backend and never reach the browser. Only places and interests go to a model, never names or email addresses. 

## **4. Scope** 

### **In: the starting scope** 

The product owners may narrow or clarify it (section 8). 

1. **Places:** checked data with search by type, district, open now and price level; a detail page with description, photos, map and menu. 

2. **Accounts:** sign-in and a profile of interests. 

3. **Your places:** a want-to-go list, visited places through check-in, a map of where you have been, and 1–5 star reviews only after a check-in. 

4. **Groups:** invite by link, a group total, and a spending cap per member. 

5. **Weather and public holidays** as input to the agent. 

6. **Schedule and spending** for one person or a group, in both modes of section 3. 

7. **Editing a schedule together** without overwriting each other. 

8. **Report a problem** on any stop (closed, wrong price, too far, not a good fit), and a log of each run: tools called, repair rounds, violations blocked. 

9. **Posts:** moment posts; promotional posts from business accounts, approved by an admin; likes and comments. 

10. **Finding travel companions** with an AI match score: only people who opted in, with block and report. 

The authors' own order for cutting when time runs short: promotional posts first, then the AI companion score, then editing together. 

### **Out: deliberately not built** 

- Booking tickets or rooms, payments, splitting bills. Spending is only an estimate. Charging for ads. Promotional posts never influence the agent's schedule. 

- Private messages, chat and real-time location; a personalised feed. 

- Places outside Ho Chi Minh City; a native mobile app. 

- A free-form chatbot. 

- Calling a places API while building a schedule. A schedule uses only the checked places. Google Places photos and reviews; turn-by-turn directions; estimates of Grab or fuel costs. 

## **5. What is your team's choice** 

- **Layout, content and colours.** Your team decides how the product looks and reads, as long as it delivers the features in sections 3 and 4. 

- **Stack and architecture.** Any language, any framework. The original proposal used Next.js, Express, Firebase and Cloudinary. You do not have to follow it. Be ready to defend what you pick in the oral. 

- **Model provider and model.** The original used a small open-weight model on a team member's machine, with a cloud model as a fallback. Free tiers are fine. Set a spending cap, and state in `AI-LOG.md` and your README which model you use and what one plan costs. 

- **How much the model decides.** If a small model calls tools badly, the authors' fallback is legitimate: code calls the tools in a fixed order, the model only scores places and proposes the frame of the day, and a greedy algorithm places the times. The confirmations and the validator stay. 

## **6. The data and the eval** 

- **Shared place data.** Hours and prices that nobody checked make the validator meaningless, and there would be nothing to mark against. Checking 150 places by hand is not worth doing once per team, so the whole class uses one set: **the product owners publish it by Friday, November 27** : 150 places with opening hours by weekday, ticket price, indoors or outdoors, source and date checked; 3–8 menu items per place with prices; and the motorbike travel-time matrix. A place missing its hours or its menu cannot be a candidate. Credit OpenStreetMap, Wikimedia and Open-Meteo in your product. 

- **Dev set.** Sample requests with known constraints, plus a scorer that applies the bar in section 

- The lecturer publishes it before session 9 (Friday, December 4). Add your own cases on top of it. 

- **Held-out set.** Different requests in the same format, kept by the lecturer. Your `PA#4` agent is run on it. Make your agent able to run from the command line on a file of requests. The exact format comes with the dev set. 

## **7. Checkpoints, for AI Travel Planner** 

The rubric for each checkpoint is attached to its own assignment when the assignment opens. 

|**Checkpoint**|**Due, 22:00**|**What it means for AI Travel Planner**|
|---|---|---|
|`PA#2`harness<br>and quality gate|Thu Nov 26|Convention file, lint, tests, and CI that really blocks a<br>merge. Plus the**contract of one endpoint**<br>(<br>`docs/contract/<endpoint>.md`) and contract tests that<br>run in CI.|
|`PA#3`prototype<br>with the LLM<br>feature running|Thu Dec 10|Search over the shared data, a group with caps, and<br>the agent running for real through the tools. Both<br>confirmations and the validator work, and nothing is<br>shared before Save.|
|`PA#4`eval,<br>guardrail, human<br>gate, red-team|Thu Dec 17|The eval on the dev set gates CI. The fixed rules of<br>section 3 hold under attack. You also write a red-team<br>report on another team's deployment; the lecturer<br>assigns the pairs.|
|`PA#5`final build,<br>running and<br>observed|Thu Dec 24|The rest of the scope, logs/metrics/traces, a public<br>deployment, one incident post-mortem, and the<br>comparison with manual mode on 10 requests.|
|`SEMINAR`|Sun Nov 29<br>(study) · Dec 4,<br>Dec 11, Dec 18<br>(live)|Not part of AI Travel Planner: a measured study of a<br>topic your team chooses, and a recorded talk. The<br>teams chosen by a class vote present live in the<br>lecture. See the SEMINAR assignment.|
|`PA#6`individual<br>oral|announced on<br>Classroom|On**your team's**code and decisions.|



## **8. Product owners** 

The authoring team takes the lead on the product. They decide **how AI Travel Planner behaves and what is in scope** wherever this brief is silent or leaves room. For example: which parts of the scope can wait, or what a member sees when the plan goes over their cap. 

- **Ask** under the post AI Travel Planner — questions for the product owners, which they open in the course Facebook group, starting with `#AWAD23KTPM1` . Do not ask in private messages: one team's answer is everyone's answer. 

- **Answers** come within two working days, under that post. A scope decision posted there applies to every team. Cite it in your repository when you rely on it. 

- **What the product owners do not decide:** marks, deadlines, rubrics, the bar and the fixed rules in section 3. Those belong to the lecturer. If an answer and this brief disagree, this brief wins until the lecturer changes it. 

- The product owners build AI Travel Planner like every other team and are marked the same way. 

