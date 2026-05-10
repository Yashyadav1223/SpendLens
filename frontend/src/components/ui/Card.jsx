import { clsx } from 'clsx'

export function Card({ as: Component = 'div', children, className }) {
  return (
    <Component className={clsx('finance-card p-5 sm:p-6', className)}>
      {children}
    </Component>
  )
}
