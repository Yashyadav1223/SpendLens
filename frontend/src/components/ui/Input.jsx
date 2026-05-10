import { clsx } from 'clsx'

export function Input({ className, icon: Icon, label, ...props }) {
  return (
    <label className="block">
      {label ? (
        <span className="mb-2 block text-sm font-medium text-slate-300">
          {label}
        </span>
      ) : null}
      <span className="relative block">
        {Icon ? (
          <Icon className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
        ) : null}
        <input
          className={clsx(
            'app-input h-12 w-full px-4 text-sm placeholder:text-slate-500',
            Icon && 'pl-11',
            className,
          )}
          {...props}
        />
      </span>
    </label>
  )
}
