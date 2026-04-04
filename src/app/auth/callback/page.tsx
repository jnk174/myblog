"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"

export default function AuthCallbackPage() {
  const router = useRouter()

  useEffect(() => {
    const handleAuthCallback = async () => {
      const { error } = await supabase.auth.getSession()
      if (!error) {
        // 성공 시 이전 페이지 혹은 홈으로 이동
        const prevPath = localStorage.getItem("prevPath") || "/"
        router.push(prevPath)
      } else {
        console.error("Auth callback error:", error.message)
        router.push("/")
      }
    }

    handleAuthCallback()
  }, [router])

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      <p className="ml-4 font-bold tracking-tight">Authenticating...</p>
    </div>
  )
}
