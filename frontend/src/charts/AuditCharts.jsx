import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { Card } from '../components/ui/Card'
import { formatCurrency } from '../utils/formatters'
import { ChartTooltip } from './ChartTooltip'

export function SpendTrendChart({ data }) {
  return (
    <Card className="h-[390px]">
      <ChartTitle
        description="Actual AI stack spend compared with optimized projection"
        title="Monthly spend trends"
      />
      <ResponsiveContainer height="82%" width="100%">
        <AreaChart data={data} margin={{ bottom: 0, left: -12, right: 8, top: 8 }}>
          <defs>
            <linearGradient id="auditSpend" x1="0" x2="0" y1="0" y2="1">
              <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.42} />
              <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="optimizedSpend" x1="0" x2="0" y1="0" y2="1">
              <stop offset="5%" stopColor="#10B981" stopOpacity={0.32} />
              <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="rgba(148, 163, 184, 0.12)" vertical={false} />
          <XAxis axisLine={false} dataKey="month" tickLine={false} />
          <YAxis axisLine={false} tickLine={false} width={48} />
          <Tooltip content={<ChartTooltip />} />
          <Area
            dataKey="spend"
            fill="url(#auditSpend)"
            name="Current spend"
            stroke="#3B82F6"
            strokeWidth={3}
            type="monotone"
          />
          <Area
            dataKey="optimized"
            fill="url(#optimizedSpend)"
            name="Optimized"
            stroke="#10B981"
            strokeWidth={3}
            type="monotone"
          />
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  )
}

export function VendorBreakdownChart({ data }) {
  const total = data.reduce((sum, item) => sum + item.value, 0)

  return (
    <Card className="h-[390px]">
      <ChartTitle
        description={`${formatCurrency(total)} across vendors this month`}
        title="Vendor spend breakdown"
      />
      <div className="grid h-[295px] gap-4 md:grid-cols-[1fr_0.9fr]">
        <ResponsiveContainer height="100%" width="100%">
          <PieChart>
            <Pie
              cx="50%"
              cy="50%"
              data={data}
              dataKey="value"
              innerRadius="58%"
              outerRadius="84%"
              paddingAngle={5}
            >
              {data.map((item) => (
                <Cell fill={item.color} key={item.name} />
              ))}
            </Pie>
            <Tooltip content={<ChartTooltip />} />
          </PieChart>
        </ResponsiveContainer>
        <div className="flex flex-col justify-center space-y-3">
          {data.map((item) => (
            <div className="flex items-center justify-between gap-3" key={item.name}>
              <span className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                {item.name}
              </span>
              <span className="text-sm font-semibold text-[var(--text-main)]">
                {Math.round((item.value / total) * 100)}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  )
}

export function CategoryOptimizationChart({ data }) {
  return (
    <Card className="h-[390px]">
      <ChartTitle
        description="Current cost compared with the recommended stack"
        title="Spend by category"
      />
      <ResponsiveContainer height="82%" width="100%">
        <BarChart data={data} margin={{ bottom: 0, left: -12, right: 8, top: 8 }}>
          <CartesianGrid stroke="rgba(148, 163, 184, 0.12)" vertical={false} />
          <XAxis axisLine={false} dataKey="category" tickLine={false} />
          <YAxis axisLine={false} tickLine={false} width={48} />
          <Tooltip content={<ChartTooltip />} />
          <Bar dataKey="current" fill="#8B5CF6" name="Current" radius={[8, 8, 4, 4]} />
          <Bar dataKey="optimized" fill="#10B981" name="Optimized" radius={[8, 8, 4, 4]} />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  )
}

export function SavingsForecastChart({ data }) {
  return (
    <Card className="h-[330px]">
      <ChartTitle
        description="Projected realized savings after recommendations"
        title="Annual savings projection"
      />
      <ResponsiveContainer height="78%" width="100%">
        <AreaChart data={data} margin={{ bottom: 0, left: -12, right: 8, top: 8 }}>
          <defs>
            <linearGradient id="savingsProjection" x1="0" x2="0" y1="0" y2="1">
              <stop offset="5%" stopColor="#10B981" stopOpacity={0.42} />
              <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="rgba(148, 163, 184, 0.12)" vertical={false} />
          <XAxis axisLine={false} dataKey="month" tickLine={false} />
          <YAxis axisLine={false} tickLine={false} width={48} />
          <Tooltip content={<ChartTooltip />} />
          <Area
            dataKey="savings"
            fill="url(#savingsProjection)"
            name="Cumulative savings"
            stroke="#10B981"
            strokeWidth={3}
            type="monotone"
          />
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  )
}

export function EfficiencyGraphChart({ data }) {
  return (
    <Card className="h-[330px]">
      <ChartTitle
        description="Improvement path after seat and model routing changes"
        title="Spend efficiency graph"
      />
      <ResponsiveContainer height="78%" width="100%">
        <LineChart data={data} margin={{ bottom: 0, left: -18, right: 8, top: 8 }}>
          <CartesianGrid stroke="rgba(148, 163, 184, 0.12)" vertical={false} />
          <XAxis axisLine={false} dataKey="week" tickLine={false} />
          <YAxis axisLine={false} domain={[40, 100]} tickLine={false} width={42} />
          <Tooltip content={<ChartTooltip />} />
          <Line
            activeDot={{ r: 6 }}
            dataKey="score"
            dot={false}
            name="Efficiency score"
            stroke="#3B82F6"
            strokeWidth={3}
            type="monotone"
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  )
}

export function ToolComparisonChart({ data }) {
  return (
    <Card className="h-[390px]">
      <ChartTitle
        description="Monthly seat cost compared with Spendlens benchmark"
        title="AI tool comparison"
      />
      <ResponsiveContainer height="82%" width="100%">
        <BarChart data={data} margin={{ bottom: 0, left: -16, right: 8, top: 8 }}>
          <CartesianGrid stroke="rgba(148, 163, 184, 0.12)" vertical={false} />
          <XAxis axisLine={false} dataKey="tool" tickLine={false} />
          <YAxis axisLine={false} tickLine={false} width={42} />
          <Tooltip content={<ChartTooltip />} />
          <Bar dataKey="current" fill="#F59E0B" name="Current" radius={[8, 8, 4, 4]} />
          <Bar dataKey="benchmark" fill="#3B82F6" name="Benchmark" radius={[8, 8, 4, 4]} />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  )
}

function ChartTitle({ description, title }) {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold text-[var(--text-main)]">{title}</h3>
      <p className="text-sm text-[var(--text-muted)]">{description}</p>
    </div>
  )
}
