import Anthropic from '@anthropic-ai/sdk'
import { env } from '../config/env.js'

type SummaryInput = {
  auditResult: Record<string, unknown>
  companyName?: string
}

export async function generateAuditSummary(input: SummaryInput) {
  const fallback = buildFallbackSummary(input)
  const failureReasons: string[] = []

  if (env.GEMINI_API_KEY) {
    const geminiResult = await tryGeminiSummary(input)

    if (geminiResult.ok) {
      return {
        summary: geminiResult.summary,
        provider: 'gemini',
        model: env.GEMINI_MODEL,
        fallback: false,
      }
    }

    failureReasons.push(`Gemini: ${geminiResult.reason}`)
  } else {
    failureReasons.push('Gemini: GEMINI_API_KEY is not configured')
  }

  if (env.ANTHROPIC_API_KEY) {
    const claudeResult = await tryClaudeSummary(input)

    if (claudeResult.ok) {
      return {
        summary: claudeResult.summary,
        provider: 'anthropic',
        model: env.ANTHROPIC_MODEL,
        fallback: true,
        fallbackFrom: 'gemini',
      }
    }

    failureReasons.push(`Claude: ${claudeResult.reason}`)
  } else {
    failureReasons.push('Claude: ANTHROPIC_API_KEY is not configured')
  }

  return {
    summary: fallback,
    provider: 'template-fallback',
    fallback: true,
    reasons: failureReasons,
  }
}

async function tryGeminiSummary(input: SummaryInput) {
  try {
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${env.GEMINI_MODEL}:generateContent?key=${env.GEMINI_API_KEY}`
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        systemInstruction: {
          parts: [
            {
              text: 'You are a concise SaaS audit analyst. Write honest, finance-literate summaries for engineering leaders. Do not exaggerate savings.',
            },
          ],
        },
        contents: [
          {
            role: 'user',
            parts: [{ text: buildSummaryPrompt(input) }],
          },
        ],
        generationConfig: {
          temperature: 0.3,
          maxOutputTokens: 220,
        },
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      return {
        ok: false as const,
        reason: `HTTP ${response.status} ${errorText.slice(0, 180)}`,
      }
    }

    const data = (await response.json()) as {
      candidates?: Array<{
        content?: {
          parts?: Array<{ text?: string }>
        }
      }>
    }

    const text = data.candidates?.[0]?.content?.parts
      ?.map((part) => part.text ?? '')
      .join('\n')
      .trim()

    if (!text || text.length < 40) {
      return {
        ok: false as const,
        reason: 'empty or invalid Gemini response',
      }
    }

    return {
      ok: true as const,
      summary: text,
    }
  } catch (error) {
    return {
      ok: false as const,
      reason: error instanceof Error ? error.message : 'Unknown Gemini failure',
    }
  }
}

async function tryClaudeSummary(input: SummaryInput) {
  try {
    const anthropic = new Anthropic({
      apiKey: env.ANTHROPIC_API_KEY,
    })

    const message = await anthropic.messages.create({
      model: env.ANTHROPIC_MODEL,
      max_tokens: 220,
      temperature: 0.3,
      system:
        'You are a concise SaaS audit analyst. Write honest, finance-literate summaries for engineering leaders. Do not exaggerate savings.',
      messages: [
        {
          role: 'user',
          content: buildSummaryPrompt(input),
        },
      ],
    })

    const text = message.content
      .filter((block) => block.type === 'text')
      .map((block) => block.text)
      .join('\n')
      .trim()

    if (!text || text.length < 40) {
      return {
        ok: false as const,
        reason: 'empty or invalid Claude response',
      }
    }

    return {
      ok: true as const,
      summary: text,
    }
  } catch (error) {
    return {
      ok: false as const,
      reason: error instanceof Error ? error.message : 'Unknown Claude failure',
    }
  }
}

function buildSummaryPrompt(input: SummaryInput) {
  return `
Write a personalized audit summary of about 100 words.

Company: ${input.companyName ?? 'the company'}
Audit result JSON:
${JSON.stringify(input.auditResult, null, 2)}

Include:
- total savings if available
- overspending areas if available
- recommended optimizations
- honest note if stack is already optimized

Tone: direct, professional, startup-friendly.
  `.trim()
}

function buildFallbackSummary(input: SummaryInput) {
  const result = input.auditResult
  const savings = result.totalMonthlySavings
  const annual = result.annualSavings
  const score = result.optimizationScore
  const optimized = result.optimized
  const company = input.companyName ?? 'Your team'

  if (optimized) {
    return `${company} already appears to have a cost-efficient AI stack based on the submitted spend and team size. The best next step is to keep monitoring seats, API usage spikes, and renewal dates so unnecessary plans do not creep back into the budget.`
  }

  return `${company} has meaningful AI spend optimization potential. The audit found approximately $${Number(savings ?? 0).toLocaleString()} in monthly savings and $${Number(annual ?? 0).toLocaleString()} annually, with an estimated efficiency score of ${Number(score ?? 0)}. The highest-leverage actions are usually removing unused seats, downgrading premium plans for non-power users, and routing API workloads to cheaper models where quality requirements allow.`
}
