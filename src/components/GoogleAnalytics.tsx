"use client"

import { GoogleAnalytics as NextGA } from "@next/third-parties/google"

export default function GoogleAnalytics() {
  // 관리자(본인) 방문 시 GA를 로드하지 않음
  if (typeof window !== 'undefined' && localStorage.getItem('is_blog_admin') === 'true') {
    return null;
  }

  // G-17WP4GLT79 측정 ID를 적용했습니다.
  return <NextGA gaId="G-17WP4GLT79" />
}
