'use client'
import { useState } from 'react'
import ImpactCard from './ImpactCard'

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

const SECTORS = ['all', 'hospitals', 'schools', 'power', 'water', 'telecom']

export default function ImpactFilter({ impacts }: { impacts: Impact[] }) {
  const [sector, setSector] = useState('all')
  const [country, setCountry] = useState('all')

  const countries = ['all', ...new Set(impacts.map(i => i.country))]

  const filtered = impacts.filter(i => {
    if (sector !== 'all' && i.sector !== sector) return false
    if (country !== 'all' && i.country !== country) return false
    return true
  })

  return (
    <>
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <select
          value={sector}
          onChange={e => setSector(e.target.value)}
          className="px-3 py-2 bg-white border border-slate-200 rounded-xl text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-orange-500/40 focus:border-orange-500 shadow-sm"
        >
          {SECTORS.map(s => (
            <option key={s} value={s}>{s === 'all' ? 'All Sectors' : s.charAt(0).toUpperCase() + s.slice(1)}</option>
          ))}
        </select>
        <select
          value={country}
          onChange={e => setCountry(e.target.value)}
          className="px-3 py-2 bg-white border border-slate-200 rounded-xl text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-orange-500/40 focus:border-orange-500 shadow-sm"
        >
          {countries.map(c => (
            <option key={c} value={c}>{c === 'all' ? 'All Countries' : c}</option>
          ))}
        </select>
      </div>
      <p className="text-sm text-slate-500 mb-4 font-medium">{filtered.length} impact records</p>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map(impact => (
          <ImpactCard key={impact.id} impact={impact} />
        ))}
      </div>
    </>
  )
}
