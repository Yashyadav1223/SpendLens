import { formatCurrency } from '../utils/formatters'

export function ChartTooltip({ active, label, payload }) {
  if (!active || !payload?.length) {
    return null
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-slate-950/95 p-3 shadow-soft backdrop-blur-xl">
      {label ? <p className="mb-2 text-sm font-semibold text-white">{label}</p> : null}
      <div className="space-y-1">
        {payload.map((item) => (
          <div
            className="flex items-center justify-between gap-5 text-sm"
            key={`${item.name}-${item.value}`}
          >
            <span className="flex items-center gap-2 text-slate-400">
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              {item.name}
            </span>
            <span className="font-semibold text-white">
              {formatTooltipValue(item)}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

function formatTooltipValue(item) {
  if (typeof item.value !== 'number') {
    return item.value
  }

  if (String(item.name).toLowerCase().includes('score')) {
    return item.value
  }

  return formatCurrency(item.value)
}
