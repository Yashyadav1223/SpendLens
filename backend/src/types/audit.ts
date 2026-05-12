export type UseCase = 'Coding' | 'Writing' | 'Research' | 'Data Analysis' | 'Mixed'

export type ToolSpendInput = {
  tool: string
  plan: string
  seats: number
  monthlySpend: number
  usageType?: string
}

export type AuditInput = {
  tools: ToolSpendInput[]
  teamSize: number
  useCase: UseCase
  monthlyAiBudget?: number
  painPoints?: string[]
}

export type RecommendationSeverity = 'critical' | 'high' | 'medium' | 'low' | 'optimized'

export type AuditBreakdownItem = {
  tool: string
  currentPlan: string
  currentCost: number
  recommendedPlan: string
  recommendedAction: string
  suggestedAlternative: string
  monthlySavings: number
  annualSavings: number
  reason: string
  severity: RecommendationSeverity
}

export type AuditRecommendation = {
  title: string
  description: string
  impact: string
  severity: RecommendationSeverity
}

export type AuditResult = {
  currentMonthlySpend: number
  totalMonthlySavings: number
  annualSavings: number
  optimizationScore: number
  spendPerEmployee: number
  optimized: boolean
  creditOpportunity: boolean
  breakdown: AuditBreakdownItem[]
  recommendations: AuditRecommendation[]
}
