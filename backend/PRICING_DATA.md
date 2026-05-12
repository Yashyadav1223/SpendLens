# Spendlens Pricing Data

**Pricing verification date:** 2026-05-12

Pricing changes frequently. The backend stores pragmatic MVP benchmarks, not legal billing guarantees. Before using Spendlens in production, verify pricing directly against vendor pages.

## Sources

| Vendor / Tool | Official pricing URL | Notes |
| --- | --- | --- |
| Cursor | https://cursor.com/pricing | Includes Free, Pro, Pro+, Ultra, Teams, and Enterprise style plans. |
| ChatGPT | https://openai.com/chatgpt/pricing | Includes individual, team/business, and enterprise options. |
| Claude | https://www.anthropic.com/pricing | Includes Free, Pro, Max, Team, and Enterprise options. |
| GitHub Copilot | https://github.com/features/copilot/plans | GitHub Docs also list Business and Enterprise per-user pricing. |
| Gemini / Google AI | https://one.google.com/about/ai-plans | Consumer/team plan references for AI Pro and AI Ultra style plans. |
| Gemini API | https://ai.google.dev/gemini-api/docs/pricing | Model API pricing and paid tier details. |
| OpenAI API | https://openai.com/api/pricing | Token-based API pricing for OpenAI models. |
| Anthropic API | https://docs.anthropic.com/en/docs/about-claude/pricing | Token-based pricing for Claude API models and caching. |
| Windsurf | https://windsurf.com/pricing | Windsurf Docs reference Free, Pro, Max, Teams, and Enterprise plans. |
| v0 | https://v0.dev/docs/pricing | Documents Free, Premium, Team, Business, and Enterprise pricing. |

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

Example:

```ts
cursor: {
  displayName: 'Cursor',
  category: 'coding-assistant',
  defaultRecommendedPlan: 'pro',
  plans: {
    pro: { displayName: 'Pro', monthlyCost: 20, perSeat: true },
    teams: { displayName: 'Teams', monthlyCost: 40, perSeat: true }
  }
}
```
