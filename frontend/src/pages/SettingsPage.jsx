import { Bell, Download, Moon, Save, ShieldCheck, UsersRound } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { SectionHeader } from '../components/ui/SectionHeader'

const preferences = [
  {
    title: 'Notification settings',
    description: 'Send alerts for spend spikes, unused seats, and renewal risk.',
    icon: Bell,
    enabled: true,
  },
  {
    title: 'Team preferences',
    description: 'Default audits to engineering-team benchmarks and seat utilization checks.',
    icon: UsersRound,
    enabled: true,
  },
  {
    title: 'Export settings',
    description: 'Include vendor comparison charts and Credex consultation banners in reports.',
    icon: Download,
    enabled: true,
  },
  {
    title: 'Security posture',
    description: 'Mask vendor keys and separate billing data from shareable public summaries.',
    icon: ShieldCheck,
    enabled: true,
  },
]

export function SettingsPage() {
  return (
    <div className="space-y-6">
      <SectionHeader
        description="Configure audit preferences, saved reports, notifications, exports, and workspace appearance."
        eyebrow="Settings"
        title="Audit workspace preferences"
      />

      <div className="grid gap-5 lg:grid-cols-2">
        {preferences.map((item) => (
          <Card className="interactive-card" key={item.title}>
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-4">
                <span className="rounded-2xl bg-primary/10 p-3 text-primary ring-1 ring-primary/20">
                  <item.icon className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="text-lg font-semibold text-[var(--text-main)]">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--text-muted)]">
                    {item.description}
                  </p>
                </div>
              </div>
              <button
                aria-label={`Toggle ${item.title}`}
                className={`relative h-7 w-12 rounded-full transition ${
                  item.enabled ? 'bg-primary' : 'bg-white/10'
                }`}
                type="button"
              >
                <span
                  className={`absolute top-1 h-5 w-5 rounded-full bg-white transition ${
                    item.enabled ? 'left-6' : 'left-1'
                  }`}
                />
              </button>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <Card>
          <div className="mb-5 flex items-center gap-3">
            <span className="rounded-2xl bg-accent/10 p-3 text-accent ring-1 ring-accent/20">
              <Moon className="h-5 w-5" />
            </span>
            <div>
              <h3 className="text-lg font-semibold text-[var(--text-main)]">
                Theme
              </h3>
              <p className="text-sm text-[var(--text-muted)]">
                Dark mode is default for Spendlens dashboards.
              </p>
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <button className="rounded-2xl border border-primary/40 bg-primary/10 p-4 text-left font-semibold text-white" type="button">
              Dark
            </button>
            <button className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-left font-semibold text-slate-400" type="button">
              Light
            </button>
          </div>
        </Card>

        <Card>
          <div className="mb-5 flex items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold text-[var(--text-main)]">
                Saved audits
              </h3>
              <p className="text-sm text-[var(--text-muted)]">
                Demo audit history for product completeness.
              </p>
            </div>
            <Button icon={Save} type="button" variant="secondary">
              Save current
            </Button>
          </div>
          <div className="space-y-3">
            {['Seed-stage SaaS audit', 'API-heavy research team', 'Engineering tools renewal'].map(
              (audit, index) => (
                <div
                  className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.04] p-4"
                  key={audit}
                >
                  <div>
                    <p className="font-semibold text-[var(--text-main)]">{audit}</p>
                    <p className="mt-1 text-sm text-[var(--text-muted)]">
                      Updated {index + 2} days ago
                    </p>
                  </div>
                  <span className="text-sm font-semibold text-emerald-300">
                    {['$19.7K', '$42.4K', '$8.9K'][index]}
                  </span>
                </div>
              ),
            )}
          </div>
        </Card>
      </div>
    </div>
  )
}
