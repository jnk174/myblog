"use client"

import { useEffect, useState } from "react"
import { Users, Eye, TrendingUp } from "lucide-react"

export default function VisitorCounter() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Busuanzi script is already in layout.tsx
  }, [])

  if (!mounted) return null

  return (
    <div className="flex flex-wrap justify-center gap-4 py-8">
      <div className="group relative overflow-hidden rounded-2xl border bg-card p-6 shadow-sm transition-all hover:shadow-md dark:shadow-primary/10">
        <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-primary/5 transition-all group-hover:bg-primary/10" />
        <div className="relative flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Users className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Unique Visitors</p>
            <h3 className="text-2xl font-bold tracking-tight">
              <span id="busuanzi_value_site_uv">...</span>
            </h3>
          </div>
        </div>
      </div>

      <div className="group relative overflow-hidden rounded-2xl border bg-card p-6 shadow-sm transition-all hover:shadow-md dark:shadow-primary/10">
        <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-primary/5 transition-all group-hover:bg-primary/10" />
        <div className="relative flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Eye className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Total Page Views</p>
            <h3 className="text-2xl font-bold tracking-tight">
              <span id="busuanzi_value_site_pv">...</span>
            </h3>
          </div>
        </div>
      </div>

      <div className="group relative overflow-hidden rounded-2xl border border-primary/20 bg-primary/5 p-6 shadow-sm transition-all hover:shadow-md">
        <div className="relative flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <TrendingUp className="h-6 w-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <p className="text-sm font-medium text-primary">Live Status</p>
              <span className="flex h-2 w-2">
                <span className="absolute inline-flex h-2 w-2 animate-ping rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
              </span>
            </div>
            <h3 className="text-2xl font-bold tracking-tight text-primary">Active</h3>
          </div>
        </div>
      </div>
    </div>
  )
}
