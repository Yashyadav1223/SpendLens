import { useEffect, useState } from 'react'
import { ArrowRight, BadgeDollarSign, Gauge, Sparkles, UsersRound } from 'lucide-react'
import auditData from '../data/audit.json'
import {
  CategoryOptimizationChart,
  EfficiencyGraphChart,
  SpendTrendChart,
  VendorBreakdownChart,
} from '../charts/AuditCharts'
import { AuditResultCard } from '../components/AuditResultCard'
import { EfficiencyGauge } from '../components/EfficiencyGauge'
import { LeadCaptureModal } from '../components/LeadCaptureModal'
import { SavingsRecommendationCard } from '../components/SavingsRecommendationCard'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { DashboardSkeleton } from '../components/ui/LoadingSkeleton'
import { SectionHeader } from '../components/ui/SectionHeader'
import { formatCurrency } from '../utils/formatters'

export function AuditResultsPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [isLeadOpen, setIsLeadOpen] = useState(false)
  const { auditResults } = auditData
  const { summary } = auditResults
  const hasHighSavings = summary.potentialMonthlySavings > 500

  useEffect(() => {
    const timer = window.setTimeout(() => setIsLoading(false), 620)
    return () => window.clearTimeout(timer)
  }, [])

  if (isLoading) {
    return <DashboardSkeleton />
  }

  return (
    <div className="space-y-6">
      <SectionHeader
        action={
          <Button icon={ArrowRight} onClick={() => setIsLeadOpen(true)} type="button">
            Talk to Credex
          </Button>
        }
        description="A detailed optimization report for AI seats, model APIs, coding assistants, and vendor credit opportunities."
        eyebrow="Audit Results"
        title="AI infrastructure spend audit"
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <MetricCard
          icon={BadgeDollarSign}
          label="Current Monthly AI Spend"
          value={formatCurrency(summary.currentMonthlySpend)}
        />
        <MetricCard
          icon={Sparkles}
          label="Potential Monthly Savings"
          tone="success"
          value={formatCurrency(summary.potentialMonthlySavings)}
        />
        <MetricCard
          icon={Sparkles}
          label="Potential Annual Savings"
          tone="success"
          value={formatCurrency(summary.potentialAnnualSavings)}
        />
        <MetricCard
          icon={Gauge}
          label="Spend Efficiency Score"
          value={`${summary.efficiencyScore}/100`}
        />
        <MetricCard
          icon={UsersRound}
          label="AI Spend Per Employee"
          value={formatCurrency(summary.spendPerEmployee)}
        />
      </div>

      {hasHighSavings ? (
        <Card className="border-emerald-400/30 bg-emerald-400/10">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-emerald-300">
                High savings detected
              </p>
              <h3 className="mt-3 text-2xl font-bold text-white">
                Talk to Credex to unlock discounted AI infrastructure credits.
              </h3>
              <p className="mt-2 text-sm leading-6 text-emerald-100/80">
                This audit found more than {formatCurrency(500)} in monthly
                savings. Your stack may qualify for credit routing and vendor
                negotiation support.
              </p>
            </div>
            <Button icon={ArrowRight} onClick={() => setIsLeadOpen(true)} type="button">
              Request Credit Review
            </Button>
          </div>
        </Card>
      ) : (
        <Card className="border-emerald-400/30 bg-emerald-400/10">
          <h3 className="text-xl font-semibold text-white">
            Your current AI stack is already cost-efficient.
          </h3>
          <p className="mt-2 text-sm text-emerald-100/80">
            Keep monitoring API usage and renewal dates to preserve efficiency.
          </p>
        </Card>
      )}

      <div className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
        <Card className="flex flex-col justify-center">
          <EfficiencyGauge score={summary.efficiencyScore} />
          <div className="mt-8 grid grid-cols-2 gap-3">
            <MiniMetric label="Team size" value={summary.teamSize} />
            <MiniMetric label="Optimized target" value="86/100" />
          </div>
        </Card>
        <SpendTrendChart data={auditResults.monthlySpendTrend} />
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <VendorBreakdownChart data={auditResults.vendorBreakdown} />
        <CategoryOptimizationChart data={auditResults.categorySpend} />
      </div>

      <Card>
        <div className="mb-5">
          <h3 className="text-lg font-semibold text-[var(--text-main)]">
            Audit breakdown table
          </h3>
          <p className="text-sm text-[var(--text-muted)]">
            Tool-by-tool actions, alternatives, and projected savings.
          </p>
        </div>
        <AuditBreakdownTable rows={auditResults.breakdown} />
      </Card>

      <div>
        <div className="mb-5 flex items-end justify-between gap-4">
          <div>
            <h3 className="text-xl font-semibold text-[var(--text-main)]">
              Priority recommendations
            </h3>
            <p className="mt-1 text-sm text-[var(--text-muted)]">
              Ranked by Credex-style impact and implementation risk.
            </p>
          </div>
        </div>
        <div className="grid gap-5 lg:grid-cols-2">
          {auditResults.recommendations.map((recommendation) => (
            <SavingsRecommendationCard
              key={recommendation.title}
              recommendation={recommendation}
            />
          ))}
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        {auditResults.breakdown.slice(0, 3).map((item) => (
          <AuditResultCard item={item} key={item.tool} />
        ))}
      </div>

      <EfficiencyGraphChart data={auditResults.efficiencyTrend} />
      <LeadCaptureModal onClose={() => setIsLeadOpen(false)} open={isLeadOpen} />
    </div>
  )
}

function MetricCard({ icon: Icon, label, tone, value }) {
  return (
    <Card className="interactive-card">
      <span
        className={`inline-flex rounded-2xl p-3 ring-1 ${
          tone === 'success'
            ? 'bg-emerald-400/10 text-emerald-300 ring-emerald-400/20'
            : 'bg-primary/10 text-primary ring-primary/20'
        }`}
      >
        <Icon className="h-5 w-5" />
      </span>
      <p className="mt-5 text-sm font-medium text-[var(--text-muted)]">{label}</p>
      <p className="mt-3 text-2xl font-bold tracking-tight text-[var(--text-main)]">
        {value}
      </p>
    </Card>
  )
}

function MiniMetric({ label, value }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-center">
      <p className="text-xs text-[var(--text-muted)]">{label}</p>
      <p className="mt-2 text-xl font-bold text-[var(--text-main)]">{value}</p>
    </div>
  )
}

function AuditBreakdownTable({ rows }) {
  return (
    <>
      <div className="hidden overflow-hidden rounded-2xl border border-white/10 xl:block">
        <table className="w-full border-collapse text-left">
          <thead className="bg-white/[0.04] text-xs uppercase tracking-[0.2em] text-slate-500">
            <tr>
              <th className="px-5 py-4 font-semibold">Tool</th>
              <th className="px-5 py-4 font-semibold">Current Plan</th>
              <th className="px-5 py-4 text-right font-semibold">Current Cost</th>
              <th className="px-5 py-4 font-semibold">Recommended Action</th>
              <th className="px-5 py-4 font-semibold">Suggested Alternative</th>
              <th className="px-5 py-4 text-right font-semibold">Monthly Savings</th>
              <th className="px-5 py-4 text-right font-semibold">Annual Savings</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {rows.map((row) => (
              <tr className="transition hover:bg-white/[0.04]" key={row.tool}>
                <td className="px-5 py-4 font-semibold text-[var(--text-main)]">
                  {row.tool}
                </td>
                <td className="px-5 py-4 text-sm text-[var(--text-muted)]">
                  {row.currentPlan}
                </td>
                <td className="px-5 py-4 text-right text-sm font-semibold text-white">
                  {formatCurrency(row.currentCost)}
                </td>
                <td className="px-5 py-4 text-sm text-[var(--text-soft)]">
                  {row.recommendedAction}
                </td>
                <td className="px-5 py-4 text-sm text-[var(--text-muted)]">
                  {row.suggestedAlternative}
                </td>
                <td className="px-5 py-4 text-right text-sm font-semibold text-emerald-300">
                  {formatCurrency(row.monthlySavings)}
                </td>
                <td className="px-5 py-4 text-right text-sm font-semibold text-emerald-300">
                  {formatCurrency(row.annualSavings)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid gap-4 xl:hidden">
        {rows.map((row) => (
          <AuditResultCard item={row} key={row.tool} />
        ))}
      </div>
    </>
  )
}
