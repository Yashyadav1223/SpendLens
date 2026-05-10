import { clsx } from 'clsx'

export function LoadingSkeleton({ className }) {
  return (
    <div
      className={clsx(
        'animate-pulse rounded-2xl bg-gradient-to-r from-white/5 via-white/10 to-white/5',
        className,
      )}
    />
  )
}

export function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <LoadingSkeleton className="h-40" key={index} />
        ))}
      </div>
      <div className="grid gap-6 xl:grid-cols-[1.4fr_0.8fr]">
        <LoadingSkeleton className="h-96" />
        <LoadingSkeleton className="h-96" />
      </div>
      <LoadingSkeleton className="h-80" />
    </div>
  )
}
