# Spendlens Backend Architecture

Spendlens is a modular monolith designed for a YC-style SaaS MVP. It avoids microservices but keeps clear service boundaries so the product can scale without a rewrite.

## System Diagram

```mermaid
flowchart LR
  "Frontend App" --> "Express API"
  "Express API" --> "Zod Validators"
  "Zod Validators" --> "Controllers"
  "Controllers" --> "Audit Engine"
  "Controllers" --> "Summary Service"
  "Controllers" --> "Lead Service"
  "Controllers" --> "Report Service"
  "Summary Service" --> "Gemini API"
  "Summary Service" --> "Anthropic API"
  "Summary Service" --> "Template Fallback"
  "Lead Service" --> "Supabase PostgreSQL"
  "Lead Service" --> "Resend"
  "Report Service" --> "Supabase PostgreSQL"
  "Audit Engine" --> "Pricing Data"
```

## Request Flow

1. A request enters Express.
2. Rate limiting applies to sensitive endpoints.
3. Zod validates and normalizes the request body.
4. Controllers call focused services.
5. Services return typed domain objects.
6. Errors flow through centralized error middleware.

## Service Architecture

- `auditEngine.ts`: Calculates savings, plan recommendations, optimization scores, and Credex credit opportunity flags.
- `summaryService.ts`: Calls Gemini first for a short audit narrative, falls back to Claude when configured, then falls back to a deterministic template.
- `leadService.ts`: Handles duplicate prevention and stores leads in Supabase.
- `reportService.ts`: Creates public report URLs and strips sensitive lead/company fields.
- `pricingData.ts`: Keeps public pricing benchmarks centralized and reviewable.

## Recommendation Design

The audit engine is deterministic on purpose. Pricing and savings recommendations are finance logic, not creative writing, so they should be explainable, testable, and repeatable for the same input. A founder or CTO should be able to ask why Spendlens recommended a downgrade and see the exact rule: excess seats, plan mismatch, invoice spend above list pricing, API spend above benchmark, or overlapping vendors.

Pricing data is centralized in `pricingData.ts` so every controller, test, and report uses the same source. That keeps vendor pricing changes reviewable in one file and prevents hidden numbers from drifting across UI components or service logic.

Hardcoded rules are better than AI for pricing decisions because model output can vary and may invent savings. The backend uses deterministic rules for calculations, then uses AI only in `summaryService.ts` to explain the already-computed result in plain language. If the AI provider fails or quota is exhausted, the template fallback still returns an honest product experience.

The frontend persists audit onboarding state in localStorage because this form has multiple steps and real users may leave mid-flow, refresh, or compare invoices while filling it out. Persistence protects conversion and makes the audit feel reliable instead of fragile.

## Scaling Discussion

For the MVP, a modular monolith is the right tradeoff. The audit engine is CPU-light, the database workload is small, and the product benefits from fast iteration.

Natural scale points:

- Move report generation to a background job if reports become heavy.
- Add Redis-backed rate limiting if traffic grows across multiple instances.
- Add authentication and row-level permissions once team workspaces are introduced.
- Version pricing data and audit rules as the recommendation engine matures.
- Store audit input/output snapshots for historical benchmarking.

## Security Notes

- No secrets are hardcoded.
- Supabase uses a server-side service role key only in the backend.
- Public reports store anonymized spend data only.
- Lead endpoints have rate limiting and duplicate prevention.
