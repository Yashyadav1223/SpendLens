import {
  Bell,
  Menu,
  Moon,
  Search,
  SlidersHorizontal,
  Sun,
} from 'lucide-react'
import { Button } from './ui/Button'
import { Input } from './ui/Input'

export function Navbar({ onMenuClick, setTheme, theme }) {
  const isDark = theme === 'dark'

  return (
    <header className="app-navbar sticky top-0 z-20 px-4 py-4 backdrop-blur-xl sm:px-6 lg:px-8">
      <div className="flex items-center gap-3">
        <button
          aria-label="Open sidebar"
          className="rounded-2xl border border-[var(--card-border)] p-3 text-[var(--text-muted)] transition hover:bg-[var(--input-bg)] hover:text-[var(--text-main)] lg:hidden"
          onClick={onMenuClick}
          type="button"
        >
          <Menu className="h-5 w-5" />
        </button>
        <div className="hidden flex-1 md:block">
          <Input
            aria-label="Search"
            icon={Search}
            placeholder="Search vendors, recommendations, reports..."
          />
        </div>
        <div className="ml-auto flex items-center gap-2">
          <Button
            aria-label="Filters"
            size="icon"
            type="button"
            variant="ghost"
          >
            <SlidersHorizontal className="h-5 w-5" />
          </Button>
          <Button
            aria-label="Notifications"
            className="relative"
            size="icon"
            type="button"
            variant="ghost"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute right-3 top-3 h-2 w-2 rounded-full bg-rose-400" />
          </Button>
          <Button
            aria-label="Toggle theme"
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            size="icon"
            type="button"
            variant="ghost"
          >
            {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
          <div className="soft-surface flex items-center gap-3 rounded-2xl px-3 py-2">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-fintech-gradient text-sm font-bold text-white">
              AS
            </div>
            <div className="hidden leading-tight sm:block">
              <p className="text-sm font-semibold text-[var(--text-main)]">
                Alex Smith
              </p>
              <p className="text-xs text-[var(--text-muted)]">Premium</p>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-3 md:hidden">
        <Input
          aria-label="Search"
          icon={Search}
          placeholder="Search AI stack..."
        />
      </div>
    </header>
  )
}
