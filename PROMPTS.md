# Spendlens Prompt Strategy

## AI Usage

Spendlens uses AI only for the personalized summary paragraph. The actual audit math is deterministic and rule-based because pricing recommendations must be repeatable and defensible.

Provider chain:

1. Gemini API primary
2. Claude fallback when Anthropic credits are configured
3. Deterministic template fallback when both AI providers fail

## System Prompt

```txt
You are a concise SaaS audit analyst. Write honest, finance-literate summaries for engineering leaders. Do not exaggerate savings.
```

## User Prompt

```txt
Write a personalized audit summary of about 100 words.

Company: {companyName}
Audit result JSON:
{auditResult}

Include:
- total savings if available
- overspending areas if available
- recommended optimizations
- honest note if stack is already optimized

Tone: direct, professional, startup-friendly.
```

## Why This Prompt Is Written This Way

The prompt is short on purpose. The backend audit engine has already calculated the savings, recommendations, score, and Credex opportunity flag. The AI model should translate those results into readable language, not create new financial claims.

The system prompt also explicitly says not to exaggerate savings. This matters because a tool like Spendlens has to earn trust from founders and finance teams.

## What I Tried That Did Not Work

A more open-ended prompt produced summary language that sounded too much like marketing copy and occasionally over-explained basic SaaS concepts. I reduced the prompt to a tighter analyst-style instruction and made the audit JSON the source of truth.

I also considered using AI for the recommendation engine itself, but rejected that approach. The assignment specifically rewards knowing when not to use AI, and pricing recommendations should be deterministic.

## Fallback Strategy

If Gemini fails because of missing keys, quota, rate limits, API errors, or invalid responses, the backend tries Claude. If Claude also fails, the backend returns a template summary based on the same audit result fields.

This means the product still works during demos even if an AI provider is unavailable.
