import { motion } from 'framer-motion'
import { ArrowDownRight, ArrowUpRight } from 'lucide-react'
import { clsx } from 'clsx'
import { formatCurrency, formatPercent } from '../../utils/formatters'

const toneClasses = {
  blue: 'from-blue-500/20 text-blue-300 ring-blue-500/20',
  emerald: 'from-emerald-500/20 text-emerald-300 ring-emerald-500/20',
  rose: 'from-rose-500/20 text-rose-300 ring-rose-500/20',
  purple: 'from-violet-500/20 text-violet-300 ring-violet-500/20',
}

export function StatCard({ change, description, icon: Icon, label, tone, value }) {
  const isPositive = change >= 0

  return (
    <motion.article
      className="finance-card interactive-card p-5"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.35 }}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-[var(--text-muted)]">{label}</p>
          <p className="mt-3 text-3xl font-bold tracking-tight text-[var(--text-main)]">
            {formatCurrency(value)}
          </p>
        </div>
        <span
          className={clsx(
            'rounded-2xl bg-gradient-to-br to-transparent p-3 ring-1',
            toneClasses[tone],
          )}
        >
          <Icon className="h-5 w-5" />
        </span>
      </div>
      <div className="mt-5 flex items-center justify-between gap-3">
        <p className="text-sm text-[var(--text-muted)]">{description}</p>
        <span
          className={clsx(
            'inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-semibold',
            isPositive
              ? 'border-emerald-400/20 bg-emerald-400/10 text-emerald-300'
              : 'border-rose-400/20 bg-rose-400/10 text-rose-300',
          )}
        >
          {isPositive ? (
            <ArrowUpRight className="h-3.5 w-3.5" />
          ) : (
            <ArrowDownRight className="h-3.5 w-3.5" />
          )}
          {formatPercent(change)}
        </span>
      </div>
    </motion.article>
  )
}
