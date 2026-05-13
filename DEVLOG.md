## Day 1 — 2026-05-07
**Hours worked:** 4.5
**What I did:** I read the Credex assignment carefully and broke the requirements into product, engineering, and documentation workstreams. The biggest clarification was that Spendlens should not be a personal finance app; it needs to be a B2B SaaS AI spend audit platform that could plausibly generate leads for Credex. I started the frontend foundation with React, Vite, Tailwind, reusable UI components, routing, a dark SaaS visual system, and the first version of the landing page.
**What I learned:** This assignment is testing whether I can ship a useful product, not just build screens. The core product loop has to be clear: visitor enters AI spend, gets value, then optionally becomes a Credex lead.
**Blockers / what I'm stuck on:** The main challenge was scoping. There are many possible dashboard features, but the MVP needs to focus on the audit flow first.
**Plan for tomorrow:** Complete the landing page, build the multi-step audit form, and make the frontend feel like a real startup product.

## Day 2 — 2026-05-08
**Hours worked:** 6.5
**What I did:** I completed the main frontend experience and pushed the frontend work to GitHub. I built the SaaS landing page with a sticky navbar, conversion-focused hero, feature sections, how-it-works section, mocked social proof, pricing, FAQ, and footer. I also created the audit onboarding flow with a multi-step form for AI tools, selected plans, monthly spend, seat count, usage type, team size, budget, and pain points. I added localStorage persistence so the form survives reloads, plus responsive layouts, hover states, and animations.
**What I learned:** Good onboarding needs to feel structured without feeling heavy. The form has to collect enough information for useful recommendations while still feeling fast enough for a founder or engineering manager to complete.
**Blockers / what I'm stuck on:** The audit results were still backed by demo data, so the next major task was building a real backend audit engine.
**Plan for tomorrow:** Start the backend, study Supabase requirements, and map the assignment features to backend routes and services.

## Day 3 — 2026-05-09
**Hours worked:** 5.5
**What I did:** I started the backend architecture using Node.js, Express, and TypeScript. I studied the Supabase setup flow, service-role keys, SQL tables, and how lead/report storage should work without exposing secrets to the frontend. I also reread the assignment and mapped the backend requirements: pricing data, audit engine, AI summary, lead capture, shareable reports, validation, rate limiting, and tests.
**What I learned:** Supabase should be treated as backend infrastructure, not frontend configuration. The service role key belongs only on the server, and the frontend should talk to my Express API instead of writing directly to the database.
**Blockers / what I'm stuck on:** The hardest design question was making the audit engine believable. Simple percentage discounts are not enough; the reasoning has to make sense to a finance-minded reviewer.
**Plan for tomorrow:** Complete the backend services and make the audit engine produce realistic recommendations.

## Day 4 — 2026-05-10
**Hours worked:** 7
**What I did:** I completed the backend MVP. I added the deterministic audit engine, centralized pricing data, Zod validators, controllers, routes, async error handling, rate limiting, Supabase services for leads and reports, Resend email support, and the AI summary service with Gemini primary, Claude fallback, and template fallback. I also added documentation for pricing, prompts, architecture, and API setup.
**What I learned:** AI should not calculate pricing recommendations. It is better for summaries after deterministic rules have already produced the audit result. That makes the product more trustworthy and easier to test.
**Blockers / what I'm stuck on:** Pricing data changes frequently, so every number needs to be documented and traceable to an official vendor URL.
**Plan for tomorrow:** Add tests, connect frontend input to backend output, verify Supabase, and prepare for deployment.

## Day 5 — 2026-05-11
**Hours worked:** 6
**What I did:** I focused on testing and integration. I added backend tests for the audit engine and API validation, connected the frontend audit form to `POST /api/audit`, stored generated audit results in localStorage, and updated the audit dashboard to show live backend output when available. I also verified Supabase lead storage by testing insert, read, and delete behavior, then prepared the project for GitHub, Vercel, and Render deployment.
**What I learned:** A product can look complete but still be disconnected internally. The most important improvement today was making the core user flow actually use the backend audit engine.
**Blockers / what I'm stuck on:** Local tests initially failed when Supabase env vars were present under Node 20 because the Supabase client initialized WebSocket-related code. I fixed test mode so CI does not depend on live Supabase initialization.
**Plan for tomorrow:** Move required documentation to the repo root, add CI, and polish submission files.

## Day 6 — 2026-05-12
**Hours worked:** 5.5
**What I did:** I created the required root-level submission documents: `ARCHITECTURE.md`, `TESTS.md`, `PRICING_DATA.md`, `PROMPTS.md`, `GTM.md`, `ECONOMICS.md`, `LANDING_COPY.md`, `METRICS.md`, and `REFLECTION.md`. I also added a GitHub Actions CI workflow that runs frontend lint/build and backend build/tests. I reviewed the assignment requirements again to make sure the repository structure matches what the evaluator expects.
**What I learned:** The docs are not extra; they are part of the product evaluation. They explain the thinking behind the product, the technical trade-offs, and why the audit logic is credible.
**Blockers / what I'm stuck on:** The user interview file still needs real conversations. I created the structure, but I do not want to fake quotes because the assignment clearly says fabricated interviews are an instant reject.
**Plan for tomorrow:** Deploy the frontend and backend, add final URLs and screenshots, fill in real interview notes, and run final verification.

## Day 7 — 2026-05-13
**Hours worked:** 4
**What I did:** I did the final review pass across frontend, backend, Supabase, tests, and required files. I verified backend tests, backend build, frontend lint, and frontend build. I checked that the root-level assignment files exist and documented the remaining manual submission items: add deployed URLs, add screenshots or a screen recording, confirm CI is green on GitHub, and replace the user interview placeholders with three real conversations.
**What I learned:** Shipping the assignment is a mix of engineering and proof. The code needs to work, but the repo also needs to show a believable product story, consistent work, sound economics, and honest reflection.
**Blockers / what I'm stuck on:** The remaining blockers are manual: deployed URL, screenshots, GitHub CI check, and real user interviews.
**Plan for tomorrow:** Submit only after the public app is reachable, CI is green, screenshots are added, and the user interviews are complete.
