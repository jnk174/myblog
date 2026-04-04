---
title: "Supabase와 Next.js: 완벽한 하이브리드 소셜 로그인 시스템 구축"
date: "2026-04-05"
category: "Backend"
tags: ["Supabase", "Next.js", "Authentication", "OAuth"]
excerpt: "정적 블로그의 한계를 넘어, Supabase를 활용하여 Google, GitHub, Kakao 소셜 로그인을 통합하고 사용자 경험을 극대화하는 방법을 소개합니다."
---

# 정적 웹사이트의 패러다임 전환: 하이브리드 아키텍처

서버사이드 로직을 배제한 완벽한 정적 블로그(Static Blog)는 보안성과 로딩 속도 면에서 타의 추종을 불허합니다. 하지만 방문자와의 인터랙션, 즉 **댓글 기능이나 좋아요, 사용자 인증**이 필요한 순간 거대한 벽에 부딪히게 됩니다.

이러한 한계를 극복하기 위해 가장 트렌디한 솔루션으로 떠오른 것이 바로 **Supabase**입니다. '오픈소스 Firebase'로 불리는 Supabase는 강력한 PostgreSQL 기반 데이터베이스와 완벽히 튜닝된 Auth(인증) 시스템을 제공합니다. 

본 글에서는 Next.js 환경에서 Supabase Auth를 활용한 3종 소셜 로그인(Google, GitHub, Kakao) 구축 과정을 심층 분석합니다.

---

## 1. Supabase OAuth 프로바이더 설정의 핵심

소셜 로그인은 각 프로바이더(플랫폼)마다 요구하는 보안 규격과 설정 인터페이스가 다릅니다. 이 과정에서의 사소한 오타나 설정 누락이 치명적인 `Auth Error`를 유발합니다.

### Google Cloud Platform (GCP)
구글 로그인을 설정할 때 가장 많은 실수가 발생하는 부분은 **"애플리케이션 유형"**입니다.
반드시 **'웹 애플리케이션(Web Application)'**으로 지정해야 Supabase에서 발급받은 `Callback URL`을 입력할 수 있는 승인된 리다이렉션 URI 필드가 나타납니다. 만약 '데스크톱' 혹은 'iOS/Android'를 선택하면 `redirect_uri_mismatch` 오류의 늪에 빠지게 됩니다.

### GitHub Developer Settings
개발자 친화적인 GitHub은 OAuth App 생성이 매우 직관적입니다.
명심할 것은 `Homepage URL`에는 여러분의 서비스 최상단 도메인을, `Authorization callback URL`에는 정확히 Supabase 대시보드에 명시된 리다이렉트 주소(예: `https://<project-ref>.supabase.co/auth/v1/callback`)를 기입하는 것뿐입니다.

### Kakao Developers
국내 서비스 타겟팅 시 필수적인 카카오 로그인은 다른 플랫폼과 달리 **'REST API 키'**를 Client ID로 사용한다는 점을 잊지 마세요. 또한 카카오 디벨로퍼스 콘솔의 [내 애플리케이션] > [카카오 로그인] 메뉴에서 활성화(ON) 상태로 변경해야만 API가 정상 동작합니다.

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
