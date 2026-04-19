import { google } from 'googleapis';

/**
 * 구글 서치 콘솔 API 클라이언트를 초기화합니다.
 * 서비스 계정 키(JSON)의 내용을 환경 변수로 전달받아야 합니다.
 */
export async function getSearchConsoleClient() {
  const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');

  if (!clientEmail || !privateKey) {
    throw new Error('Google Service Account credentials are not configured.');
  }

  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: clientEmail,
      private_key: privateKey,
    },
    scopes: ['https://www.googleapis.com/auth/webmasters.readonly'],
  });

  return google.webmasters({
    version: 'v3',
    auth,
  });
}

/**
 * 특정 기간 동안의 검색 분석 데이터를 가져옵니다.
 */
export async function getSearchAnalyticsData(siteUrl: string, days = 30) {
  try {
    const client = await getSearchConsoleClient();
    
    const endDate = new Date().toISOString().split('T')[0];
    const startDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

    const response = await client.searchanalytics.query({
      siteUrl,
      requestBody: {
        startDate,
        endDate,
        dimensions: ['query'],
        rowLimit: 10,
      },
    });

    return response.data.rows || [];
  } catch (error) {
    console.error('Error fetching Search Console data:', error);
    throw error;
  }
}
