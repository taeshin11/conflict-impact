import { Building2, GraduationCap, Zap, Droplets, Wifi } from 'lucide-react'

interface Impact {
  id: string
  country: string
  country_slug: string
  conflict: string
  sector: string
  status: string
  affected_count: number
  affected_unit: string
  description: string
  source: string
  source_url: string
  date: string
  severity: string
  trend: string
}

const sectorIcons: Record<string, React.ReactNode> = {
  hospitals: <Building2 className="w-5 h-5" />,
  schools: <GraduationCap className="w-5 h-5" />,
  power: <Zap className="w-5 h-5" />,
  water: <Droplets className="w-5 h-5" />,
  telecom: <Wifi className="w-5 h-5" />,
}

const sectorColors: Record<string, string> = {
  hospitals: 'text-red-600 bg-red-50',
  schools: 'text-blue-600 bg-blue-50',
  power: 'text-yellow-600 bg-yellow-50',
  water: 'text-cyan-600 bg-cyan-50',
  telecom: 'text-purple-600 bg-purple-50',
}

const severityBadge: Record<string, string> = {
  critical: 'bg-red-50 text-red-700 border-red-200',
  severe: 'bg-orange-50 text-orange-700 border-orange-200',
  moderate: 'bg-yellow-50 text-yellow-700 border-yellow-200',
  limited: 'bg-green-50 text-green-700 border-green-200',
}

const trendSymbol: Record<string, string> = {
  worsening: '↑',
  stable: '→',
  improving: '↓',
}

export default function ImpactCard({ impact }: { impact: Impact }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start gap-3 mb-3">
        <div className={`p-2 rounded-lg ${sectorColors[impact.sector] ?? 'text-gray-600 bg-gray-50'}`}>
          {sectorIcons[impact.sector] ?? <Building2 className="w-5 h-5" />}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm font-semibold text-gray-700 capitalize">{impact.sector}</span>
            <span className={`text-xs px-2 py-0.5 rounded-full font-medium border ${severityBadge[impact.severity] ?? ''}`}>
              {impact.severity}
            </span>
            <span className="text-xs text-gray-400">{trendSymbol[impact.trend] ?? '?'}</span>
          </div>
          <p className="text-xs text-gray-500 mt-0.5">{impact.country} · {impact.conflict}</p>
        </div>
      </div>

      <div className="mb-2">
        <span className="text-xl font-bold text-gray-900">
          {typeof impact.affected_count === 'number' && impact.affected_count > 999999
            ? `${(impact.affected_count / 1000000).toFixed(1)}M`
            : impact.affected_count.toLocaleString()}
        </span>
        <span className="text-sm text-gray-500 ml-1">{impact.affected_unit}</span>
      </div>

      <p className="text-sm text-gray-600 line-clamp-3 mb-3">{impact.description}</p>

      <div className="flex items-center justify-between text-xs text-gray-400">
        <span>{impact.date}</span>
        <a href={impact.source_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
          {impact.source}
        </a>
      </div>
    </div>
  )
}
