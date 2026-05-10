import { useState } from 'react'
import { Copy, Download, ExternalLink, Link2, Share2 } from 'lucide-react'
import auditData from '../data/audit.json'
import { VendorBreakdownChart } from '../charts/AuditCharts'
import { LeadCaptureModal } from '../components/LeadCaptureModal'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { SectionHeader } from '../components/ui/SectionHeader'
import { formatCurrency } from '../utils/formatters'

export function ShareableReportPage({ embedded = false }) {
  const [leadOpen, setLeadOpen] = useState(false)
  const { auditResults } = auditData
  const { summary } = auditResults
  const reportUrl = 'https://spendlens.ai/r/credex-demo-audit'

  const content = (
    <div className="space-y-6">
      <SectionHeader
        action={
          <Button icon={ExternalLink} to="/app/audit" type="button">
            Run your own audit
          </Button>
        }
        description="A public, screenshot-friendly audit summary for founders, CTOs, finance teams, and vendor conversations."
        eyebrow="Shareable Report"
        title="Credex demo AI spend audit"
      />

      <Card className="overflow-hidden">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary">
              Public report URL
            </p>
            <div className="mt-4 flex flex-col gap-3 rounded-2xl border border-white/10 bg-slate-950/35 p-3 sm:flex-row sm:items-center sm:justify-between">
              <span className="truncate text-sm text-slate-300">{reportUrl}</span>
              <Button icon={Copy} type="button" variant="secondary">
                Copy
              </Button>
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <Snapshot label="Monthly spend" value={formatCurrency(summary.currentMonthlySpend)} />
              <Snapshot label="Monthly savings" value={formatCurrency(summary.potentialMonthlySavings)} tone="green" />
              <Snapshot label="Annual savings" value={formatCurrency(summary.potentialAnnualSavings)} tone="green" />
            </div>
          </div>

          <div className="rounded-[1.5rem] border border-white/10 bg-gradient-to-br from-primary/20 via-slate-950 to-accent/20 p-5">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-blue-200">
              Open Graph Preview
            </p>
            <h3 className="mt-8 text-3xl font-bold leading-tight text-white">
              This startup can save {formatCurrency(summary.potentialAnnualSavings)}
              /year on AI tools.
            </h3>
            <p className="mt-4 text-sm leading-6 text-slate-300">
              Spendlens audit found duplicate seats, API routing opportunities,
              and Credex credit potential.
            </p>
            <div className="mt-8 flex items-center gap-3">
              <div className="grid h-11 w-11 place-items-center rounded-2xl bg-fintech-gradient font-bold text-white">
                S
              </div>
              <div>
                <p className="font-semibold text-white">Spendlens</p>
                <p className="text-sm text-slate-400">AI spend audit report</p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <VendorBreakdownChart data={auditResults.vendorBreakdown} />
        <Card>
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-[var(--text-main)]">
              Tool comparison breakdown
            </h3>
            <p className="text-sm text-[var(--text-muted)]">
              The strongest recommendations are listed first.
            </p>
          </div>
          <div className="space-y-3">
            {auditResults.breakdown.slice(0, 5).map((row) => (
              <div
                className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4 sm:flex-row sm:items-center sm:justify-between"
                key={row.tool}
              >
                <div>
                  <p className="font-semibold text-[var(--text-main)]">{row.tool}</p>
                  <p className="mt-1 text-sm text-[var(--text-muted)]">
                    {row.recommendedAction}
                  </p>
                </div>
                <span className="font-semibold text-emerald-300">
                  {formatCurrency(row.annualSavings)}/yr
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card className="border-primary/30 bg-primary/10">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h3 className="text-2xl font-bold text-white">
              Want this report for your AI stack?
            </h3>
            <p className="mt-2 text-sm leading-6 text-blue-100/80">
              Run your own audit or ask Credex to review discount and credit
              opportunities.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button icon={Link2} to="/app/audit" variant="secondary">
              Run Free Audit
            </Button>
            <Button icon={Share2} onClick={() => setLeadOpen(true)} type="button">
              Contact Credex
            </Button>
          </div>
        </div>
      </Card>

      <div className="flex flex-wrap gap-3">
        <Button icon={Share2} type="button" variant="secondary">
          Share
        </Button>
        <Button icon={Download} type="button" variant="secondary">
          Export PDF
        </Button>
      </div>

      <LeadCaptureModal onClose={() => setLeadOpen(false)} open={leadOpen} />
    </div>
  )

  if (embedded) {
    return content
  }

  return (
    <div className="theme-shell min-h-screen px-4 py-6 sm:px-6 lg:px-8">
      {content}
    </div>
  )
}

function Snapshot({ label, tone, value }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
      <p className="text-xs text-[var(--text-muted)]">{label}</p>
      <p className={`mt-2 text-xl font-bold ${tone === 'green' ? 'text-emerald-300' : 'text-white'}`}>
        {value}
      </p>
    </div>
  )
}
