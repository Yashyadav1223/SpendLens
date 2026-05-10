import { AlertTriangle, CheckCircle2, CircleDollarSign } from 'lucide-react'
import { clsx } from 'clsx'
import { formatCurrency } from '../utils/formatters'

const priorityStyles = {
  Critical: 'border-rose-400/30 bg-rose-400/10 text-rose-300',
  High: 'border-orange-400/30 bg-orange-400/10 text-orange-300',
  Medium: 'border-blue-400/30 bg-blue-400/10 text-blue-300',
  Low: 'border-slate-400/20 bg-white/5 text-slate-300',
  Optimized: 'border-emerald-400/30 bg-emerald-400/10 text-emerald-300',
}

export function AuditResultCard({ item }) {
  const isOptimized = item.priority === 'Optimized'

  return (
    <article className="finance-card interactive-card p-5">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <span
            className={clsx(
              'grid h-11 w-11 place-items-center rounded-2xl',
              isOptimized
                ? 'bg-emerald-400/10 text-emerald-300'
                : 'bg-primary/10 text-primary',
            )}
          >
            {isOptimized ? (
              <CheckCircle2 className="h-5 w-5" />
            ) : (
              <AlertTriangle className="h-5 w-5" />
            )}
          </span>
          <div>
            <h3 className="font-semibold text-[var(--text-main)]">{item.tool}</h3>
            <p className="text-sm text-[var(--text-muted)]">{item.currentPlan}</p>
          </div>
        </div>
        <span
          className={clsx(
            'rounded-full border px-2.5 py-1 text-xs font-semibold',
            priorityStyles[item.priority],
          )}
        >
          {item.priority}
        </span>
      </div>

      <p className="mt-5 text-sm leading-6 text-[var(--text-muted)]">
        {item.recommendedAction}
      </p>
      <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
          Suggested alternative
        </p>
        <p className="mt-2 text-sm font-medium text-[var(--text-main)]">
          {item.suggestedAlternative}
        </p>
      </div>
      <div className="mt-5 grid grid-cols-2 gap-3">
        <Metric label="Current" value={formatCurrency(item.currentCost)} />
        <Metric
          label="Monthly savings"
          value={formatCurrency(item.monthlySavings)}
        />
      </div>
    </article>
  )
}

function Metric({ label, value }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-950/35 p-3">
      <div className="mb-2 flex items-center gap-2 text-xs text-slate-500">
        <CircleDollarSign className="h-3.5 w-3.5" />
        {label}
      </div>
      <p className="font-semibold text-[var(--text-main)]">{value}</p>
    </div>
  )
}
