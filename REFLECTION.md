# Reflection

## 1. The hardest bug you hit this week, and how you debugged it

The hardest bug was not a single crash; it was discovering that the frontend audit flow looked complete but was still mostly disconnected from the backend audit engine. At first, the dashboard displayed realistic dummy data, so the product felt convincing visually. But when I traced the flow from the multi-step form to the results page, I realized the user input was saved in localStorage and then the app navigated to a static report. My hypothesis was that the backend API existed but was not being called by the frontend. I searched for `fetch`, API clients, and `/api/audit` references in the frontend and confirmed there was no real integration. I fixed it by creating a small frontend API client, adding an adapter that converts form data into the backend audit payload, storing the returned audit result, and adapting the API response into the existing dashboard UI. The important lesson was that a polished interface can hide missing product behavior. I now trust end-to-end flow checks more than visual inspection alone.

## 2. A decision you reversed mid-week, and what made you reverse it

I originally treated Spendlens like a polished frontend dashboard project and focused heavily on landing page sections, cards, charts, and dashboard polish. Mid-week, I reversed that decision because the assignment is not just a UI test. It asks for a product Credex could plausibly launch, which means the audit logic, pricing data, lead storage, and shareable report flow matter more than adding another visual section. I shifted from "make the dashboard look impressive" to "make the audit feel trustworthy." That changed how I approached the backend: pricing moved into a centralized catalog, recommendations became deterministic, and AI was limited to summaries instead of core calculations. This reversal made the product stronger because it forced every recommendation to have a financial reason: excess seats, plan mismatch, invoice spend above list pricing, API spend above benchmark, or overlapping tooling.

## 3. What you would build in week 2 if you had it

In week 2, I would build real benchmarking and report distribution. The current audit engine has useful deterministic rules, but it would become much more valuable if it could compare a team's spend per developer against anonymized historical audits by company stage, team size, and use case. I would also improve shareable reports with server-rendered Open Graph images so the audit looks good when posted on X, LinkedIn, or Slack. After that, I would add a lightweight admin view for Credex to see high-intent leads, total potential savings, company role, and whether the user requested a consultation. I would not add full authentication immediately unless teams needed saved workspaces. The priority would be improving the viral loop: audit completed, value shown, report shared, new founder clicks, more audits completed.

## 4. How you used AI tools

I used AI tools as a senior pair programmer, not as a one-shot generator. AI helped scaffold code, draft documentation, identify missing assignment requirements, and review product logic. I did not trust AI with pricing accuracy, secrets, or final business claims without checking. One specific place AI was wrong was assuming the project already met the assignment once the UI looked complete. After reviewing the PDF requirements, I caught missing root-level files, CI, user interview notes, and real backend storage requirements. Another issue was that AI-generated pricing and plan labels can drift, so I verified official pricing pages and documented sources in `PRICING_DATA.md`. The most useful AI workflow was asking for structure and then manually checking whether the code actually worked end to end.

## 5. Self-rating

Discipline: 8/10. I worked across frontend, backend, docs, tests, and deployment steps instead of stopping at the visual prototype.

Code quality: 7/10. The backend is modular and tested, but the frontend is JavaScript rather than TypeScript and could use more component-level tests.

Design sense: 8/10. The product has a polished dark SaaS feel, responsive layouts, charts, cards, and clear Credex CTAs.

Problem-solving: 8/10. I identified that the core flow needed real backend integration and fixed the audit path instead of only polishing the UI.

Entrepreneurial thinking: 7/10. The product is tied to a real lead-generation motion for Credex, but the strongest next step is still getting more real user interview evidence.
