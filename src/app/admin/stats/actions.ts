"use server"

import { getSearchAnalyticsData } from "@/lib/google-search-console";
import { siteConfig } from "@/config/site";

export type KeywordData = {
  keys?: string[];
  clicks?: number;
  impressions?: number;
  ctr?: number;
  position?: number;
};

/**
 * 구글 서치 콘솔에서 키워드 데이터를 가져옵니다.
 */
export async function fetchSearchKeywords(): Promise<KeywordData[]> {
  try {
    // 1. 설정 확인
    if (!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY) {
      console.warn("Google Search Console credentials not configured.");
      return [];
    }

    // 2. 데이터 호출
    // siteUrl은 GSC에 등록된 도메인 형식이어야 합니다. SC-DOMAIN:domain.com 또는 https://domain.com/
    const siteUrl = siteConfig.url; 
    const data = await getSearchAnalyticsData(siteUrl);

    return data as KeywordData[];
  } catch (error) {
    console.error("Failed to fetch search keywords:", error);
    return [];
  }
}
