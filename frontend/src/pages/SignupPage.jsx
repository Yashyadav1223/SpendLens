import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Lock, Mail, UserRound } from 'lucide-react'
import { LogoMark } from '../components/Sidebar'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'

export function SignupPage() {
  const [password, setPassword] = useState('')
  const strength = useMemo(() => getPasswordStrength(password), [password])

  return (
    <div className="theme-shell relative grid min-h-screen place-items-center overflow-hidden px-4 py-10">
      <motion.div
        animate={{ opacity: 0.7, rotate: 12 }}
        className="absolute left-8 top-20 h-28 w-28 rounded-[2rem] border border-primary/30 bg-primary/10 blur-[1px]"
        initial={{ opacity: 0, rotate: 0 }}
        transition={{ duration: 1.2 }}
      />
      <motion.div
        animate={{ opacity: 0.7, rotate: -10 }}
        className="absolute bottom-24 right-8 h-36 w-36 rounded-[2rem] border border-accent/30 bg-accent/10 blur-[1px]"
        initial={{ opacity: 0, rotate: 0 }}
        transition={{ duration: 1.2 }}
      />
      <div className="absolute inset-x-0 top-0 h-72 bg-gradient-to-b from-primary/20 to-transparent" />

      <motion.div
        animate={{ opacity: 1, y: 0 }}
        className="finance-card relative w-full max-w-md p-6 sm:p-8"
        initial={{ opacity: 0, y: 18 }}
        transition={{ duration: 0.36 }}
      >
        <LogoMark />
        <div className="mb-8 mt-8">
          <h1 className="text-3xl font-bold tracking-tight text-white">
            Create your audit workspace
          </h1>
          <p className="mt-3 text-sm leading-6 text-slate-400">
            Set up a company workspace for AI infrastructure spend reviews.
          </p>
        </div>
        <form className="space-y-5">
          <Input
            autoComplete="name"
            icon={UserRound}
            label="Full Name"
            placeholder="Alex Smith"
            type="text"
          />
          <Input
            autoComplete="email"
            icon={Mail}
            label="Email"
            placeholder="alex@spendlens.app"
            type="email"
          />
          <div>
            <Input
              autoComplete="new-password"
              icon={Lock}
              label="Password"
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Create a secure password"
              type="password"
              value={password}
            />
            <div className="mt-3">
              <div className="h-2 rounded-full bg-white/10">
                <div
                  className={`h-full rounded-full ${strength.color}`}
                  style={{ width: `${strength.score}%` }}
                />
              </div>
              <p className="mt-2 text-xs font-medium text-slate-400">
                Password strength: {strength.label}
              </p>
            </div>
          </div>
          <Input
            autoComplete="new-password"
            icon={Lock}
            label="Confirm Password"
            placeholder="Repeat password"
            type="password"
          />
          <Button className="w-full" size="lg" type="button">
            Signup
          </Button>
          <p className="text-center text-sm text-slate-400">
            Already have an account?{' '}
            <Link className="font-semibold text-primary hover:text-blue-300" to="/login">
              Login
            </Link>
          </p>
        </form>
      </motion.div>
    </div>
  )
}

function getPasswordStrength(password) {
  const checks = [
    password.length >= 8,
    /[A-Z]/.test(password),
    /[0-9]/.test(password),
    /[^A-Za-z0-9]/.test(password),
  ].filter(Boolean).length

  if (!password) {
    return { color: 'bg-slate-600', label: 'Waiting', score: 10 }
  }

  if (checks <= 1) {
    return { color: 'bg-rose-400', label: 'Weak', score: 32 }
  }

  if (checks <= 3) {
    return { color: 'bg-amber-400', label: 'Good', score: 68 }
  }

  return { color: 'bg-emerald-400', label: 'Strong', score: 100 }
}
