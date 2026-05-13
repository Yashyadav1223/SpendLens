const severityToPriority = {
  critical: 'Critical',
  high: 'High',
  medium: 'Medium',
  low: 'Low',
  optimized: 'Optimized',
}

export function buildAuditPayload(form) {
  return {
    monthlyAiBudget: Number(form.monthlyBudget || 0),
    painPoints: form.painPoints || [],
    teamSize: Number(form.teamSize || 1),
    tools: form.tools
      .filter((tool) => tool.selected)
      .map((tool) => ({
        monthlySpend: Number(tool.monthlySpend || 0),
        plan: tool.plan,
        seats: Number(tool.seats || 0),
        tool: tool.id,
        usageType: tool.usageType,
      })),
    useCase: form.primaryUseCase,
  }
}

export function adaptAuditResult(apiResult, fallbackResults, form) {
  if (!apiResult) {
    return {
      ...fallbackResults,
      source: 'demo',
    }
  }

  const monthlySpendTrend = buildSpendTrend(
    fallbackResults.monthlySpendTrend,
    apiResult.currentMonthlySpend,
    apiResult.totalMonthlySavings,
  )

  return {
    ...fallbackResults,
    breakdown: apiResult.breakdown.map((item) => ({
      ...item,
      priority: severityToPriority[item.severity] || 'Medium',
    })),
    creditOpportunity: apiResult.creditOpportunity,
    optimized: apiResult.optimized,
    recommendations: apiResult.recommendations.map((item) => ({
      body: item.description,
      impact: item.impact,
      priority: severityToPriority[item.severity] || 'Medium',
      title: item.title,
    })),
    source: 'api',
    summary: {
      currentMonthlySpend: apiResult.currentMonthlySpend,
      efficiencyScore: apiResult.optimizationScore,
      potentialAnnualSavings: apiResult.annualSavings,
      potentialMonthlySavings: apiResult.totalMonthlySavings,
      spendPerEmployee: apiResult.spendPerEmployee,
      teamSize: Number(form?.teamSize || fallbackResults.summary.teamSize),
    },
    monthlySpendTrend,
  }
}

function buildSpendTrend(fallbackTrend, currentSpend, monthlySavings) {
  if (!Array.isArray(fallbackTrend) || fallbackTrend.length === 0) {
    return []
  }

  return fallbackTrend.map((point, index) => {
    const progress = (index + 1) / fallbackTrend.length
    const spend = Math.round(currentSpend * (0.72 + progress * 0.28))

    return {
      ...point,
      optimized: Math.max(0, Math.round(spend - monthlySavings)),
      spend,
    }
  })
}
