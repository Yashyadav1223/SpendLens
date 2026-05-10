import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Lock, Mail } from 'lucide-react'
import { LogoMark } from '../components/Sidebar'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'

export function LoginPage() {
  return (
    <AuthShell
      subtitle="Welcome back. Sign in to review AI stack audits, saved reports, and Credex credit opportunities."
      title="Log in to Spendlens"
    >
      <form className="space-y-5">
        <Input
          autoComplete="email"
          icon={Mail}
          label="Email"
          placeholder="alex@spendlens.app"
          type="email"
        />
        <Input
          autoComplete="current-password"
          icon={Lock}
          label="Password"
          placeholder="Enter your password"
          type="password"
        />
        <div className="flex items-center justify-between gap-4 text-sm">
          <label className="flex items-center gap-2 text-slate-400">
            <input
              className="h-4 w-4 rounded border-white/20 bg-slate-950 text-primary"
              type="checkbox"
            />
            Remember me
          </label>
          <a className="font-semibold text-primary hover:text-blue-300" href="#reset">
            Forgot Password?
          </a>
        </div>
        <Button className="w-full" size="lg" type="button">
          Login
        </Button>
        <Button className="w-full" size="lg" type="button" variant="secondary">
          <span className="grid h-5 w-5 place-items-center rounded-full bg-white text-xs font-bold text-slate-950">
            G
          </span>
          Continue with Google
        </Button>
        <p className="text-center text-sm text-slate-400">
          New here?{' '}
          <Link className="font-semibold text-primary hover:text-blue-300" to="/signup">
            Create an audit workspace
          </Link>
        </p>
      </form>
    </AuthShell>
  )
}

function AuthShell({ children, subtitle, title }) {
  return (
    <div className="theme-shell relative grid min-h-screen place-items-center overflow-hidden px-4 py-10">
      <div className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/25 blur-3xl" />
      <div className="absolute bottom-10 right-10 h-80 w-80 rounded-full bg-accent/20 blur-3xl" />
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        className="finance-card relative w-full max-w-md p-6 sm:p-8"
        initial={{ opacity: 0, y: 18 }}
        transition={{ duration: 0.36 }}
      >
        <LogoMark />
        <div className="mb-8 mt-8">
          <h1 className="text-3xl font-bold tracking-tight text-white">{title}</h1>
          <p className="mt-3 text-sm leading-6 text-slate-400">{subtitle}</p>
        </div>
        {children}
      </motion.div>
    </div>
  )
}
