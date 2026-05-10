import { ArrowUpRight, Sparkles } from 'lucide-react'
import { clsx } from 'clsx'

const priorityStyles = {
  Critical: 'border-rose-400/30 bg-rose-400/10 text-rose-300',
  High: 'border-orange-400/30 bg-orange-400/10 text-orange-300',
  Medium: 'border-blue-400/30 bg-blue-400/10 text-blue-300',
  Low: 'border-slate-400/20 bg-white/5 text-slate-300',
}

export function SavingsRecommendationCard({ recommendation }) {
  return (
    <article className="finance-card interactive-card p-5">
      <div className="flex items-start justify-between gap-4">
        <span className="rounded-2xl bg-accent/10 p-3 text-accent ring-1 ring-accent/20">
          <Sparkles className="h-5 w-5" />
        </span>
        <span
          className={clsx(
            'rounded-full border px-2.5 py-1 text-xs font-semibold',
            priorityStyles[recommendation.priority],
          )}
        >
          {recommendation.priority}
        </span>
      </div>
      <h3 className="mt-5 text-lg font-semibold text-[var(--text-main)]">
        {recommendation.title}
      </h3>
      <p className="mt-3 text-sm leading-6 text-[var(--text-muted)]">
        {recommendation.body}
      </p>
      <div className="mt-6 flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.04] p-3">
        <span className="text-sm text-[var(--text-muted)]">Impact</span>
        <span className="inline-flex items-center gap-1 font-semibold text-emerald-300">
          {recommendation.impact}
          <ArrowUpRight className="h-4 w-4" />
        </span>
      </div>
    </article>
  )
}
