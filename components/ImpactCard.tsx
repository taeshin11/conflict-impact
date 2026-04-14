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

const sectorIcons: Record<string, React.ElementType> = {
  hospitals: Building2,
  schools: GraduationCap,
  power: Zap,
  water: Droplets,
  telecom: Wifi,
}

const sectorIconBg: Record<string, string> = {
  hospitals: 'bg-red-50',
  schools: 'bg-blue-50',
  power: 'bg-yellow-50',
  water: 'bg-cyan-50',
  telecom: 'bg-purple-50',
}

const sectorIconColor: Record<string, string> = {
  hospitals: 'text-red-600',
  schools: 'text-blue-600',
  power: 'text-yellow-600',
  water: 'text-cyan-600',
  telecom: 'text-purple-600',
}

const severityTop: Record<string, string> = {
  critical: 'bg-red-500',
  severe: 'bg-orange-500',
  moderate: 'bg-yellow-400',
  limited: 'bg-green-400',
}

const severityBadgeStyle: Record<string, string> = {
  critical: 'bg-red-500/10 text-red-600 ring-1 ring-inset ring-red-500/20',
  severe: 'bg-orange-500/10 text-orange-600 ring-1 ring-inset ring-orange-500/20',
  moderate: 'bg-yellow-500/10 text-yellow-600 ring-1 ring-inset ring-yellow-500/20',
  limited: 'bg-green-500/10 text-green-600 ring-1 ring-inset ring-green-500/20',
}

function SeverityBadge({ severity }: { severity: string }) {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${severityBadgeStyle[severity] ?? 'bg-slate-100 text-slate-600'}`}>
      {severity}
    </span>
  )
}

export default function ImpactCard({ impact }: { impact: Impact }) {
  const Icon = sectorIcons[impact.sector] ?? Building2

  const displayCount = typeof impact.affected_count === 'number' && impact.affected_count > 999999
    ? `${(impact.affected_count / 1000000).toFixed(1)}M`
    : impact.affected_count.toLocaleString()

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden group">
      <div className={`h-1 ${severityTop[impact.severity] ?? 'bg-slate-300'}`}></div>
      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2.5">
            <div className={`p-2 rounded-lg ${sectorIconBg[impact.sector] ?? 'bg-slate-50'}`}>
              <Icon className={`w-4 h-4 ${sectorIconColor[impact.sector] ?? 'text-slate-600'}`} />
            </div>
            <div>
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide">{impact.sector}</div>
              <div className="font-bold text-slate-900">{impact.country}</div>
            </div>
          </div>
          <SeverityBadge severity={impact.severity} />
        </div>
        <p className="text-slate-600 text-sm leading-relaxed mb-4 line-clamp-3">{impact.description}</p>
        <div className="flex items-center justify-between pt-3 border-t border-slate-50">
          <span className="text-lg font-black text-slate-900">{displayCount}</span>
          <span className="text-xs text-slate-500">{impact.affected_unit}</span>
        </div>
        <div className="flex items-center justify-between mt-2">
          <span className="text-xs text-slate-400">{impact.date}</span>
          <a href={impact.source_url} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 hover:text-blue-700 font-medium">
            {impact.source} →
          </a>
        </div>
      </div>
    </div>
  )
}
