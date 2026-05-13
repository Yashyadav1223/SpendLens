# Spendlens Architecture

Spendlens is a modular full-stack SaaS MVP for auditing AI infrastructure spend. The product is intentionally simple: a visitor enters AI tool spend, the backend calculates deterministic recommendations, the frontend displays a shareable audit, and high-savings users are routed toward Credex.

## System Diagram

```mermaid
flowchart LR
  "Visitor" --> "React/Vite Frontend"
  "React/Vite Frontend" --> "Audit Form"
  "Audit Form" --> "Express API"
  "Express API" --> "Zod Validation"
  "Zod Validation" --> "Audit Engine"
  "Audit Engine" --> "Pricing Data"
  "Audit Engine" --> "Audit Result"
  "Audit Result" --> "Results Dashboard"
  "Results Dashboard" --> "Lead Capture"
  "Lead Capture" --> "Supabase Leads"
  "Results Dashboard" --> "Shareable Report"
  "Shareable Report" --> "Supabase Reports"
  "Audit Result" --> "Summary Service"
  "Summary Service" --> "Gemini API"
  "Summary Service" --> "Claude Fallback"
  "Summary Service" --> "Template Fallback"
  "Lead Capture" --> "Resend Email"
```

## Data Flow

1. A user lands on the marketing page and clicks the audit CTA.
2. The audit form collects selected tools, plans, monthly spend, seat counts, team size, budget, use case, and pain points.
3. Form state persists in localStorage so refreshes do not destroy onboarding progress.
4. The frontend sends normalized input to `POST /api/audit`.
5. Zod validates the payload and returns clean errors for invalid inputs.
6. The audit engine compares user spend against centralized pricing data and deterministic rules.
7. The backend returns monthly savings, annual savings, efficiency score, per-tool breakdown, and recommendations.
8. The frontend adapts the API result into dashboard cards, charts, recommendation cards, and the Credex CTA.
9. After value is shown, the user can submit lead details. The backend stores the lead in Supabase and sends a Resend confirmation email.
10. The report endpoint can store a public audit snapshot without email or company details.

## Stack Choice

React + Vite was chosen for the frontend because it is fast to ship, easy to deploy to Vercel, and flexible enough for a polished dashboard without a heavy framework. Tailwind CSS keeps the design system consistent while still allowing custom SaaS polish. Recharts was used because the assignment needs analytics visualizations, and Framer Motion gives smooth transitions without building animation primitives from scratch.

The backend uses Express + TypeScript because the product needs clear API boundaries, validation, tests, and service-level organization. TypeScript is especially useful on the backend where audit inputs, audit outputs, pricing records, and service responses need stable shapes.

## Why The Audit Engine Is Deterministic

Pricing recommendations are finance logic, not creative text. The audit engine uses hardcoded deterministic rules because a founder should get the same savings number for the same input every time. The current rules evaluate:

- Excess seats compared with team size
- Small teams paying for admin/team plans too early
- Power plans used too broadly
- Reported spend materially above official list pricing
- API spend above benchmark levels
- Overlapping tools such as Cursor and GitHub Copilot
- High spend that may qualify for Credex credits

AI is only used after the calculation to write a short personalized summary. If Gemini or Claude fails, a template fallback keeps the product usable.

## Why Pricing Data Is Centralized

All vendor pricing lives in `backend/src/data/pricingData.ts` and is documented in `PRICING_DATA.md`. This prevents hidden pricing numbers from drifting across components, tests, and services. It also makes future pricing updates reviewable in one place.

## Scaling To 10k Audits/Day

For 10k audits/day, I would keep the modular monolith initially but add operational improvements:

- Move shareable report creation and email sending to a background queue
- Add Redis-backed rate limiting for multi-instance deployments
- Store audit snapshots for analytics and benchmarking
- Add observability around audit completion, lead conversion, and API failures
- Cache pricing data and version audit rules by date
- Add authentication only when team workspaces become necessary

The audit engine is CPU-light, so the first bottlenecks would likely be database writes, email delivery, and AI summary provider limits rather than calculation speed.

## Security And Privacy

- No secrets are committed to the repo
- Supabase service-role key is backend-only
- Public reports strip identifying lead fields
- Rate limiting protects audit, lead, report, and AI endpoints
- The frontend can fall back to demo data if the backend is unavailable, but production lead/report storage requires Supabase
