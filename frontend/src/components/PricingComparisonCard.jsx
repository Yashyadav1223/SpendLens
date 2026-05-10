import { CheckCircle2, MinusCircle } from 'lucide-react'
import { formatCurrency } from '../utils/formatters'

export function PricingComparisonCard({ tool }) {
  return (
    <article className="finance-card interactive-card p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-[var(--text-main)]">
            {tool.name}
          </h3>
          <p className="mt-1 text-sm text-[var(--text-muted)]">
            {tool.vendor} · {tool.category}
          </p>
        </div>
        <span className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
          {formatCurrency(tool.benchmarkPrice)}/mo
        </span>
      </div>
      <div className="mt-5 flex flex-wrap gap-2">
        {tool.plans.slice(0, 5).map((plan) => (
          <span
            className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-medium text-slate-300"
            key={plan}
          >
            {plan}
          </span>
        ))}
      </div>
      <div className="mt-5 space-y-2">
        {tool.usageTypes.slice(0, 3).map((usage, index) => (
          <div className="flex items-center gap-2 text-sm text-[var(--text-muted)]" key={usage}>
            {index === 0 ? (
              <CheckCircle2 className="h-4 w-4 text-emerald-300" />
            ) : (
              <MinusCircle className="h-4 w-4 text-slate-500" />
            )}
            {usage}
          </div>
        ))}
      </div>
    </article>
  )
}
