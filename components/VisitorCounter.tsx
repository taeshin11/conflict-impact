'use client'
import { useEffect, useState } from 'react'
export default function VisitorCounter() {
  const [c, setC] = useState({ today: 0, total: 0 })
  useEffect(() => {
    fetch('/api/visitor', { method: 'POST' }).then(r => r.json()).then(setC)
  }, [])
  return (
    <div className="text-xs text-slate-500 flex gap-4">
      <span>Today: <strong className="text-slate-300">{c.today.toLocaleString()}</strong></span>
      <span>Total: <strong className="text-slate-300">{c.total.toLocaleString()}</strong></span>
    </div>
  )
}
