# Spendlens Pricing Data

**Pricing verification date:** 2026-05-13

Pricing changes quickly. Every number used by the audit engine should be checked against the official vendor URL before final submission.

## Cursor

- Free / Hobby: $0/month - https://www.cursor.com/pricing - verified 2026-05-13
- Pro: $20/month - https://www.cursor.com/pricing - verified 2026-05-13
- Business / Teams: $40/user/month - https://www.cursor.com/pricing - verified 2026-05-13
- Enterprise: custom sales pricing - https://www.cursor.com/pricing - verified 2026-05-13

Notes:
- Business/Teams is treated as an admin plan for companies that need privacy mode, centralized billing, analytics, and SSO.
- Very small teams without admin needs may be better served by Pro.

## ChatGPT

- Plus: $20/month - https://openai.com/business/chatgpt-pricing/ - verified 2026-05-13
- Pro: $200/month - https://openai.com/business/chatgpt-pricing/ - verified 2026-05-13
- Business ChatGPT & Codex: $25/user/month when billed monthly - https://openai.com/business/chatgpt-pricing/ - verified 2026-05-13
- Enterprise: custom pricing - https://openai.com/business/chatgpt-pricing/ - verified 2026-05-13

Notes:
- The backend treats older "Team" labels as ChatGPT Business so user-entered data still works.
- Business is useful for shared workspace controls, not necessarily for a two-person team.

## Claude

- Pro: $20/month monthly equivalent - https://claude.com/pricing - verified 2026-05-13
- Max: from $100/month - https://claude.com/pricing - verified 2026-05-13
- Team Standard: $20/seat/month billed annually, $25 if billed monthly - https://claude.com/pricing - verified 2026-05-13
- Team Premium: $100/seat/month billed annually, $125 if billed monthly - https://claude.com/pricing - verified 2026-05-13
- Enterprise: custom or sales-assisted pricing - https://claude.com/pricing - verified 2026-05-13

Notes:
- Max is modeled as a power-user plan.
- Team is recommended only when collaboration and admin features matter.

## GitHub Copilot

- Free: $0/month - https://github.com/features/copilot/plans - verified 2026-05-13
- Pro: $10/user/month - https://github.com/features/copilot/plans - verified 2026-05-13
- Pro+: $39/user/month - https://github.com/features/copilot/plans - verified 2026-05-13
- Business: $19/user/month - https://docs.github.com/copilot/concepts/billing/billing-for-enterprises - verified 2026-05-13
- Enterprise: $39/user/month - https://docs.github.com/copilot/concepts/billing/billing-for-enterprises - verified 2026-05-13

Notes:
- Copilot Business is the normal company baseline.
- Copilot Enterprise should be justified by GitHub Enterprise-level knowledge and controls.

## Gemini

- Free: $0/month - https://gemini.google/subscriptions - verified 2026-05-13
- Google AI Pro: $19.99/month - https://gemini.google/subscriptions - verified 2026-05-13
- Google AI Ultra: $249.99/month - https://gemini.google/subscriptions - verified 2026-05-13
- Gemini API: token-based pricing - https://ai.google.dev/gemini-api/docs/pricing - verified 2026-05-13

Notes:
- AI Ultra is modeled as a power-user plan because it is materially more expensive than Pro.

## OpenAI API

- GPT-5.5: $5.00 input / $0.50 cached input / $30.00 output per 1M tokens - https://openai.com/api/pricing/ - verified 2026-05-13
- GPT-5.4: $2.50 input / $0.25 cached input / $15.00 output per 1M tokens - https://openai.com/api/pricing/ - verified 2026-05-13
- GPT-5.4 mini: $0.75 input / $0.075 cached input / $4.50 output per 1M tokens - https://openai.com/api/pricing/ - verified 2026-05-13
- Batch API: 50% discount for asynchronous batch processing - https://openai.com/api/pricing/ - verified 2026-05-13

Notes:
- API spend is token-driven, so the audit engine recommends routing, caching, batching, and credits instead of fake subscription downgrades.

## Anthropic API

- Claude Opus 4.7: $5 input / $0.50 cache hits / $25 output per million tokens - https://platform.claude.com/docs/en/about-claude/pricing - verified 2026-05-13
- Claude Sonnet 4.6: $3 input / $0.30 cache hits / $15 output per million tokens - https://platform.claude.com/docs/en/about-claude/pricing - verified 2026-05-13
- Claude Haiku 4.5: $1 input / $0.10 cache hits / $5 output per million tokens - https://platform.claude.com/docs/en/about-claude/pricing - verified 2026-05-13

Notes:
- The audit engine treats Anthropic API recommendations as workload-routing recommendations.

## Windsurf

- Free: $0/month - https://windsurf.com/pricing - verified 2026-05-13
- Pro: $20/month - https://windsurf.com/pricing - verified 2026-05-13
- Max: $200/month - https://windsurf.com/pricing - verified 2026-05-13
- Teams: $40/user/month - https://windsurf.com/pricing - verified 2026-05-13
- Enterprise: custom pricing - https://windsurf.com/pricing - verified 2026-05-13

Notes:
- Teams is modeled as an admin/collaboration tier.
- Max is treated as a heavy-usage plan.

## v0

- Free: $0/month - https://v0.dev/docs/pricing - verified 2026-05-13
- Premium: $20/month - https://v0.dev/docs/pricing - verified 2026-05-13
- Team: $30/user/month - https://v0.dev/docs/pricing - verified 2026-05-13
- Business: $100/user/month - https://v0.dev/docs/pricing - verified 2026-05-13
- Enterprise: custom pricing - https://v0.dev/docs/pricing - verified 2026-05-13

Notes:
- Team and Business should be justified by collaboration, shared credits, privacy controls, or centralized billing.

## Backend Source

The backend pricing catalog lives at:

```txt
backend/src/data/pricingData.ts
```

The audit engine uses monthly equivalent prices so it can compare user spend, official list pricing, and potential savings consistently.
