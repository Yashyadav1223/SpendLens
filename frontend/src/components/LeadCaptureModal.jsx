import { useState } from 'react'
import { Building2, CheckCircle2, Mail, UserRound, UsersRound, X } from 'lucide-react'
import { captureLead } from '../services/apiClient'
import { Button } from './ui/Button'
import { Input } from './ui/Input'

export function LeadCaptureModal({ onClose, open }) {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    companyName: '',
    email: '',
    role: '',
    teamSize: '',
  })

  if (!open) {
    return null
  }

  function updateField(field, value) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')
    setIsSubmitting(true)

    try {
      await captureLead({
        ...form,
        teamSize: Number(form.teamSize),
      })
      setIsSubmitted(true)
    } catch (captureError) {
      setError(captureError.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/75 px-4 backdrop-blur-md">
      <div className="finance-card w-full max-w-lg p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary">
              Credex consultation
            </p>
            <h2 className="mt-3 text-2xl font-bold text-[var(--text-main)]">
              Unlock discounted AI infrastructure credits
            </h2>
          </div>
          <button
            aria-label="Close modal"
            className="rounded-2xl p-2 text-slate-400 transition hover:bg-white/10 hover:text-white"
            onClick={onClose}
            type="button"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {isSubmitted ? (
          <div className="py-8 text-center">
            <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-emerald-400/10 text-emerald-300">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <h3 className="mt-5 text-xl font-semibold text-[var(--text-main)]">
              Credex will reach out
            </h3>
            <p className="mt-3 text-sm leading-6 text-[var(--text-muted)]">
              Your audit summary is queued for review. A Credex specialist will
              follow up with credit and optimization options.
            </p>
            <Button className="mt-6" onClick={onClose} type="button">
              Done
            </Button>
          </div>
        ) : (
          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            <Input
              icon={Mail}
              label="Email"
              onChange={(event) => updateField('email', event.target.value)}
              placeholder="founder@company.com"
              required
              type="email"
              value={form.email}
            />
            <Input
              icon={Building2}
              label="Company name"
              onChange={(event) => updateField('companyName', event.target.value)}
              placeholder="Acme AI"
              required
              value={form.companyName}
            />
            <Input
              icon={UserRound}
              label="Role"
              onChange={(event) => updateField('role', event.target.value)}
              placeholder="Founder, CTO, Engineering Manager"
              required
              value={form.role}
            />
            <Input
              icon={UsersRound}
              label="Team size"
              min="1"
              onChange={(event) => updateField('teamSize', event.target.value)}
              placeholder="12"
              required
              type="number"
              value={form.teamSize}
            />
            <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-4 text-sm leading-6 text-emerald-100">
              Credex will reach out with AI infrastructure credit options and a
              vendor consolidation plan.
            </div>
            {error ? (
              <p className="rounded-2xl border border-rose-400/20 bg-rose-400/10 p-3 text-sm text-rose-100">
                {error}
              </p>
            ) : null}
            <Button
              className="w-full"
              disabled={isSubmitting}
              size="lg"
              type="submit"
            >
              {isSubmitting ? 'Sending request...' : 'Request Credex Review'}
            </Button>
          </form>
        )}
      </div>
    </div>
  )
}
