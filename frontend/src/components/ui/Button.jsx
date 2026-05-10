import { Link } from 'react-router-dom'
import { clsx } from 'clsx'

const variants = {
  primary:
    'bg-fintech-gradient text-white shadow-glow hover:brightness-110 focus-visible:ring-primary/40',
  secondary:
    'border border-[var(--card-border)] bg-[var(--input-bg)] text-[var(--text-main)] hover:border-primary/40 focus-visible:ring-primary/20',
  ghost:
    'text-[var(--text-muted)] hover:bg-[var(--input-bg)] hover:text-[var(--text-main)] focus-visible:ring-primary/10',
  subtle:
    'border border-[var(--card-border)] bg-[var(--soft-surface)] text-[var(--text-soft)] hover:border-primary/50 hover:text-[var(--text-main)] focus-visible:ring-primary/20',
}

const sizes = {
  sm: 'h-10 px-4 text-sm',
  md: 'h-12 px-5 text-sm',
  lg: 'h-14 px-6 text-base',
  icon: 'h-11 w-11 p-0',
}

export function Button({
  children,
  className,
  icon: Icon,
  size = 'md',
  to,
  type = 'button',
  variant = 'primary',
  ...props
}) {
  const classes = clsx(
    'inline-flex items-center justify-center gap-2 rounded-2xl font-semibold transition focus-visible:outline-none focus-visible:ring-4 disabled:cursor-not-allowed disabled:opacity-60',
    variants[variant],
    sizes[size],
    className,
  )

  if (to) {
    return (
      <Link className={classes} to={to} {...props}>
        {Icon ? <Icon className="h-4 w-4" /> : null}
        {children}
      </Link>
    )
  }

  return (
    <button className={classes} type={type} {...props}>
      {Icon ? <Icon className="h-4 w-4" /> : null}
      {children}
    </button>
  )
}
