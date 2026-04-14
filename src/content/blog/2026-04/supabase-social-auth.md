---
title: "Supabase와 Next.js: 완벽한 하이브리드 소셜 로그인 시스템 구축"
date: "2026-04-05"
category: "코딩"
tags: ["Supabase", "Next.js", "소셜로그인"]
excerpt: "정적 블로그의 한계를 넘어, Supabase를 활용하여 Google, GitHub, Kakao 소셜 로그인을 통합하고 사용자 경험을 극대화하는 방법을 소개합니다."
---

# 정적 웹사이트의 패러다임 전환: 하이브리드 아키텍처

서버사이드 로직을 배제한 완벽한 정적 블로그(Static Blog)는 보안성과 로딩 속도 면에서 타의 추종을 불허합니다. 하지만 방문자와의 인터랙션, 즉 **댓글 기능이나 좋아요, 사용자 인증**이 필요한 순간 거대한 벽에 부딪히게 됩니다.

이러한 한계를 극복하기 위해 가장 트렌디한 솔루션으로 떠오른 것이 바로 **Supabase**입니다. '오픈소스 Firebase'로 불리는 Supabase는 강력한 PostgreSQL 기반 데이터베이스와 완벽히 튜닝된 Auth(인증) 시스템을 제공합니다. 

본 글에서는 Next.js 환경에서 Supabase Auth를 활용한 3종 소셜 로그인(Google, GitHub, Kakao) 구축 과정을 심층 분석합니다.

---

## 1. OAuth 프로바이더 발급처 위치 및 설정 가이드

가장 많은 분들이 어려워하시는 "대체 내 키는 어디서 발급받아야 하는가?"에 대한 명확한 해답을 스크린샷과 함께 정리했습니다. 각 서비스 모두 복잡한 콘솔 창을 열게 되므로 아래 경로만 정확히 따라가세요.

### 01. Google Cloud Platform (GCP)
구글의 경우 클라우드 콘솔의 UI가 방대해 화면을 찾기 어렵습니다.

**발급 경로**:
1. [Google Cloud Console](https://console.cloud.google.com/) 접속 및 로그인
2. 상단 네비게이션에서 새 프로젝트 생성 (ex. `my-blog-project`)
3. 좌측 메뉴에서 **[API 및 서비스]** -> **[사용자 인증 정보]** 클릭
4. 상단 **[+ 사용자 인증 정보 만들기]** 탭을 누르고 **[OAuth 클라이언트 ID]** 선택

![Google OAuth 설정 화면](/images/blog/google_auth.png)

> [!WARNING]
> 이때 가장 중요한 것은 **애플리케이션 유형**을 반드시 **'웹 애플리케이션'**으로 지정해야 한다는 점입니다. 그래야만 하단에 '승인된 리디렉션 URI' 입력 칸이 나타나며, 여기에 Supabase 콘솔에서 제공하는 Callback URL(`https://<id>.supabase.co/auth/v1/callback`)을 입력해야 `redirect_uri_mismatch` 오류가 발생하지 않습니다.

### 02. GitHub Developer Settings
개발자 친화적인 GitHub은 설정이 가장 직관적이고 숨겨져 있지 않아 편안합니다.

**발급 경로**:
1. GitHub 로그인 후 우측 상단 프로필 클릭 -> **[Settings]** 
2. 좌측 맨 하단의 **[Developer settings]** 클릭
3. 좌측 탭에서 **[OAuth Apps]** 선택 후 **[New OAuth App]** 클릭

![GitHub OAuth 설정 화면](/images/blog/github_auth.png)

**주요 설정 항목**:
- **Homepage URL**: 여러분 블로그의 최상단 도메인 (`https://gill-log.vercel.app/`)
- **Authorization callback URL**: Supabase에서 알려준 리다이렉트 주소. 이 값이 조금만 틀려도 OAuth 오류가 발생하므로 주의해야 합니다.

### 03. Kakao Developers
카카오는 한국 서비스 개발 시 빼놓을 수 없으며, 설정 용어가 다른 플랫폼과 달라 헷갈리기 쉽습니다. 특히 메뉴 깊숙한 곳에 설정 항목들이 분산되어 있으니 아래 경로를 정확히 확인하세요.

**발급 경로**:
1. [Kakao Developers](https://developers.kakao.com/) 로그인 후 내 애플리케이션 상세 페이지로 이동합니다.
2. 좌측 메뉴에서 **[앱 설정]** -> **[앱]** 탭을 확장하고 **[플랫폼 키]** 메뉴를 클릭합니다.
   - 이 화면 상단에 보이는 **'REST API 키'**(기본 키워드: Default Rest API Key)가 바로 여러분이 Supabase에 넣을 `Client ID`입니다!
   - 또한, **동일한 화면 하단**에 위치한 **'카카오 로그인 리다이렉트 URI'** 필드에 Supabase Callback 주소(`https://<id>.supabase.co/auth/v1/callback`)를 정확히 입력하고 저장합니다.
3. 좌측 하단의 **[제품 설정]** -> **[카카오 로그인]** 메뉴로 이동하여 **'활성화 설정'을 반드시 'ON'**으로 켭니다. (미활성화 시 로그인 API가 동작하지 않습니다.)
4. 마지막으로 **[제품 설정]** -> **[카카오 로그인]** -> **[보안]** 탭으로 진입하여 **'클라이언트 시크릿(Client Secret)'** 코드를 확인/생성 후 Supabase에 등록합니다.

![Kakao OAuth 설정 화면](/images/blog/kakao_auth.png)

위 3가지 플랫폼의 고유 키들을 발급받아 Supabase 대시보드(Authentication -> Providers)에 정확히 채워 넣는 것이 소셜 로그인의 첫 번째이자 가장 험난한 고개입니다.

---

## 2. Next.js에서의 클라이언트 사이드 통합

모든 플랫폼의 Client ID와 Secret Key를 Supabase 콘솔에 등록했다면, 클라이언트에서의 로그인 트리거 코드는 놀라울 정도로 간결해집니다.

```tsx
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function LoginButtons() {
  const supabase = createClientComponentClient();

  const handleLogin = async (provider: 'google' | 'github' | 'kakao') => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        // 로그인 성공 후 돌아올 우리 서비스의 주소
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      console.error(`로그인 실패: ${error.message}`);
    }
  };

  return (
    <div className="flex gap-4">
      <button onClick={() => handleLogin('github')}>Login with GitHub</button>
      {/* Google, Kakao buttons... */}
    </div>
  );
}
```

> [!TIP]
> `redirectTo` 옵션을 명시적으로 지정하여, 사용자가 로그인을 완료한 후 현재 머물고 있던 글로 자연스럽게 되돌아올 수 있도록 UX를 설계하는 것이 중요합니다.

## 3. RLS (Row Level Security)를 통한 철통 보안

데이터베이스 접근은 무조건 안전해야 합니다. Supabase는 테이블마다 **RLS**를 설정하여 읽기/쓰기 권한을 세밀하게 통제합니다.

예를 들어 댓글(`comments`) 테이블의 경우 다음과 같이 정책을 수립할 수 있습니다:
- **SELECT (조회)**: 모든 익명 사용자(Public) 허용. 누구나 댓글을 읽을 수 있어야 합니다.
- **INSERT (생성)**: `auth.uid() = user_id` 조건 추가. 오직 로그인(인증)된 사용자 본인만 자신의 계정으로 댓글을 작성할 수 있습니다.
- **DELETE (삭제)**: 작성자 본인 혹은 관리자 등급만 삭제 가능하도록 제한.

이러한 RLS 정책은 백엔드 서버에서 구현해야 할 복잡한 권한 검증 로직을 단 몇 줄의 SQL 문으로 해결해 줍니다.

---

## 💡 결론: 한계 없는 확장성

순수 정적 사이트가 Supabase와 결합되는 순간, 단순한 블로그를 넘어 실시간 소통이 가능하고 데이터를 누적하는 **강력한 웹 애플리케이션**으로 탈바꿈합니다.

서버 프로비저닝이나 데이터베이스 인프라 구축의 허들을 넘고 싶다면, 주저 없이 Supabase를 თქვენ의 Next.js 프로젝트에 도입해 보시길 강력히 권장합니다.
