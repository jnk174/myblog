---
title: "Supabase로 정적 블로그에 생명력 불어넣기: 소셜 로그인 & 실시간 통계 연동기"
date: "2026-04-04"
excerpt: "Next.js 정적 블로그에 Supabase를 결합하여 실시간 방문자 통계와 4대 소셜 로그인 댓글 시스템을 구축한 기술적 여정을 공유합니다."
categories: ["Development", "Next.js"]
tags: ["Supabase", "OAuth", "Next.js", "Hybrid Blog"]
---

# 정적 블로그의 한계를 넘어서다

Next.js의 정적 사이트 생성(SSG)은 놀라운 속도와 SEO 최적화를 제공하지만, '실시간 소통'이라는 측면에서는 태생적인 한계가 있습니다. 저는 이 블로그, **Gill's Log**를 단순한 정보 전달용 페이지가 아닌 방문자와 호흡하는 **하이브리드 블로그**로 업그레이드하기로 결심했습니다.

이번 포스팅에서는 **Supabase**를 활용해 방문자 통계와 소셜 로그인 댓글 시스템을 구축하며 겪은 과정과 인사이트를 공유합니다.

---

## 🛠 핵심 기술 스택

- **Frontend**: Next.js 16 (App Router, Static Export)
- **Backend/Auth**: Supabase (Database, Auth, RLS)
- **Styling**: Tailwind CSS v4, Bold Tech Design System (OKLCH)
- **Analytics**: Vercel Analytics & Supabase Custom Stats

---

## 🚀 주요 구현 기능

### 1. 실시간 방문자 대시보드
기존의 정적 통계 서비스 대신 Supabase DB를 직접 연동했습니다. 홈 페이지 하단에 배치된 슬림한 통계 바는 다음 데이터를 실시간으로 보여줍니다:
- **Total**: 전체 방문자 수
- **Today/Yesterday**: 오늘과 어제의 활성 사용자 비교
- **Page Views**: 전체 페이지 열람 횟수

### 2. 4대 소셜 로그인 댓글 시스템
방문자가 별도의 회원가입 없이 기존에 사용하던 계정(GitHub, Google, Kakao, Naver)으로 즉시 댓글을 달 수 있도록 구현했습니다. 특히 **OAuth PKCE** 흐름을 적용하여 정적 익스포트 환경에서도 안전하게 세션을 유지할 수 있도록 설계했습니다.

---

## 💡 구현 중 마주친 도전과 해결책

### 1. Google OAuth의 '리다이렉션 지옥'
구글 로그인 연동 중 가장 흔히 발생하는 `redirect_uri_mismatch` 문제를 겪었습니다. 원인은 Google Cloud Console에서 애플리케이션 유형을 '데스크톱'으로 설정했기 때문이었죠. 이를 **'웹 애플리케이션'**으로 변경하고 Supabase의 콜백 주소를 정확히 입력하여 해결했습니다.

> [!TIP]
> Google OAuth 설정 시 반드시 **승인된 리다이렉션 URI**에 `https://[PROJECT_ID].supabase.co/auth/v1/callback` 주소를 정확히 기입해야 합니다.

### 2. 정적 빌드 시의 환경 변수 처리
`output: 'export'` 환경에서는 빌드 타임에 환경 변수가 없으면 에러가 발생할 수 있습니다. 이를 방지하기 위해 Supabase 클라이언트 초기화 시 플레이스홀더를 사용하여 빌드 안정성을 확보했습니다. 실질적인 키는 클라이언트 사이드에서 주입되도록 설계했습니다.

---

## ✨ 완성된 결과물

이번 업데이트를 통해 블로그는 다음과 같은 프리미엄 UI를 갖추게 되었습니다:

- **미니멀한 디자인**: OKLCH 컬러 시스템을 활용한 고대비 UI
- **인터랙티브 툴팁**: 소셜 로그인 아이콘 호버 시 친절한 안내 메시지 표시
- **실시간 반응**: 댓글 작성 즉시 대시보드 업데이트

이제 **Gill's Log**는 단순한 '로그'가 아닌 사용자들과 함께 성장하는 '커뮤니티'의 초석을 다졌습니다.

여러분의 블로그에도 Supabase라는 날개를 달아보는 건 어떠신가요? 질문이 있다면 아래 댓글창(우리가 방금 만든 바로 그곳!)에 남겨주세요!
