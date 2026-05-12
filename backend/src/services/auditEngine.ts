import {
  normalizePlanKey,
  normalizeToolName,
  pricingData,
  type PricingPlan,
  type ToolPricing,
} from '../data/pricingData.js'
import type {
  AuditBreakdownItem,
  AuditInput,
  AuditRecommendation,
  AuditResult,
  RecommendationSeverity,
  ToolSpendInput,
} from '../types/audit.js'
import { clamp, roundMoney } from '../utils/money.js'

type ToolContext = {
  teamSize: number
  useCase: AuditInput['useCase']
  monthlyAiBudget?: number
  selectedToolKeys: Set<string>
}

export function runAudit(input: AuditInput): AuditResult {
  const currentMonthlySpend = roundMoney(
    input.tools.reduce((sum, tool) => sum + tool.monthlySpend, 0),
  )
  const selectedToolKeys = new Set(
    input.tools.flatMap((tool) => {
      const toolKey = normalizeToolName(tool.tool)
      return toolKey ? [toolKey] : []
    }),
  )

  const context: ToolContext = {
    teamSize: input.teamSize,
    useCase: input.useCase,
    monthlyAiBudget: input.monthlyAiBudget,
    selectedToolKeys,
  }

  const breakdown = input.tools.map((tool) => analyzeTool(tool, context))
  const totalMonthlySavings = roundMoney(
    breakdown.reduce((sum, item) => sum + item.monthlySavings, 0),
  )
  const annualSavings = roundMoney(totalMonthlySavings * 12)
  const spendPerEmployee = roundMoney(currentMonthlySpend / input.teamSize)
  const savingsRatio =
    currentMonthlySpend > 0 ? totalMonthlySavings / currentMonthlySpend : 0
  const overBudget =
    input.monthlyAiBudget && currentMonthlySpend > input.monthlyAiBudget
      ? 8
      : 0
  const toolSprawlPenalty = selectedToolKeys.size >= 6 ? 5 : 0
  const optimizationScore = clamp(
    Math.round(100 - savingsRatio * 85 - overBudget - toolSprawlPenalty),
    35,
    96,
  )
  const optimized = totalMonthlySavings < 50
  const creditOpportunity = totalMonthlySavings >= 500 || currentMonthlySpend >= 5000

  return {
    currentMonthlySpend,
    totalMonthlySavings,
    annualSavings,
    optimizationScore,
    spendPerEmployee,
    optimized,
    creditOpportunity,
    breakdown,
    recommendations: buildStackRecommendations({
      annualSavings,
      context,
      creditOpportunity,
      currentMonthlySpend,
      optimized,
      totalMonthlySavings,
    }),
  }
}

export function analyzeTool(
  toolInput: ToolSpendInput,
  context: ToolContext,
): AuditBreakdownItem {
  const toolKey = normalizeToolName(toolInput.tool)

  if (!toolKey) {
    return optimizedBreakdown(
      toolInput,
      'Unknown tool',
      'No recommendation',
      'This tool is not in the current Spendlens pricing catalog, so the safest recommendation is to review usage manually.',
    )
  }

  const toolPricing = pricingData[toolKey]
  const currentPlan = findPlan(toolPricing, toolInput.plan)
  const planCost = estimatePlanCost(currentPlan, toolInput.seats)
  const currentCost = roundMoney(toolInput.monthlySpend)

  if (toolPricing.category === 'model-api') {
    return analyzeApiSpend(toolInput, toolPricing, currentCost)
  }

  const seatSavings = calculateSeatWasteSavings(toolInput, currentPlan, context)
  const planSavings = calculatePlanSavings(toolInput, toolPricing, currentPlan, context)
  const overspendSavings = calculateBenchmarkOverspend(
    currentCost,
    planCost,
    currentPlan,
  )

  const bestSavings = Math.max(seatSavings.amount, planSavings.amount, overspendSavings)

  if (bestSavings <= 0) {
    return optimizedBreakdown(
      toolInput,
      currentPlan.displayName,
      currentPlan.displayName,
      `${toolPricing.displayName} spend is within expected range for the selected plan and team size.`,
    )
  }

  const preferred = [seatSavings, planSavings].sort((a, b) => b.amount - a.amount)[0]
  const monthlySavings = roundMoney(bestSavings)

  return {
    tool: toolPricing.displayName,
    currentPlan: currentPlan.displayName,
    currentCost,
    recommendedPlan: preferred.recommendedPlan,
    recommendedAction: preferred.action,
    suggestedAlternative: preferred.alternative,
    monthlySavings,
    annualSavings: roundMoney(monthlySavings * 12),
    reason: preferred.reason,
    severity: monthlySavings >= 500 ? 'critical' : monthlySavings >= 150 ? 'high' : 'medium',
  }
}

function analyzeApiSpend(
  toolInput: ToolSpendInput,
  toolPricing: ToolPricing,
  currentCost: number,
): AuditBreakdownItem {
  const benchmark = toolPricing.benchmarkMonthlySpend ?? 750
  const highSpend = currentCost > benchmark * 1.25
  const meaningfulSpend = currentCost >= 500

  if (!highSpend && !meaningfulSpend) {
    return optimizedBreakdown(
      toolInput,
      toolInput.plan,
      toolInput.plan,
      `${toolPricing.displayName} usage is not high enough to justify a forced migration. Continue monitoring token mix and latency requirements.`,
    )
  }

  const savingsRate = currentCost >= 2000 ? 0.28 : currentCost >= 1000 ? 0.22 : 0.15
  const monthlySavings = roundMoney(currentCost * savingsRate)

  return {
    tool: toolPricing.displayName,
    currentPlan: toolInput.plan,
    currentCost,
    recommendedPlan: toolPricing.defaultRecommendedPlan,
    recommendedAction:
      'Introduce model routing, caching, and batch processing for low-risk workloads.',
    suggestedAlternative: toolPricing.alternatives.join(' + '),
    monthlySavings,
    annualSavings: roundMoney(monthlySavings * 12),
    reason:
      'API spend is usage-driven, so the best savings usually come from workload tiering instead of a simple plan downgrade.',
    severity: monthlySavings >= 500 ? 'critical' : 'high',
  }
}

function calculateSeatWasteSavings(
  toolInput: ToolSpendInput,
  currentPlan: PricingPlan,
  context: ToolContext,
) {
  if (!currentPlan.perSeat || toolInput.seats <= context.teamSize || toolInput.seats === 0) {
    return noSavings('Keep current seats')
  }

  const wastedSeats = toolInput.seats - context.teamSize
  const perSeatCost = currentPlan.monthlyCost ?? toolInput.monthlySpend / toolInput.seats
  const amount = roundMoney(wastedSeats * perSeatCost)

  return {
    amount,
    recommendedPlan: currentPlan.displayName,
    action: `Remove ${wastedSeats} inactive or unassigned paid seat${wastedSeats === 1 ? '' : 's'}.`,
    alternative: `${context.teamSize} active seats on ${currentPlan.displayName}`,
    reason:
      'Seat count is higher than team size, which usually indicates stale invites, contractors, or duplicated billing.',
  }
}

function calculatePlanSavings(
  toolInput: ToolSpendInput,
  toolPricing: ToolPricing,
  currentPlan: PricingPlan,
  context: ToolContext,
) {
  if (toolInput.seats === 0) {
    return noSavings(currentPlan.displayName)
  }

  const normalizedPlan = normalizePlanKey(toolInput.plan)
  const isTeamPlan = ['business', 'teams', 'team', 'enterprise'].some((keyword) =>
    normalizedPlan.includes(keyword),
  )
  const isPowerPlan = ['max', 'ultra', 'proplus', 'business'].some((keyword) =>
    normalizedPlan.includes(keyword),
  )
  const smallTeam = context.teamSize <= 3

  if (!smallTeam && !isPowerPlan) {
    return noSavings(currentPlan.displayName)
  }

  const targetPlanKey = smallTeam && toolPricing.smallTeamPlan
    ? toolPricing.smallTeamPlan
    : toolPricing.defaultRecommendedPlan
  const targetPlan = toolPricing.plans[targetPlanKey]

  if (!targetPlan || targetPlan.monthlyCost === null) {
    return noSavings(currentPlan.displayName)
  }

  const targetCost = estimatePlanCost(targetPlan, toolInput.seats)
  const amount = roundMoney(Math.max(toolInput.monthlySpend - targetCost, 0))

  if (amount <= 0 || (!isTeamPlan && !isPowerPlan)) {
    return noSavings(currentPlan.displayName)
  }

  return {
    amount,
    recommendedPlan: targetPlan.displayName,
    action: smallTeam
      ? 'Downgrade to the lower self-serve plan until team controls are needed.'
      : 'Move non-power users to the standard team plan and reserve premium access for heavy users.',
    alternative: `${targetPlan.displayName} for active users`,
    reason: smallTeam
      ? 'Business or team controls are usually unnecessary for very small teams unless SSO, audit logs, or centralized billing are required.'
      : 'Power plans should be limited to users with heavy context, agentic, or production-critical workloads.',
  }
}

function calculateBenchmarkOverspend(
  currentCost: number,
  expectedCost: number,
  currentPlan: PricingPlan,
) {
  if (expectedCost <= 0 || currentPlan.monthlyCost === null) {
    return 0
  }

  const threshold = expectedCost * 1.2
  return currentCost > threshold ? roundMoney(currentCost - expectedCost) : 0
}

function estimatePlanCost(plan: PricingPlan, seats: number): number {
  if (plan.monthlyCost === null) {
    return 0
  }

  return roundMoney(plan.perSeat ? plan.monthlyCost * seats : plan.monthlyCost)
}

function findPlan(toolPricing: ToolPricing, plan: string): PricingPlan {
  const normalized = normalizePlanKey(plan)
  const exact = Object.entries(toolPricing.plans).find(
    ([key]) => normalizePlanKey(key) === normalized,
  )

  if (exact) {
    return exact[1]
  }

  const fuzzy = Object.values(toolPricing.plans).find((pricingPlan) =>
    normalizePlanKey(pricingPlan.displayName).includes(normalized),
  )

  return fuzzy ?? toolPricing.plans[toolPricing.defaultRecommendedPlan]
}

function optimizedBreakdown(
  toolInput: ToolSpendInput,
  currentPlan: string,
  recommendedPlan: string,
  reason: string,
): AuditBreakdownItem {
  return {
    tool: toolInput.tool,
    currentPlan,
    currentCost: roundMoney(toolInput.monthlySpend),
    recommendedPlan,
    recommendedAction: 'Keep current plan',
    suggestedAlternative: 'No immediate change',
    monthlySavings: 0,
    annualSavings: 0,
    reason,
    severity: 'optimized',
  }
}

function noSavings(recommendedPlan: string) {
  return {
    amount: 0,
    recommendedPlan,
    action: 'Keep current plan',
    alternative: 'No immediate change',
    reason: 'Current spend appears reasonable.',
  }
}

function buildStackRecommendations(input: {
  annualSavings: number
  context: ToolContext
  creditOpportunity: boolean
  currentMonthlySpend: number
  optimized: boolean
  totalMonthlySavings: number
}): AuditRecommendation[] {
  if (input.optimized) {
    return [
      {
        title: 'Your current stack is already optimized.',
        description:
          'Spendlens did not find material savings based on current spend, team size, and benchmark pricing. Keep monitoring usage before renewals.',
        impact: 'No forced savings',
        severity: 'optimized',
      },
    ]
  }

  const recommendations: AuditRecommendation[] = []

  if (input.creditOpportunity) {
    recommendations.push({
      title: 'Talk to Credex about AI infrastructure credits.',
      description:
        'Your projected savings or total spend is high enough to justify vendor credit routing, committed-use negotiation, or startup credit review.',
      impact: `$${Math.round(input.annualSavings).toLocaleString()} annual savings potential`,
      severity: 'critical',
    })
  }

  if (
    input.context.selectedToolKeys.has('cursor') &&
    input.context.selectedToolKeys.has('githubCopilot')
  ) {
    recommendations.push({
      title: 'Consolidate overlapping coding assistants.',
      description:
        'Cursor and GitHub Copilot can both be valuable, but paying for both across every engineer often creates duplicated spend.',
      impact: 'Reduce duplicate seat cost',
      severity: 'high',
    })
  }

  recommendations.push({
    title: 'Create a monthly AI spend owner.',
    description:
      'Assign one engineering or finance owner to review AI seats, API usage spikes, and renewal dates every month.',
    impact: `$${Math.round(input.totalMonthlySavings).toLocaleString()} monthly savings target`,
    severity: 'medium',
  })

  return recommendations
}
