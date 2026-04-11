import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/admin/', // 관리자 페이지는 검색에서 제외
    },
    sitemap: 'https://gill-log.vercel.app/sitemap.xml',
  }
}
