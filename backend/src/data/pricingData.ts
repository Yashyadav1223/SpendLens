export type PricingPlan = {
  displayName: string
  monthlyCost: number | null
  perSeat: boolean
  enterpriseAvailable?: boolean
  notes?: string
}

export type ToolPricing = {
  displayName: string
  category: 'coding-assistant' | 'general-ai' | 'model-api' | 'ui-generation'
  plans: Record<string, PricingPlan>
  defaultRecommendedPlan: string
  smallTeamPlan?: string
  benchmarkMonthlySpend?: number
  alternatives: string[]
  officialUrl: string
}

export const pricingData = {
  cursor: {
    displayName: 'Cursor',
    category: 'coding-assistant',
    defaultRecommendedPlan: 'pro',
    smallTeamPlan: 'pro',
    officialUrl: 'https://cursor.com/pricing',
    alternatives: ['GitHub Copilot Business', 'Windsurf Teams'],
    plans: {
      free: { displayName: 'Free', monthlyCost: 0, perSeat: true },
      pro: { displayName: 'Pro', monthlyCost: 20, perSeat: true },
      proPlus: { displayName: 'Pro+', monthlyCost: 60, perSeat: true },
      ultra: { displayName: 'Ultra', monthlyCost: 200, perSeat: true },
      teams: {
        displayName: 'Teams',
        monthlyCost: 40,
        perSeat: true,
        enterpriseAvailable: true,
      },
      enterprise: {
        displayName: 'Enterprise',
        monthlyCost: null,
        perSeat: true,
        enterpriseAvailable: true,
        notes: 'Custom pricing.',
      },
    },
  },
  chatgpt: {
    displayName: 'ChatGPT',
    category: 'general-ai',
    defaultRecommendedPlan: 'business',
    smallTeamPlan: 'plus',
    officialUrl: 'https://openai.com/business/chatgpt-pricing',
    alternatives: ['Claude Team', 'Gemini AI Pro'],
    plans: {
      free: { displayName: 'Free', monthlyCost: 0, perSeat: true },
      plus: { displayName: 'Plus', monthlyCost: 20, perSeat: true },
      pro: { displayName: 'Pro', monthlyCost: 200, perSeat: true },
      business: {
        displayName: 'Business',
        monthlyCost: 25,
        perSeat: true,
        notes: 'Business is $25/user/month when billed monthly; older Team labels are treated as Business.',
      },
      team: {
        displayName: 'Business',
        monthlyCost: 25,
        perSeat: true,
        notes: 'Compatibility alias for the former ChatGPT Team naming.',
      },
      enterprise: {
        displayName: 'Enterprise',
        monthlyCost: null,
        perSeat: true,
        enterpriseAvailable: true,
      },
    },
  },
  claude: {
    displayName: 'Claude',
    category: 'general-ai',
    defaultRecommendedPlan: 'team',
    smallTeamPlan: 'pro',
    officialUrl: 'https://claude.com/pricing',
    alternatives: ['ChatGPT Team', 'Gemini AI Pro'],
    plans: {
      free: { displayName: 'Free', monthlyCost: 0, perSeat: true },
      pro: { displayName: 'Pro', monthlyCost: 20, perSeat: true },
      max: { displayName: 'Max', monthlyCost: 100, perSeat: true },
      max20x: { displayName: 'Max 20x', monthlyCost: 200, perSeat: true },
      team: {
        displayName: 'Team Standard',
        monthlyCost: 25,
        perSeat: true,
        notes: 'Monthly billing equivalent for Claude Team standard seats.',
      },
      teamPremium: {
        displayName: 'Team Premium',
        monthlyCost: 125,
        perSeat: true,
        notes: 'Premium team seat with 5x more usage than standard seats.',
      },
      enterprise: {
        displayName: 'Enterprise',
        monthlyCost: null,
        perSeat: true,
        enterpriseAvailable: true,
      },
    },
  },
  githubCopilot: {
    displayName: 'GitHub Copilot',
    category: 'coding-assistant',
    defaultRecommendedPlan: 'business',
    smallTeamPlan: 'pro',
    officialUrl: 'https://github.com/features/copilot/plans',
    alternatives: ['Cursor Pro', 'Windsurf Pro'],
    plans: {
      free: { displayName: 'Free', monthlyCost: 0, perSeat: true },
      pro: { displayName: 'Pro', monthlyCost: 10, perSeat: true },
      proPlus: { displayName: 'Pro+', monthlyCost: 39, perSeat: true },
      business: { displayName: 'Business', monthlyCost: 19, perSeat: true },
      enterprise: {
        displayName: 'Enterprise',
        monthlyCost: 39,
        perSeat: true,
        enterpriseAvailable: true,
      },
    },
  },
  gemini: {
    displayName: 'Gemini',
    category: 'general-ai',
    defaultRecommendedPlan: 'aiPro',
    smallTeamPlan: 'aiPro',
    officialUrl: 'https://gemini.google/subscriptions',
    alternatives: ['ChatGPT Plus', 'Claude Pro'],
    plans: {
      free: { displayName: 'Free', monthlyCost: 0, perSeat: true },
      aiPro: { displayName: 'AI Pro', monthlyCost: 19.99, perSeat: true },
      aiUltra: { displayName: 'AI Ultra', monthlyCost: 249.99, perSeat: true },
      workspaceAddon: {
        displayName: 'Workspace add-on',
        monthlyCost: 30,
        perSeat: true,
      },
      enterprise: {
        displayName: 'Enterprise',
        monthlyCost: null,
        perSeat: true,
        enterpriseAvailable: true,
      },
    },
  },
  openaiApi: {
    displayName: 'OpenAI API',
    category: 'model-api',
    defaultRecommendedPlan: 'modelRouting',
    benchmarkMonthlySpend: 750,
    officialUrl: 'https://openai.com/api/pricing',
    alternatives: ['GPT-5 mini routing', 'Batch API', 'Prompt caching'],
    plans: {
      gpt5: {
        displayName: 'GPT-5.5 workload',
        monthlyCost: null,
        perSeat: false,
        notes: 'Token based pricing; GPT-5.5 standard pricing starts at $5 input and $30 output per 1M tokens.',
      },
      gpt5Mini: {
        displayName: 'GPT-5.4 mini workload',
        monthlyCost: null,
        perSeat: false,
        notes: 'Lower-cost token based workload for coding, computer use, and subagents.',
      },
      batch: {
        displayName: 'Batch API',
        monthlyCost: null,
        perSeat: false,
        notes: 'Useful for asynchronous jobs.',
      },
      modelRouting: {
        displayName: 'Model routing',
        monthlyCost: null,
        perSeat: false,
        notes: 'Route simple tasks to cheaper models.',
      },
    },
  },
  anthropicApi: {
    displayName: 'Anthropic API',
    category: 'model-api',
    defaultRecommendedPlan: 'sonnetHaikuRouting',
    benchmarkMonthlySpend: 850,
    officialUrl: 'https://docs.anthropic.com/en/docs/about-claude/pricing',
    alternatives: ['Claude Haiku routing', 'Prompt caching', 'Batch workloads'],
    plans: {
      opus: {
        displayName: 'Claude Opus workload',
        monthlyCost: null,
        perSeat: false,
        notes: 'Highest capability, highest cost.',
      },
      sonnet: {
        displayName: 'Claude Sonnet workload',
        monthlyCost: null,
        perSeat: false,
      },
      haiku: {
        displayName: 'Claude Haiku workload',
        monthlyCost: null,
        perSeat: false,
      },
      sonnetHaikuRouting: {
        displayName: 'Sonnet + Haiku routing',
        monthlyCost: null,
        perSeat: false,
      },
    },
  },
  windsurf: {
    displayName: 'Windsurf',
    category: 'coding-assistant',
    defaultRecommendedPlan: 'teams',
    smallTeamPlan: 'pro',
    officialUrl: 'https://windsurf.com/pricing',
    alternatives: ['Cursor Pro', 'GitHub Copilot Business'],
    plans: {
      free: { displayName: 'Free', monthlyCost: 0, perSeat: true },
      pro: { displayName: 'Pro', monthlyCost: 20, perSeat: true },
      max: { displayName: 'Max', monthlyCost: 200, perSeat: true },
      teams: {
        displayName: 'Teams',
        monthlyCost: 40,
        perSeat: true,
        enterpriseAvailable: true,
      },
      enterprise: {
        displayName: 'Enterprise',
        monthlyCost: null,
        perSeat: true,
        enterpriseAvailable: true,
      },
    },
  },
  v0: {
    displayName: 'v0',
    category: 'ui-generation',
    defaultRecommendedPlan: 'team',
    smallTeamPlan: 'premium',
    officialUrl: 'https://v0.dev/docs/pricing',
    alternatives: ['Cursor for small UI tasks', 'ChatGPT Team'],
    plans: {
      free: { displayName: 'Free', monthlyCost: 0, perSeat: false },
      premium: { displayName: 'Premium', monthlyCost: 20, perSeat: false },
      team: { displayName: 'Team', monthlyCost: 30, perSeat: true },
      business: {
        displayName: 'Business',
        monthlyCost: 100,
        perSeat: true,
        enterpriseAvailable: true,
      },
      enterprise: {
        displayName: 'Enterprise',
        monthlyCost: null,
        perSeat: true,
        enterpriseAvailable: true,
      },
    },
  },
} as const satisfies Record<string, ToolPricing>

export type ToolKey = keyof typeof pricingData

export const toolAliases: Record<string, ToolKey> = {
  anthropic: 'anthropicApi',
  anthropicapi: 'anthropicApi',
  claude: 'claude',
  claudeapi: 'anthropicApi',
  chatgpt: 'chatgpt',
  copilot: 'githubCopilot',
  cursor: 'cursor',
  gemini: 'gemini',
  githubcopilot: 'githubCopilot',
  openai: 'openaiApi',
  openaiapi: 'openaiApi',
  v0: 'v0',
  vercelv0: 'v0',
  windsurf: 'windsurf',
}

export function normalizeToolName(tool: string): ToolKey | null {
  const normalized = tool.toLowerCase().replace(/[^a-z0-9]/g, '')
  return toolAliases[normalized] ?? null
}

export function normalizePlanKey(plan: string): string {
  return plan.toLowerCase().replace(/[^a-z0-9]/g, '')
}
