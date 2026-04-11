"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

export default function VisitorCounter() {
  const [stats, setStats] = useState({
    total: 0,
    today: 0,
    yesterday: 0,
    pv: 0,
  })

  useEffect(() => {
    const fetchStats = async () => {
      const todayStr = new Date().toISOString().split("T")[0]
      const yesterday = new Date()
      yesterday.setDate(yesterday.getDate() - 1)
      const yesterdayStr = yesterday.toISOString().split("T")[0]

      // 전체 데이터 가져오기
      const { data: allStats } = await supabase.from("site_stats").select("*")
      
      if (allStats) {
        let totalUv = 0
        let totalPv = 0
        let todayUv = 0
        let yesterdayUv = 0

        allStats.forEach((s) => {
          totalUv += s.uv
          totalPv += s.pv
          if (s.date === todayStr) todayUv = s.uv
          if (s.date === yesterdayStr) yesterdayUv = s.uv
        })

        setStats({
          total: totalUv,
          today: todayUv,
          yesterday: yesterdayUv,
          pv: totalPv,
        })
      }
    }

    fetchStats()
  }, [])

  const StatItem = ({ label, value }: { label: string; value: number }) => (
    <div className="flex items-center space-x-2">
      <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{label}</span>
      <span className="font-mono text-sm font-bold text-primary">{value.toLocaleString()}</span>
    </div>
  )

  return (
    <div className="flex w-full items-center justify-center border-y bg-card/50 py-3 backdrop-blur-sm">
      <div className="container flex flex-wrap items-center justify-center gap-x-8 gap-y-2 px-6">
        <StatItem label="Total" value={stats.total} />
        <div className="h-3 w-[1px] bg-border" />
        <StatItem label="Today" value={stats.today} />
        <div className="h-3 w-[1px] bg-border" />
        <StatItem label="Yesterday" value={stats.yesterday} />
        <div className="h-3 w-[1px] bg-border" />
        <StatItem label="Page Views" value={stats.pv} />
      </div>
    </div>
  )
}
