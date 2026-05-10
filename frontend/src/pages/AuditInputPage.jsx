import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AlertCircle, ArrowRight, CheckCircle2, ChevronLeft, Cpu, WalletCards } from 'lucide-react'
import auditData from '../data/audit.json'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { Input } from '../components/ui/Input'
import { SectionHeader } from '../components/ui/SectionHeader'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { formatCurrency } from '../utils/formatters'

const steps = ['AI stack', 'Team usage', 'Review']
const useCases = ['Coding', 'Writing', 'Research', 'Data Analysis', 'Mixed']
const painPointOptions = [
  'Unused seats',
  'API bill volatility',
  'Too many overlapping AI coding tools',
  'No vendor credits',
  'Unclear team adoption',
  'Finance needs proof before renewal',
]

export function AuditInputPage() {
  const navigate = useNavigate()
  const [step, setStep] = useState(0)
  const [form, setForm] = useLocalStorage(
    'spendlens-audit-input',
    auditData.defaultAuditInput,
  )

  const selectedTools = useMemo(
    () => form.tools.filter((tool) => tool.selected),
    [form.tools],
  )
  const monthlySpend = selectedTools.reduce(
    (sum, tool) => sum + Number(tool.monthlySpend || 0),
    0,
  )
  const selectedSeats = selectedTools.reduce(
    (sum, tool) => sum + Number(tool.seats || 0),
    0,
  )

  const canContinue =
    step === 0
      ? selectedTools.length > 0
      : step === 1
        ? Number(form.teamSize) > 0 && Number(form.monthlyBudget) > 0
        : true

  function updateTool(id, patch) {
    setForm((current) => ({
      ...current,
      tools: current.tools.map((tool) =>
        tool.id === id ? { ...tool, ...patch } : tool,
      ),
    }))
  }

  function togglePainPoint(point) {
    setForm((current) => {
      const exists = current.painPoints.includes(point)
      return {
        ...current,
        painPoints: exists
          ? current.painPoints.filter((item) => item !== point)
          : [...current.painPoints, point],
      }
    })
  }

  return (
    <div className="space-y-6">
      <SectionHeader
        description="Enter your AI tooling, seats, usage patterns, and budget pressure to generate a startup-grade spend audit."
        eyebrow="Free Audit"
        title="AI spend input form"
      />

      <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
        <div className="space-y-6">
          <Card>
            <div className="flex gap-3 overflow-x-auto pb-1">
              {steps.map((item, index) => (
                <button
                  className={`flex min-w-40 items-center gap-3 rounded-2xl border px-4 py-3 text-left transition ${
                    index === step
                      ? 'border-primary/50 bg-primary/15 text-white'
                      : index < step
                        ? 'border-emerald-400/30 bg-emerald-400/10 text-emerald-200'
                        : 'border-white/10 bg-white/[0.04] text-slate-400'
                  }`}
                  key={item}
                  onClick={() => setStep(index)}
                  type="button"
                >
                  <span className="grid h-8 w-8 place-items-center rounded-xl bg-white/10 text-sm font-bold">
                    {index < step ? <CheckCircle2 className="h-4 w-4" /> : index + 1}
                  </span>
                  <span className="text-sm font-semibold">{item}</span>
                </button>
              ))}
            </div>
          </Card>

          {step === 0 ? (
            <Card>
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-[var(--text-main)]">
                  Select AI tools and monthly costs
                </h3>
                <p className="mt-2 text-sm text-[var(--text-muted)]">
                  Supported tools include Cursor, Copilot, ChatGPT, Claude,
                  Anthropic API, OpenAI API, Gemini, Windsurf, and v0.
                </p>
              </div>
              <div className="grid gap-4 lg:grid-cols-2">
                {auditData.supportedTools.map((toolMeta) => {
                  const tool = form.tools.find((item) => item.id === toolMeta.id)
                  return (
                    <article
                      className={`rounded-2xl border p-4 transition ${
                        tool.selected
                          ? 'border-primary/40 bg-primary/10'
                          : 'border-white/10 bg-white/[0.04]'
                      }`}
                      key={toolMeta.id}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h4 className="font-semibold text-[var(--text-main)]">
                            {toolMeta.name}
                          </h4>
                          <p className="text-sm text-[var(--text-muted)]">
                            {toolMeta.vendor} · {toolMeta.category}
                          </p>
                        </div>
                        <label className="inline-flex cursor-pointer items-center gap-2 text-sm text-slate-300">
                          <input
                            checked={tool.selected}
                            className="h-4 w-4 rounded border-white/20 bg-slate-950 text-primary"
                            onChange={(event) =>
                              updateTool(toolMeta.id, {
                                selected: event.target.checked,
                                monthlySpend: event.target.checked
                                  ? tool.monthlySpend || toolMeta.benchmarkPrice
                                  : 0,
                              })
                            }
                            type="checkbox"
                          />
                          Active
                        </label>
                      </div>

                      <div className="mt-4 grid gap-3 sm:grid-cols-2">
                        <Select
                          disabled={!tool.selected}
                          onChange={(event) =>
                            updateTool(toolMeta.id, { plan: event.target.value })
                          }
                          value={tool.plan}
                        >
                          {toolMeta.plans.map((plan) => (
                            <option key={plan}>{plan}</option>
                          ))}
                        </Select>
                        <Select
                          disabled={!tool.selected}
                          onChange={(event) =>
                            updateTool(toolMeta.id, { usageType: event.target.value })
                          }
                          value={tool.usageType}
                        >
                          {toolMeta.usageTypes.map((usage) => (
                            <option key={usage}>{usage}</option>
                          ))}
                        </Select>
                        <Input
                          disabled={!tool.selected}
                          icon={WalletCards}
                          min="0"
                          onChange={(event) =>
                            updateTool(toolMeta.id, {
                              monthlySpend: Number(event.target.value),
                            })
                          }
                          placeholder="Monthly spend"
                          type="number"
                          value={tool.monthlySpend}
                        />
                        <Input
                          disabled={!tool.selected}
                          icon={Cpu}
                          min="0"
                          onChange={(event) =>
                            updateTool(toolMeta.id, {
                              seats: Number(event.target.value),
                            })
                          }
                          placeholder="Seats"
                          type="number"
                          value={tool.seats}
                        />
                      </div>
                    </article>
                  )
                })}
              </div>
            </Card>
          ) : null}

          {step === 1 ? (
            <Card>
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-[var(--text-main)]">
                  Team context and pressure points
                </h3>
                <p className="mt-2 text-sm text-[var(--text-muted)]">
                  This calibrates recommendations for engineering team size,
                  budget, and real workflow needs.
                </p>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <Input
                  label="Team size"
                  min="1"
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      teamSize: Number(event.target.value),
                    }))
                  }
                  type="number"
                  value={form.teamSize}
                />
                <Input
                  label="Monthly AI budget"
                  min="0"
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      monthlyBudget: Number(event.target.value),
                    }))
                  }
                  type="number"
                  value={form.monthlyBudget}
                />
                <label className="block md:col-span-2">
                  <span className="mb-2 block text-sm font-medium text-slate-300">
                    Primary use case
                  </span>
                  <select
                    className="app-input h-12 w-full px-4 text-sm"
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        primaryUseCase: event.target.value,
                      }))
                    }
                    value={form.primaryUseCase}
                  >
                    {useCases.map((useCase) => (
                      <option key={useCase}>{useCase}</option>
                    ))}
                  </select>
                </label>
              </div>

              <div className="mt-6">
                <p className="mb-3 text-sm font-medium text-slate-300">
                  Current pain points
                </p>
                <div className="grid gap-3 md:grid-cols-2">
                  {painPointOptions.map((point) => {
                    const selected = form.painPoints.includes(point)
                    return (
                      <button
                        className={`rounded-2xl border p-4 text-left text-sm font-medium transition ${
                          selected
                            ? 'border-primary/40 bg-primary/10 text-white'
                            : 'border-white/10 bg-white/[0.04] text-slate-400 hover:text-white'
                        }`}
                        key={point}
                        onClick={() => togglePainPoint(point)}
                        type="button"
                      >
                        {point}
                      </button>
                    )
                  })}
                </div>
              </div>
            </Card>
          ) : null}

          {step === 2 ? (
            <Card>
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-[var(--text-main)]">
                  Audit-ready summary
                </h3>
                <p className="mt-2 text-sm text-[var(--text-muted)]">
                  Review the inputs saved in localStorage, then generate the
                  demo audit result.
                </p>
              </div>
              <div className="grid gap-4 md:grid-cols-3">
                <ReviewMetric label="Active AI tools" value={selectedTools.length} />
                <ReviewMetric label="Monthly AI spend" value={formatCurrency(monthlySpend)} />
                <ReviewMetric label="Spend per employee" value={formatCurrency(monthlySpend / Math.max(Number(form.teamSize), 1))} />
              </div>
              <div className="mt-6 rounded-2xl border border-orange-400/20 bg-orange-400/10 p-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="mt-0.5 h-5 w-5 text-orange-300" />
                  <p className="text-sm leading-6 text-orange-100">
                    Based on the demo benchmark, stacks over{' '}
                    {formatCurrency(5000)} per month are flagged for Credex
                    credit routing and vendor consolidation.
                  </p>
                </div>
              </div>
            </Card>
          ) : null}

          <div className="flex flex-col gap-3 sm:flex-row sm:justify-between">
            <Button
              disabled={step === 0}
              icon={ChevronLeft}
              onClick={() => setStep((current) => Math.max(current - 1, 0))}
              type="button"
              variant="subtle"
            >
              Back
            </Button>
            {step < steps.length - 1 ? (
              <Button
                disabled={!canContinue}
                icon={ArrowRight}
                onClick={() => setStep((current) => Math.min(current + 1, steps.length - 1))}
                type="button"
              >
                Continue
              </Button>
            ) : (
              <Button icon={ArrowRight} onClick={() => navigate('/app')} type="button">
                Generate Audit Results
              </Button>
            )}
          </div>
        </div>

        <Card className="h-fit xl:sticky xl:top-24">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary">
            Dynamic summary
          </p>
          <div className="mt-6 space-y-4">
            <SummaryRow label="Monthly AI spend" value={formatCurrency(monthlySpend)} />
            <SummaryRow label="Monthly budget" value={formatCurrency(form.monthlyBudget)} />
            <SummaryRow label="Active tools" value={selectedTools.length} />
            <SummaryRow label="Seat allocations" value={selectedSeats} />
            <SummaryRow
              label="Budget variance"
              value={formatCurrency(monthlySpend - Number(form.monthlyBudget || 0))}
              tone={monthlySpend > Number(form.monthlyBudget || 0) ? 'warning' : 'success'}
            />
          </div>
          <div className="mt-6 rounded-2xl border border-primary/20 bg-primary/10 p-4">
            <p className="text-sm font-semibold text-white">Estimated savings range</p>
            <p className="mt-2 text-3xl font-bold text-emerald-300">
              {formatCurrency(Math.round(monthlySpend * 0.18))}-
              {formatCurrency(Math.round(monthlySpend * 0.31))}
            </p>
            <p className="mt-2 text-xs leading-5 text-slate-400">
              Based on duplicate seats, retail API routing, and plan mismatch
              heuristics.
            </p>
          </div>
        </Card>
      </div>
    </div>
  )
}

function Select({ children, ...props }) {
  return (
    <select className="app-input h-12 w-full px-4 text-sm disabled:opacity-40" {...props}>
      {children}
    </select>
  )
}

function ReviewMetric({ label, value }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
      <p className="text-sm text-[var(--text-muted)]">{label}</p>
      <p className="mt-2 text-2xl font-bold text-[var(--text-main)]">{value}</p>
    </div>
  )
}

function SummaryRow({ label, tone, value }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3">
      <span className="text-sm text-[var(--text-muted)]">{label}</span>
      <span
        className={`text-sm font-semibold ${
          tone === 'warning'
            ? 'text-orange-300'
            : tone === 'success'
              ? 'text-emerald-300'
              : 'text-[var(--text-main)]'
        }`}
      >
        {value}
      </span>
    </div>
  )
}
