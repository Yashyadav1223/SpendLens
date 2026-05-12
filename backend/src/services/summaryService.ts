import Anthropic from '@anthropic-ai/sdk'
import { env } from '../config/env.js'

type SummaryInput = {
  auditResult: Record<string, unknown>
  companyName?: string
}

export async function generateAuditSummary(input: SummaryInput) {
  const fallback = buildFallbackSummary(input)

  if (!env.ANTHROPIC_API_KEY) {
    return {
      summary: fallback,
      provider: 'template-fallback',
      fallback: true,
    }
  }

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
        summary: fallback,
        provider: 'template-fallback',
        fallback: true,
      }
    }

    return {
      summary: text,
      provider: 'anthropic',
      fallback: false,
    }
  } catch (error) {
    return {
      summary: fallback,
      provider: 'template-fallback',
      fallback: true,
      reason: error instanceof Error ? error.message : 'Unknown AI summary failure',
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
