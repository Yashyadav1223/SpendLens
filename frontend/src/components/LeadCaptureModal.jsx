import { useState } from 'react'
import { Building2, CheckCircle2, Mail, UserRound, UsersRound, X } from 'lucide-react'
import { Button } from './ui/Button'
import { Input } from './ui/Input'

export function LeadCaptureModal({ onClose, open }) {
  const [isSubmitted, setIsSubmitted] = useState(false)

  if (!open) {
    return null
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
          <form className="mt-6 space-y-4">
            <Input icon={Mail} label="Email" placeholder="founder@company.com" type="email" />
            <Input icon={Building2} label="Company name" placeholder="Acme AI" />
            <Input icon={UserRound} label="Role" placeholder="Founder, CTO, Engineering Manager" />
            <Input icon={UsersRound} label="Team size" placeholder="12" type="number" />
            <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-4 text-sm leading-6 text-emerald-100">
              Credex will reach out with AI infrastructure credit options and a
              vendor consolidation plan.
            </div>
            <Button
              className="w-full"
              onClick={() => setIsSubmitted(true)}
              size="lg"
              type="button"
            >
              Request Credex Review
            </Button>
          </form>
        )}
      </div>
    </div>
  )
}
