---
title: "Next.js 정적 블로그의 하이브리드 진화: Supabase를 활용한 소셜 로그인 & 실시간 통계 완벽 가이드"
date: "2026-04-04"
excerpt: "정적 사이트의 속도와 동적 서비스의 상호작용을 동시에 잡는 방법. Google, GitHub, Kakao 소셜 로그인 연동부터 실시간 대시보드 구축까지의 기술적 상세 과정을 공유합니다."
categories: ["Development", "Technical Guide"]
tags: ["Supabase", "Next.js", "OAuth", "Web-Development"]
---

# 정적(Static)에서 하이브리드(Hybrid)로

전통적인 정적 블로그는 관리의 용이함과 압도적인 속도를 자랑하지만, 방문자와의 실시간 상호작용에는 한계가 있습니다. 저는 이 한계를 극복하기 위해 **Supabase**를 도입하여, 데이터베이스와 인증 시스템을 결합한 '하이브리드' 아키텍처로 블로그를 전환했습니다.

본 포스팅에서는 **Google, GitHub, Kakao**를 활용한 소셜 로그인 시스템 구축 과정과 실시간 방문자 분석 툴 적용기를 상세히 다룹니다.

---

## 1. 아키텍처 코어: Supabase Auth & DB

Supabase는 PostgreSQL 기반의 오픈소스 Firebase 대안으로, 정적 사이트에서 별도의 백엔드 서버 없이도 강력한 인증과 실시간 데이터 연동을 가능케 합니다. 특히 **Auth PKCE Flow**를 사용하여 클라이언트 환경에서도 안전한 세션 관리가 가능합니다.

### 데이터베이스 스키마 설계
방문자 카운팅과 댓글 저장을 위해 두 가지 핵심 테이블을 설계했습니다:
- `site_stats`: 날짜별 PV(Page View)와 UV(Unique Visitor)를 기록
- `comments`: 소셜 로그인 정보를 포함한 게시글별 댓글 저장

---

## 2. 소셜 로그인(OAuth) 연동 상세 가이드

가장 많은 혼란을 야기하는 소셜 서비스별 설정 과정을 정리했습니다.

### 01. Google Cloud Console
Google 로그인은 설정 시 **애플리케이션 유형**이 가장 중요합니다. 반드시 **'웹 애플리케이션'**을 선택해야 리다이렉션 URI를 입력할 수 있습니다.

![Google OAuth 설정 화면](/images/blog/google_auth.png)
*Google Cloud Console의 승인된 리다이렉션 URI 설정*

> [!WARNING]
> 유형을 '데스크톱'으로 선택할 경우 `redirect_uri_mismatch` 에러가 발생하며 URI 입력 칸이 나타나지 않으므로 주의가 필요합니다.

### 02. GitHub Developer Settings
GitHub 앱 등록은 가장 직관적이지만, `Homepage URL`과 `Authorization callback URL`의 구분이 필요합니다.

![GitHub OAuth 설정 화면](/images/blog/github_auth.png)
*GitHub OAuth App 등록 페이지*

### 03. Kakao Developers
카카오는 'REST API 키'를 클라이언트 ID로 사용한다는 점이 독특합니다.

![Kakao OAuth 설정 화면](/images/blog/kakao_auth.png)
*카카오 로그인 리다이렉트 URI 설정 화면*

---

## 3. 코드 구현: 클라이언트 사이드 통합

Supabase 세션을 관리하기 위한 `lib/supabase.ts`와 댓글 컴포넌트(`CommentSection.tsx`)를 구축했습니다. 

```tsx
// 소셜 로그인 트리거 예시
const signInWithSocial = async (provider: Provider) => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${window.location.origin}/auth/callback`,
    },
  });
  if (error) console.error("Login failed:", error.message);
};
```

특히 브라우저 호버 시 사용자에게 명확한 정보를 주기 위해 **툴팁(Tooltip)** 기능을 추가하여 UX를 개선했습니다.

---

## 4. 실시간 방문자 대시보드 (Bold Tech Stats)

블로그 하단에는 Supabase의 실시간 동기화 기능을 활용한 대시보드가 배치되었습니다. 이는 단순한 조회수 이상의 **Today/Yesterday/Total** 데이터를 제공하며, 정적 페이지에 동적인 생동감을 부여합니다.

---

## 5. 마치며

정적 블로그에 Supabase라는 날개를 단 이후, 단순한 텍스트 저장소였던 이 공간은 독자들과 대화하고 흐름을 읽는 살아있는 공간이 되었습니다. 기술적인 설정 과정은 까다롭지만, 완성 후의 만족도는 상상 그 이상입니다.

여러분의 정적 사이트도 이제 **하이브리드**로 진화할 때입니다!
