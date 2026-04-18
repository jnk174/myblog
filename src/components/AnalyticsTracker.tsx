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
      }

      // 최종 관리자 여부 확인
      const finalIsAdmin = isAdminSession || secretKey === "ska48*!qmf"

      // 2. 관리자가 아닐 때만 카운트 증가
      if (!finalIsAdmin) {
        const todayStr = new Date().toISOString().split("T")[0]
        const lastVisitDate = localStorage.getItem("last_visit_date")
        const isNewVisitorToday = lastVisitDate !== todayStr

        // 사이트 통계 업데이트 (PV/UV)
        const { data: todayData, error: fetchError } = await supabase
          .from("site_stats")
          .select("*")
          .eq("date", todayStr)
          .maybeSingle()

        if (!fetchError) {
          if (!todayData) {
            // 오늘 첫 방문자 발생
            await supabase.from("site_stats").insert({ 
              date: todayStr, 
              pv: 1, 
              uv: 1 
            })
          } else {
            // 기존 데이터 업데이트
            await supabase
              .from("site_stats")
              .update({ 
                pv: todayData.pv + 1,
                uv: isNewVisitorToday ? todayData.uv + 1 : todayData.uv
              })
              .eq("date", todayStr)
          }
        }

        // 로컬 스토리지 갱신 (UV 판별용)
        if (isNewVisitorToday) {
          localStorage.setItem("last_visit_date", todayStr)
        }

        // 3. 포스트별 조회수 추적 (/blog/slug 형식인 경우)
        if (pathname.startsWith("/blog/") && pathname.length > 6) {
          const slug = pathname.split("/").pop()
          const title = document.title.split("|")[0].trim() || slug

          if (slug) {
            const { data: postData } = await supabase
              .from("post_stats")
              .select("*")
              .eq("date", todayStr)
              .eq("slug", slug)
              .maybeSingle()

            if (!postData) {
              await supabase.from("post_stats").insert({
                date: todayStr,
                slug,
                title,
                views: 1
              })
            } else {
              await supabase
                .from("post_stats")
                .update({ views: postData.views + 1 })
                .eq("id", postData.id)
            }
          }
        }

        // 4. 유입 경로(Referrer) 기록
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
