import auditData from '../data/audit.json'
import { ToolComparisonChart } from '../charts/AuditCharts'
import { PricingComparisonCard } from '../components/PricingComparisonCard'
import { SectionHeader } from '../components/ui/SectionHeader'

export function BenchmarksPage() {
  return (
    <div className="space-y-6">
      <SectionHeader
        description="Reference pricing assumptions and category benchmarks used by the demo audit engine."
        eyebrow="Benchmarks"
        title="AI tool pricing comparison"
      />

      <ToolComparisonChart data={auditData.auditResults.toolComparison} />

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {auditData.supportedTools.map((tool) => (
          <PricingComparisonCard key={tool.id} tool={tool} />
        ))}
      </div>
    </div>
  )
}
