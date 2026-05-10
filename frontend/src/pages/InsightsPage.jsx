import { Bot, CircleAlert, Lightbulb, Sparkles, TrendingDown, Zap } from 'lucide-react'
import auditData from '../data/audit.json'
import {
  EfficiencyGraphChart,
  SavingsForecastChart,
  ToolComparisonChart,
} from '../charts/AuditCharts'
import { Card } from '../components/ui/Card'
import { SectionHeader } from '../components/ui/SectionHeader'

const insightIcons = {
  Forecast: TrendingDown,
  Opportunity: Lightbulb,
  'Risk Detection': CircleAlert,
  'Waste Detection': Zap,
}

export function InsightsPage() {
  const { auditResults } = auditData

  return (
    <div className="space-y-6">
      <SectionHeader
        description="AI-generated recommendations, risk detection, vendor comparisons, and annual savings forecasts."
        eyebrow="AI Insights"
        title="Smart spend recommendations"
      />

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="grid gap-5 md:grid-cols-2">
          {auditResults.insights.map((insight, index) => {
            const Icon = insightIcons[insight.type] ?? Sparkles
            return (
              <Card className="interactive-card" key={insight.title}>
                <div className="flex items-start justify-between gap-4">
                  <span className="rounded-2xl bg-accent/10 p-3 text-accent ring-1 ring-accent/20">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span
                    className={`rounded-full border px-2.5 py-1 text-xs font-semibold ${
                      insight.priority === 'Critical'
                        ? 'border-rose-400/30 bg-rose-400/10 text-rose-300'
                        : insight.priority === 'High'
                          ? 'border-orange-400/30 bg-orange-400/10 text-orange-300'
                          : 'border-blue-400/30 bg-blue-400/10 text-blue-300'
                    }`}
                  >
                    {insight.priority}
                  </span>
                </div>
                <p className="mt-5 text-sm font-semibold uppercase tracking-[0.18em] text-primary">
                  {insight.type}
                </p>
                <h3 className="mt-3 text-lg font-semibold text-[var(--text-main)]">
                  {insight.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-[var(--text-muted)]">
                  {insight.body}
                </p>
                <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.04] p-3 text-sm font-semibold text-emerald-300">
                  Signal: {insight.trend}
                </div>
                {index === 0 ? (
                  <div className="mt-4 h-1.5 rounded-full bg-white/10">
                    <div className="h-full w-[72%] rounded-full bg-fintech-gradient" />
                  </div>
                ) : null}
              </Card>
            )
          })}
        </div>
        <AssistantPanel />
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <SavingsForecastChart data={auditResults.savingsForecast} />
        <EfficiencyGraphChart data={auditResults.efficiencyTrend} />
      </div>

      <ToolComparisonChart data={auditResults.toolComparison} />

      <div className="grid gap-5 lg:grid-cols-3">
        <InsightSummary
          label="Subscription Waste Detection"
          text="Seven paid seats appear above the active engineering team count across Cursor and ChatGPT."
        />
        <InsightSummary
          label="Vendor Comparison Insights"
          text="Claude Max and ChatGPT Team overlap for writing and research workflows; segment power users."
        />
        <InsightSummary
          label="Usage Efficiency Analysis"
          text="API workloads should be routed by complexity, with caching on repeated prompt paths."
        />
      </div>
    </div>
  )
}

function AssistantPanel() {
  return (
    <Card className="h-full">
      <div className="mb-6 flex items-center gap-3">
        <span className="rounded-2xl bg-primary/10 p-3 text-primary ring-1 ring-primary/20">
          <Bot className="h-5 w-5" />
        </span>
        <div>
          <h3 className="text-lg font-semibold text-[var(--text-main)]">
            AI audit assistant
          </h3>
          <p className="text-sm text-[var(--text-muted)]">Recommendation narrative</p>
        </div>
      </div>
      <div className="space-y-4">
        <Message
          role="assistant"
          text="Your highest ROI move is not replacing every tool. It is segmenting power users, removing idle seats, and routing API traffic by task complexity."
        />
        <Message
          role="user"
          text="What should we change before the next renewal?"
        />
        <Message
          role="assistant"
          text="Start with Claude Max and Cursor seats. Then negotiate API credits because your monthly savings potential is above the Credex threshold."
        />
      </div>
    </Card>
  )
}

function Message({ role, text }) {
  return (
    <div
      className={`rounded-2xl border p-4 text-sm leading-6 ${
        role === 'assistant'
          ? 'border-primary/20 bg-primary/10 text-blue-100'
          : 'border-white/10 bg-white/[0.04] text-slate-300'
      }`}
    >
      {text}
    </div>
  )
}

function InsightSummary({ label, text }) {
  return (
    <Card className="interactive-card">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
        {label}
      </p>
      <p className="mt-4 text-sm leading-6 text-[var(--text-muted)]">{text}</p>
    </Card>
  )
}
