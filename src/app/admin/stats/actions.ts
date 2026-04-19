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
export async function fetchSearchKeywords(): Promise<{ isLinked: boolean, data: KeywordData[] }> {
  try {
    // 1. 설정 확인
    if (!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY) {
      console.warn("Google Search Console credentials not configured.");
      return { isLinked: false, data: [] };
    }

    // 2. 데이터 호출
    const siteUrl = siteConfig.url; 
    const data = await getSearchAnalyticsData(siteUrl);

    return { isLinked: true, data: data as KeywordData[] };
  } catch (error) {
    console.error("Failed to fetch search keywords:", error);
    return { isLinked: false, data: [] };
  }
}
