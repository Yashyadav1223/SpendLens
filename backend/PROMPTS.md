# Spendlens Prompt Strategy

## AI Summary Prompt

The summary endpoint uses this provider chain:

1. Gemini API primary
2. Claude fallback
3. Template fallback

Gemini is the primary provider because it is easier to access for many demo and student projects. Claude remains available as a high-quality fallback if Anthropic credits are configured.

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

## System Prompt

```txt
You are a concise SaaS audit analyst. Write honest, finance-literate summaries for engineering leaders. Do not exaggerate savings.
```

## Prompt Reasoning

The prompt is intentionally short. The backend audit engine is the source of truth for calculations, so the AI model should summarize rather than invent recommendations. This keeps the product honest and reduces hallucinated financial claims.

## Fallback Strategy

If Gemini fails because of missing keys, quota, rate limits, API errors, or invalid responses, the backend tries Claude. If Claude also fails, the backend returns a deterministic template summary. This keeps the product usable during demos and protects the user experience from external API failures.
