"use client"

import { GoogleAnalytics as NextGA } from "@next/third-parties/google"

export default function GoogleAnalytics() {
  // 관리자(본인) 방문 시 GA를 로드하지 않음
  if (typeof window !== 'undefined' && localStorage.getItem('is_blog_admin') === 'true') {
    return null;
  }

  // G-XXXXXXXXXX 부분을 실제 측정 ID로 교체해야 합니다.
  return <NextGA gaId="G-XXXXXXXXXX" />
}
