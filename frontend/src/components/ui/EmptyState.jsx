import { Inbox } from 'lucide-react'
import { Button } from './Button'

export function EmptyState({
  actionLabel,
  description = 'Try changing your filters or adding a new record.',
  icon: Icon = Inbox,
  onAction,
  title = 'No results found',
}) {
  return (
    <div className="finance-card flex flex-col items-center justify-center px-6 py-14 text-center">
      <div className="rounded-2xl border border-primary/20 bg-primary/10 p-4 text-primary">
        <Icon className="h-8 w-8" />
      </div>
      <h3 className="mt-5 text-xl font-semibold text-[var(--text-main)]">
        {title}
      </h3>
      <p className="mt-2 max-w-md text-sm leading-6 text-[var(--text-muted)]">
        {description}
      </p>
      {actionLabel ? (
        <Button className="mt-6" onClick={onAction} variant="secondary">
          {actionLabel}
        </Button>
      ) : null}
    </div>
  )
}
