# Spendlens Pricing Data

**Pricing verification date:** 2026-05-13

Pricing moves quickly. Spendlens uses official public pricing pages as the source of truth, then stores pragmatic monthly benchmarks in `src/data/pricingData.ts` so the audit engine can run deterministically.

## Cursor

- Free / Hobby: $0/month — https://www.cursor.com/pricing — verified 2026-05-13
- Pro: $20/month — https://www.cursor.com/pricing — verified 2026-05-13
- Business / Teams: $40/user/month — https://www.cursor.com/pricing — verified 2026-05-13
- Enterprise: custom sales pricing — https://www.cursor.com/pricing — verified 2026-05-13

Pricing notes:
- Business is modeled as a team/admin plan because it adds privacy mode, centralized billing, admin analytics, and SSO.
- The backend still recognizes Pro+ and Ultra labels when users enter older or regionally visible plan names.

## ChatGPT

- Business Codex: usage pricing, no fixed seat fee — https://openai.com/business/chatgpt-pricing/ — verified 2026-05-13
- Business ChatGPT & Codex: $25/user/month when billed monthly — https://openai.com/business/chatgpt-pricing/ — verified 2026-05-13
- Enterprise: custom pricing — https://openai.com/business/chatgpt-pricing/ — verified 2026-05-13

Pricing notes:
- The backend treats older "Team" labels as ChatGPT Business so existing demo data and user input continue to work.
- Individual Plus and Pro plans are kept in the catalog because early-stage teams often expense individual subscriptions before buying a workspace.

## Claude

- Pro: $20/month monthly equivalent — https://claude.com/pricing — verified 2026-05-13
- Max: from $100/month — https://claude.com/pricing — verified 2026-05-13
- Team Standard seat: $20/seat/month billed annually, $25 if billed monthly — https://claude.com/pricing — verified 2026-05-13
- Team Premium seat: $100/seat/month billed annually, $125 if billed monthly — https://claude.com/pricing — verified 2026-05-13
- Enterprise: seat price plus API-rated usage; sales-assisted options available — https://claude.com/pricing — verified 2026-05-13

Pricing notes:
- Team is only a good recommendation when collaboration, admin controls, and shared knowledge features matter.
- Max should be reserved for heavy context, Claude Code, or research-heavy users, not every employee.

## GitHub Copilot

- Free: $0/month — https://github.com/features/copilot/plans — verified 2026-05-13
- Pro: $10/user/month — https://github.com/features/copilot/plans — verified 2026-05-13
- Pro+: $39/user/month — https://github.com/features/copilot/plans — verified 2026-05-13
- Business: $19/user/month — https://docs.github.com/copilot/concepts/billing/billing-for-enterprises — verified 2026-05-13
- Enterprise: $39/user/month — https://docs.github.com/copilot/concepts/billing/billing-for-enterprises — verified 2026-05-13

Pricing notes:
- Copilot Business is usually the baseline for companies that need org-level seat assignment and policy controls.
- Copilot Enterprise should be reserved for teams that need GitHub Enterprise Cloud-level customization and knowledge features.

## Gemini

- Free: $0/month — https://gemini.google/subscriptions — verified 2026-05-13
- Google AI Pro: $19.99/month — https://gemini.google/subscriptions — verified 2026-05-13
- Google AI Ultra: $249.99/month — https://gemini.google/subscriptions — verified 2026-05-13
- Gemini API: token-based pricing — https://ai.google.dev/gemini-api/docs/pricing — verified 2026-05-13

Pricing notes:
- Google AI Pro is modeled as the normal paid subscription for individual productivity workflows.
- Google AI Ultra should be treated as a power-user plan because it is materially more expensive than Pro.

## OpenAI API

- GPT-5.5: $5.00 input / $0.50 cached input / $30.00 output per 1M tokens — https://openai.com/api/pricing/ — verified 2026-05-13
- GPT-5.4: $2.50 input / $0.25 cached input / $15.00 output per 1M tokens — https://openai.com/api/pricing/ — verified 2026-05-13
- GPT-5.4 mini: $0.75 input / $0.075 cached input / $4.50 output per 1M tokens — https://openai.com/api/pricing/ — verified 2026-05-13
- Batch API: 50% discount for asynchronous batch processing — https://openai.com/api/pricing/ — verified 2026-05-13

Pricing notes:
- API pricing is token-driven, so Spendlens does not recommend a fake "plan downgrade."
- The audit engine recommends model routing, prompt caching, batch processing, and startup credits when spend crosses meaningful thresholds.

## Anthropic API

- Claude Opus 4.7: $5 input / $0.50 cache hits / $25 output per million tokens — https://platform.claude.com/docs/en/about-claude/pricing — verified 2026-05-13
- Claude Sonnet 4.6: $3 input / $0.30 cache hits / $15 output per million tokens — https://platform.claude.com/docs/en/about-claude/pricing — verified 2026-05-13
- Claude Haiku 4.5: $1 input / $0.10 cache hits / $5 output per million tokens — https://platform.claude.com/docs/en/about-claude/pricing — verified 2026-05-13

Pricing notes:
- Spendlens treats Anthropic API recommendations as workload-routing recommendations, not subscription replacements.
- Haiku and prompt caching can be useful for high-volume, low-risk workloads.

## Windsurf

- Free: $0/month — https://windsurf.com/pricing — verified 2026-05-13
- Pro: $20/month — https://windsurf.com/pricing — verified 2026-05-13
- Max: $200/month — https://windsurf.com/pricing — verified 2026-05-13
- Teams: $40/user/month — https://windsurf.com/pricing — verified 2026-05-13
- Enterprise: custom pricing — https://windsurf.com/pricing — verified 2026-05-13

Pricing notes:
- Teams is modeled as an admin/collaboration tier.
- Max is treated as a heavy-usage plan, similar to other premium coding assistant tiers.

## v0

- Free: $0/month — https://v0.dev/docs/pricing — verified 2026-05-13
- Premium: $20/month — https://v0.dev/docs/pricing — verified 2026-05-13
- Team: $30/user/month — https://v0.dev/docs/pricing — verified 2026-05-13
- Business: $100/user/month — https://v0.dev/docs/pricing — verified 2026-05-13
- Enterprise: custom pricing — https://v0.dev/docs/pricing — verified 2026-05-13

Pricing notes:
- v0 also exposes model-level token pricing for v0 Mini, v0 Pro, and v0 Max.
- Team and Business plans are only recommended when collaboration, shared credit pools, privacy controls, or centralized billing matter.

## Backend Data Shape

Pricing lives in `src/data/pricingData.ts`.

Each tool contains:

- `displayName`
- `category`
- `plans`
- `defaultRecommendedPlan`
- `smallTeamPlan`
- `benchmarkMonthlySpend` for API providers
- `alternatives`
- `officialUrl`

The backend stores prices as monthly equivalents so the audit engine can compare user spend, expected list pricing, and potential savings consistently.
