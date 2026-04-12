"use client"

import { Analytics } from "@vercel/analytics/next"

export default function VercelAnalytics() {
  return (
    <Analytics 
      beforeSend={(event) => {
        // 로컬 스토리지에 관리자 플래그가 있으면 이벤트를 보내지 않음
        if (typeof window !== 'undefined' && localStorage.getItem('is_blog_admin') === 'true') {
          return null;
        }
        return event;
      }} 
    />
  )
}
