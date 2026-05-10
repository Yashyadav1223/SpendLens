export function formatCurrency(value, options = {}) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: options.maximumFractionDigits ?? 0,
  }).format(value)
}

export function formatCompactCurrency(value) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(value)
}

export function formatDate(value) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(value))
}

export function formatPercent(value) {
  return `${value > 0 ? '+' : ''}${value}%`
}

export function getStatusClasses(status) {
  const styles = {
    completed: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20',
    pending: 'bg-amber-500/10 text-amber-300 border-amber-500/20',
    failed: 'bg-rose-500/10 text-rose-300 border-rose-500/20',
  }

  return styles[status] ?? 'bg-slate-500/10 text-slate-300 border-slate-500/20'
}
