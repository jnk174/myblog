"use client"

import { useEffect } from "react"
import { usePathname, useSearchParams } from "next/navigation"
import { supabase } from "@/lib/supabase"

export default function AnalyticsTracker() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    const trackVisit = async () => {
      // 1. 관리자 체크 (URL 파라미터 또는 로컬 스토리지)
      const secretKey = searchParams.get("admin_secret")
      const isAdminSession = localStorage.getItem("is_blog_admin") === "true"

      if (secretKey === "ska48*!qmf") {
        localStorage.setItem("is_blog_admin", "true")
        console.log("Admin status activated.")
        // URL 클린업은 브라우저 히스토리 조작이므로 필요시 추가
      }

      // 최종 관리자 여부 확인 (지금 막 세팅된 경우 포함)
      const finalIsAdmin = isAdminSession || secretKey === "ska48*!qmf"

      // 2. 관리자가 아닐 때만 카운트 증가
      if (!finalIsAdmin) {
        const todayStr = new Date().toISOString().split("T")[0]

        // PV 증가
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

        // 유입 경로(Referrer) 기록
        const ref = document.referrer
        if (ref && !ref.includes(window.location.hostname)) {
          const source = ref.includes("naver.com") ? "Naver" : 
                         ref.includes("google.com") ? "Google" : 
                         ref.includes("daum.net") ? "Daum" : "Others"
          
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
          } catch {
            // 테이블이 없으면 조용히 무시
          }
        }
      }
    }

    trackVisit()
  }, [pathname, searchParams]) // 페이지가 바뀔 때마다 실행

  return null // UI 없음
}
