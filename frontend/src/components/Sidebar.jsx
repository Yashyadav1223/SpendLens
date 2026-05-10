import { NavLink } from 'react-router-dom'
import {
  BarChart3,
  FileText,
  Gauge,
  Layers3,
  Radar,
  Settings,
  Sparkles,
  X,
} from 'lucide-react'
import { clsx } from 'clsx'

const navItems = [
  { label: 'Audit Results', to: '/app', icon: Gauge, end: true },
  { label: 'Run Audit', to: '/app/audit', icon: Radar },
  { label: 'AI Insights', to: '/app/insights', icon: Sparkles },
  { label: 'Report', to: '/app/report', icon: FileText },
  { label: 'Benchmarks', to: '/app/benchmarks', icon: BarChart3 },
  { label: 'Settings', to: '/app/settings', icon: Settings },
]

export function LogoMark() {
  return (
    <div className="flex items-center gap-3">
      <div className="grid h-11 w-11 place-items-center rounded-2xl bg-fintech-gradient shadow-glow">
        <Layers3 className="h-5 w-5 text-white" />
      </div>
      <div>
        <p className="text-lg font-bold tracking-tight text-[var(--text-main)]">
          Spendlens
        </p>
        <p className="text-xs font-medium text-[var(--text-muted)]">
          AI spend audit OS
        </p>
      </div>
    </div>
  )
}

export function Sidebar({ isOpen, onClose }) {
  return (
    <>
      <button
        aria-label="Close sidebar overlay"
        className={clsx(
          'fixed inset-0 z-30 bg-slate-950/70 backdrop-blur-sm transition lg:hidden',
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0',
        )}
        onClick={onClose}
        type="button"
      />
      <aside
        className={clsx(
          'app-sidebar fixed inset-y-0 left-0 z-40 flex w-72 flex-col px-4 py-5 shadow-soft backdrop-blur-xl transition-transform lg:sticky lg:top-0 lg:z-auto lg:h-screen lg:translate-x-0',
          isOpen ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        <div className="flex items-center justify-between px-2">
          <LogoMark />
          <button
            aria-label="Close sidebar"
            className="rounded-xl p-2 text-[var(--text-muted)] transition hover:bg-[var(--input-bg)] hover:text-[var(--text-main)] lg:hidden"
            onClick={onClose}
            type="button"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="mt-10 space-y-2">
          {navItems.map((item) => (
            <NavLink
              className={({ isActive }) =>
                clsx(
                  'flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition',
                  isActive
                    ? 'bg-primary/15 text-[var(--text-main)] shadow-[inset_0_0_0_1px_rgba(59,130,246,0.28)]'
                    : 'text-[var(--text-muted)] hover:bg-[var(--input-bg)] hover:text-[var(--text-main)]',
                )
              }
              end={item.end}
              key={item.to}
              onClick={onClose}
              to={item.to}
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="finance-card mt-auto p-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-emerald-400 to-cyan-400" />
            <div>
              <p className="text-sm font-semibold text-[var(--text-main)]">
                Audit confidence
              </p>
              <p className="text-xs text-[var(--text-muted)]">87% data quality</p>
            </div>
          </div>
          <div className="mt-4 h-2 rounded-full bg-white/8">
            <div className="h-full w-[87%] rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400" />
          </div>
        </div>
      </aside>
    </>
  )
}
