'use client'
import { useEffect, useRef } from 'react'

export default function AdHeader() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!ref.current || ref.current.dataset.loaded) return
    ref.current.dataset.loaded = '1'
    ;(window as any).atOptions = {
      key: '4a233bf4ad87250e845096a272802c29',
      format: 'iframe',
      height: 90,
      width: 728,
      params: {}
    }
    const s = document.createElement('script')
    s.src = 'https://www.highperformanceformat.com/4a233bf4ad87250e845096a272802c29/invoke.js'
    s.async = true
    ref.current.appendChild(s)
  }, [])
  return (
    <div className="w-full flex justify-center py-2 bg-gray-50 border-b border-gray-100">
      <div ref={ref} className="min-h-[90px] flex items-center justify-center" />
    </div>
  )
}
