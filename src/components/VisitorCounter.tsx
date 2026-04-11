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
    const handleStats = async () => {
      // 1. 관리자 체크 (URL 파라미터 또는 로컬 스토리지)
      const urlParams = new URLSearchParams(window.location.search)
      const secretKey = urlParams.get("admin_secret")
      const isAdminSession = localStorage.getItem("is_blog_admin") === "true"

      if (secretKey === "ska48*!qmf") {
        localStorage.setItem("is_blog_admin", "true")
        console.log("Admin status activated.")
        // 관리자 모드 활성화 시 페이지 새로고침하여 파라미터 제거 (선택 사항)
      }

      const todayStr = new Date().toISOString().split("T")[0]
      const yesterday = new Date()
      yesterday.setDate(yesterday.getDate() - 1)
      const yesterdayStr = yesterday.toISOString().split("T")[0]

      // 2. 관리자가 아닐 때만 카운트 증가
      if (!isAdminSession && secretKey !== "ska48*!qmf") {
        const { data: todayData, error: fetchError } = await supabase
          .from("site_stats")
          .select("*")
          .eq("date", todayStr)
          .maybeSingle()

        if (!fetchError) {
          if (!todayData) {
            await supabase.from("site_stats").insert({ date: todayStr, pv: 1, uv: 1 })
          } else {
            await supabase
              .from("site_stats")
              .update({ pv: todayData.pv + 1 })
              .eq("date", todayStr)
          }
        }

        // 유입 경로(Referrer) 기록 시도
        const ref = document.referrer
        if (ref && !ref.includes(window.location.hostname)) {
          const source = ref.includes("naver.com") ? "Naver" : 
                         ref.includes("google.com") ? "Google" : 
                         ref.includes("daum.net") ? "Daum" : "Others"
          
          // site_referrers 테이블이 있다고 가정하고 시도 (없어도 에러로 중단되지 않게 처리)
          try {
            const { data: refData } = await supabase
              .from("site_referrers")
              .select("*")
              .eq("date", todayStr)
              .eq("source", source)
              .maybeSingle()

            if (!refData) {
              await supabase.from("site_referrers").insert({ date: todayStr, source, count: 1 })
            } else {
              await supabase.from("site_referrers").update({ count: refData.count + 1 }).eq("id", refData.id)
            }
          } catch (e) {
            console.log("Referrer tracking table might not exist yet.")
          }
        }
      }

      // 3. 전체 데이터 가져오기 (관리자건 아니건 통계는 보여줌)
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

    handleStats()
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
