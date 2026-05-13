import { describe, expect, it } from 'vitest'
import { analyzeTool, runAudit } from '../src/services/auditEngine.js'

describe('auditEngine', () => {
  it('recommends Cursor Pro when Business is unnecessary for a tiny team', () => {
    const result = analyzeTool(
      {
        tool: 'Cursor',
        plan: 'Teams',
        seats: 2,
        monthlySpend: 80,
      },
      {
        teamSize: 2,
        useCase: 'Coding',
        selectedToolKeys: new Set(['cursor']),
      },
    )

    expect(result.recommendedPlan).toBe('Pro')
    expect(result.monthlySavings).toBe(40)
    expect(result.annualSavings).toBe(480)
    expect(result.reason).toContain('Business or team controls')
  })

  it('does not force savings when GitHub Copilot Business matches benchmark pricing', () => {
    const result = analyzeTool(
      {
        tool: 'GitHub Copilot',
        plan: 'Business',
        seats: 5,
        monthlySpend: 95,
      },
      {
        teamSize: 5,
        useCase: 'Coding',
        selectedToolKeys: new Set(['githubCopilot']),
      },
    )

    expect(result.monthlySavings).toBe(0)
    expect(result.severity).toBe('optimized')
    expect(result.recommendedAction).toBe('Keep current plan')
  })

  it('detects over-allocated seats and calculates seat waste savings', () => {
    const result = analyzeTool(
      {
        tool: 'ChatGPT',
        plan: 'Team',
        seats: 10,
        monthlySpend: 300,
      },
      {
        teamSize: 6,
        useCase: 'Mixed',
        selectedToolKeys: new Set(['chatgpt']),
      },
    )

    expect(result.monthlySavings).toBe(100)
    expect(result.recommendedAction).toContain('Remove 4')
  })

  it('recommends API routing and caching for high OpenAI API spend', () => {
    const result = analyzeTool(
      {
        tool: 'OpenAI API',
        plan: 'GPT-5 workload',
        seats: 1,
        monthlySpend: 2000,
      },
      {
        teamSize: 12,
        useCase: 'Mixed',
        selectedToolKeys: new Set(['openaiApi']),
      },
    )

    expect(result.monthlySavings).toBe(560)
    expect(result.recommendedAction).toContain('Classify workloads')
    expect(result.suggestedAlternative).toContain('Batch API')
  })

  it('returns an optimized stack recommendation when savings are immaterial', () => {
    const result = runAudit({
      teamSize: 2,
      useCase: 'Coding',
      tools: [
        {
          tool: 'GitHub Copilot',
          plan: 'Pro',
          seats: 2,
          monthlySpend: 20,
        },
        {
          tool: 'ChatGPT',
          plan: 'Plus',
          seats: 2,
          monthlySpend: 40,
        },
      ],
    })

    expect(result.totalMonthlySavings).toBe(0)
    expect(result.optimized).toBe(true)
    expect(result.recommendations[0].title).toBe(
      'Your current stack is already optimized.',
    )
  })

  it('suggests a cheaper Claude configuration for broad Max usage', () => {
    const result = analyzeTool(
      {
        tool: 'Claude',
        plan: 'Max',
        seats: 10,
        monthlySpend: 1000,
      },
      {
        teamSize: 10,
        useCase: 'Research',
        selectedToolKeys: new Set(['claude']),
      },
    )

    expect(result.recommendedPlan).toBe('Team Standard')
    expect(result.monthlySavings).toBe(750)
    expect(result.reason).toContain('Power plans')
  })

  it('uses invoice reconciliation when reported spend exceeds list pricing', () => {
    const result = analyzeTool(
      {
        tool: 'ChatGPT',
        plan: 'Business',
        seats: 10,
        monthlySpend: 600,
      },
      {
        teamSize: 10,
        useCase: 'Writing',
        selectedToolKeys: new Set(['chatgpt']),
      },
    )

    expect(result.monthlySavings).toBe(350)
    expect(result.recommendedAction).toContain('Reconcile invoice')
    expect(result.reason).toContain('above list-price expectations')
  })

  it('keeps unknown tools honest instead of fabricating savings', () => {
    const result = analyzeTool(
      {
        tool: 'Internal LLM Gateway',
        plan: 'Custom',
        seats: 1,
        monthlySpend: 900,
      },
      {
        teamSize: 8,
        useCase: 'Mixed',
        selectedToolKeys: new Set(),
      },
    )

    expect(result.monthlySavings).toBe(0)
    expect(result.severity).toBe('optimized')
    expect(result.reason).toContain('not in the current Spendlens pricing catalog')
  })
})
