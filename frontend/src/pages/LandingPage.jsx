import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  BadgeDollarSign,
  Boxes,
  BrainCircuit,
  CheckCircle2,
  Code,
  Handshake,
  Mail,
  Share2,
  Sparkles,
} from 'lucide-react'
import auditData from '../data/audit.json'
import landingData from '../data/landing.json'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { SectionHeader } from '../components/ui/SectionHeader'
import { LogoMark } from '../components/Sidebar'
import { formatCurrency } from '../utils/formatters'

const iconMap = {
  BadgeDollarSign,
  Boxes,
  BrainCircuit,
  Handshake,
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
}

export function LandingPage() {
  return (
    <div className="theme-shell overflow-hidden">
      <header className="sticky top-0 z-30 border-b border-white/10 bg-[#0B1120]/80 backdrop-blur-xl">
        <nav className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-4 sm:px-6 lg:px-8">
          <LogoMark />
          <div className="hidden items-center gap-7 text-sm font-medium text-slate-400 lg:flex">
            <a className="transition hover:text-white" href="#features">
              Platform
            </a>
            <a className="transition hover:text-white" href="#how-it-works">
              How it works
            </a>
            <a className="transition hover:text-white" href="#pricing">
              Pricing
            </a>
            <a className="transition hover:text-white" href="#faq">
              FAQ
            </a>
          </div>
          <div className="flex items-center gap-2">
            <Button className="hidden sm:inline-flex" to="/app/report" variant="ghost">
              View Demo Report
            </Button>
            <Button to="/app/audit">Run Free Audit</Button>
          </div>
        </nav>
      </header>

      <main>
        <section className="relative mx-auto flex min-h-[calc(100vh-80px)] max-w-7xl items-center px-4 py-16 sm:px-6 lg:px-8">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute left-1/2 top-12 h-80 w-80 -translate-x-1/2 rounded-full bg-primary/20 blur-3xl" />
            <div className="absolute bottom-24 right-0 h-96 w-96 rounded-full bg-accent/18 blur-3xl" />
            <HeroDashboardPreview />
          </div>

          <motion.div
            animate="visible"
            className="relative z-10 max-w-4xl pb-28 pt-8 sm:pb-36 lg:pb-44"
            initial="hidden"
            transition={{ staggerChildren: 0.1 }}
          >
            <motion.div
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-400/10 px-4 py-2 text-sm font-semibold text-blue-200"
              variants={fadeUp}
            >
              <Sparkles className="h-4 w-4" />
              AI Infrastructure Cost Optimization
            </motion.div>
            <motion.h1
              className="gradient-text text-5xl font-extrabold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl"
              variants={fadeUp}
            >
              Your Team Is Probably Overspending on AI Tools
            </motion.h1>
            <motion.p
              className="mt-6 max-w-2xl text-lg leading-8 text-slate-300"
              variants={fadeUp}
            >
              Audit your AI stack, reduce unnecessary spend, and discover
              cheaper alternatives in minutes.
            </motion.p>
            <motion.div className="mt-9 flex flex-col gap-3 sm:flex-row" variants={fadeUp}>
              <Button icon={ArrowRight} size="lg" to="/app/audit">
                Run Free Audit
              </Button>
              <Button size="lg" to="/app/report" variant="secondary">
                View Demo Report
              </Button>
            </motion.div>
          </motion.div>
        </section>

        <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-4 backdrop-blur-xl">
            <p className="mb-4 text-center text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
              Built for teams that buy AI like infrastructure
            </p>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
              {landingData.logos.map((logo) => (
                <div
                  className="rounded-2xl border border-white/10 bg-slate-950/35 px-4 py-3 text-center text-sm font-semibold text-slate-300"
                  key={logo}
                >
                  {logo}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8" id="features">
          <SectionHeader
            align="center"
            description="Spendlens turns scattered AI invoices and seat plans into a prioritized cost reduction roadmap."
            eyebrow="Platform"
            title="Audit Your AI Stack Before You Overpay"
          />
          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {landingData.features.map((feature, index) => {
              const Icon = iconMap[feature.icon]
              return (
                <motion.div
                  initial={{ opacity: 0, y: 18 }}
                  key={feature.title}
                  transition={{ delay: index * 0.06 }}
                  viewport={{ once: true, margin: '-80px' }}
                  whileInView={{ opacity: 1, y: 0 }}
                >
                  <Card className="interactive-card h-full">
                    <div className="mb-6 inline-flex rounded-2xl bg-primary/10 p-3 text-primary ring-1 ring-primary/20">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-semibold text-white">{feature.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-slate-400">
                      {feature.description}
                    </p>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8" id="how-it-works">
          <SectionHeader
            description="A focused workflow for founders, CTOs, and engineering managers who need spend clarity fast."
            eyebrow="How it works"
            title="Cut AI Tool Spend in Minutes"
          />
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {landingData.howItWorks.map((step) => (
              <Card className="interactive-card" key={step.step}>
                <p className="text-sm font-semibold text-primary">{step.step}</p>
                <h3 className="mt-5 text-xl font-semibold text-white">{step.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-400">
                  {step.description}
                </p>
              </Card>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8" id="stats">
          <div className="grid gap-4 rounded-[2rem] border border-white/10 bg-white/[0.04] p-4 backdrop-blur-xl sm:grid-cols-2 lg:grid-cols-4">
            {landingData.stats.map((stat) => (
              <Card className="text-center" key={stat.label}>
                <AnimatedStat stat={stat} />
                <p className="mt-2 text-sm font-medium text-slate-400">{stat.label}</p>
              </Card>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <SectionHeader
            description="Startup leaders use Spendlens to align finance discipline with developer velocity."
            eyebrow="Founders"
            title="Built for engineering teams with real AI bills"
          />
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {landingData.testimonials.map((testimonial) => (
              <Card className="interactive-card" key={testimonial.name}>
                <p className="text-lg leading-8 text-slate-200">
                  "{testimonial.quote}"
                </p>
                <div className="mt-8 flex items-center gap-3">
                  <div className="grid h-11 w-11 place-items-center rounded-2xl bg-fintech-gradient text-sm font-bold text-white">
                    {testimonial.name
                      .split(' ')
                      .map((part) => part[0])
                      .join('')}
                  </div>
                  <div>
                    <p className="font-semibold text-white">{testimonial.name}</p>
                    <p className="text-sm text-slate-400">{testimonial.role}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8" id="pricing">
          <SectionHeader
            align="center"
            description="Start with a free audit, then bring in Credex when savings or credit opportunities are meaningful."
            eyebrow="Pricing"
            title="Free audit today, deeper savings when ready"
          />
          <div className="mx-auto mt-12 grid max-w-4xl gap-5 lg:grid-cols-2">
            {landingData.pricing.map((plan) => (
              <Card
                className={
                  plan.featured
                    ? 'interactive-card border-primary/50 bg-primary/10'
                    : 'interactive-card'
                }
                key={plan.name}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-semibold text-white">{plan.name}</h3>
                    <p className="mt-2 text-sm text-slate-400">{plan.description}</p>
                  </div>
                  {plan.featured ? (
                    <span className="rounded-full bg-primary px-3 py-1 text-xs font-semibold text-white">
                      Credex
                    </span>
                  ) : null}
                </div>
                <p className="mt-8 text-4xl font-bold text-white">{plan.price}</p>
                <ul className="mt-6 space-y-3 text-sm text-slate-300">
                  {plan.features.map((feature) => (
                    <li className="flex items-center gap-2" key={feature}>
                      <CheckCircle2 className="h-4 w-4 text-emerald-300" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8" id="faq">
          <SectionHeader eyebrow="FAQ" title="Questions founders ask first" />
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {landingData.faqs.map((faq) => (
              <Card className="interactive-card" key={faq.question}>
                <h3 className="text-lg font-semibold text-white">{faq.question}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-400">{faq.answer}</p>
              </Card>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <LogoMark />
          <div className="flex items-center gap-4 text-slate-400">
            <Code className="h-5 w-5 transition hover:text-white" />
            <Share2 className="h-5 w-5 transition hover:text-white" />
            <Mail className="h-5 w-5 transition hover:text-white" />
          </div>
        </div>
      </footer>
    </div>
  )
}

function HeroDashboardPreview() {
  const { summary, vendorBreakdown } = auditData.auditResults

  return (
    <motion.div
      animate={{ opacity: 1, y: 0, rotate: -2 }}
      className="absolute bottom-6 right-[-7rem] hidden w-[760px] rounded-[2rem] border border-white/10 bg-slate-950/70 p-4 shadow-soft backdrop-blur-xl lg:block"
      initial={{ opacity: 0, y: 32, rotate: 0 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
    >
      <div className="grid gap-3 md:grid-cols-3">
        <PreviewMetric label="Current monthly spend" value={formatCurrency(summary.currentMonthlySpend)} />
        <PreviewMetric label="Monthly savings" value={formatCurrency(summary.potentialMonthlySavings)} tone="green" />
        <PreviewMetric label="Efficiency score" value={`${summary.efficiencyScore}/100`} />
      </div>
      <div className="mt-4 grid gap-4 md:grid-cols-[1.3fr_0.7fr]">
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm font-semibold text-white">Spend trend</p>
            <p className="text-xs text-emerald-300">-$19.7K annual</p>
          </div>
          <div className="flex h-36 items-end gap-2">
            {[44, 52, 61, 69, 76, 82].map((height, index) => (
              <div className="flex flex-1 flex-col items-center gap-2" key={index}>
                <motion.div
                  animate={{ height: `${height}%` }}
                  className="w-full rounded-t-xl bg-gradient-to-t from-primary to-accent"
                  initial={{ height: '18%' }}
                  transition={{ delay: index * 0.06, duration: 0.45 }}
                />
                <div
                  className="w-full rounded-t-xl bg-gradient-to-t from-emerald-500 to-emerald-300"
                  style={{ height: `${Math.max(height - 24, 18)}%` }}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
          <p className="mb-4 text-sm font-semibold text-white">Vendor mix</p>
          <div className="space-y-3">
            {vendorBreakdown.slice(0, 4).map((vendor) => (
              <div key={vendor.name}>
                <div className="mb-1 flex justify-between text-xs">
                  <span className="text-slate-400">{vendor.name}</span>
                  <span className="font-semibold text-white">
                    {formatCurrency(vendor.value)}
                  </span>
                </div>
                <div className="h-2 rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full"
                    style={{
                      backgroundColor: vendor.color,
                      width: `${Math.min((vendor.value / 2190) * 100, 100)}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function PreviewMetric({ label, tone = 'blue', value }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
      <p className="text-xs font-medium text-slate-400">{label}</p>
      <p
        className={`mt-2 text-2xl font-bold ${
          tone === 'green' ? 'text-emerald-300' : 'text-white'
        }`}
      >
        {value}
      </p>
    </div>
  )
}

function AnimatedStat({ stat }) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    let frame = 0
    const totalFrames = 42
    const timer = window.setInterval(() => {
      frame += 1
      setValue((stat.value * frame) / totalFrames)
      if (frame === totalFrames) {
        window.clearInterval(timer)
      }
    }, 22)

    return () => window.clearInterval(timer)
  }, [stat.value])

  const formattedValue = Number.isInteger(stat.value)
    ? Math.round(value)
    : value.toFixed(1)

  return (
    <p className="text-4xl font-bold tracking-tight text-white">
      {stat.suffix === 'M' ? '$' : ''}
      {formattedValue}
      {stat.suffix}
    </p>
  )
}
