import { clsx } from 'clsx'

export function SectionHeader({
  eyebrow,
  title,
  description,
  action,
  align = 'left',
  className,
}) {
  return (
    <div
      className={clsx(
        'flex flex-col gap-4 md:flex-row md:items-end md:justify-between',
        align === 'center' && 'items-center text-center md:items-center',
        className,
      )}
    >
      <div className="max-w-2xl">
        {eyebrow ? (
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.28em] text-primary">
            {eyebrow}
          </p>
        ) : null}
        <h2 className="text-3xl font-bold tracking-tight text-[var(--text-main)] sm:text-4xl">
          {title}
        </h2>
        {description ? (
          <p className="mt-3 text-base leading-7 text-[var(--text-muted)]">
            {description}
          </p>
        ) : null}
      </div>
      {action ? <div>{action}</div> : null}
    </div>
  )
}
