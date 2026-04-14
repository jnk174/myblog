---
title: "Next.js 정적 블로그: Vercel 무중단 배포 완벽 가이드"
date: "2026-04-04"
category: "코딩"
tags: ["Vercel", "Next.js", "무중단배포"]
excerpt: "GitHub Actions 없이도 완벽한 CI/CD를 구축하는 방법. Next.js 정적 사이트를 Vercel을 통해 전 세계에 가장 빠르게 배포하는 기술적 스텝을 정리합니다."
---

# 정적 사이트 배포의 새로운 표준, Vercel

전통적인 정적 사이트 호스팅(Static Site Hosting)은 직접 서버를 세팅하거나 S3, CloudFront 등의 클라우드 인프라를 수동으로 조합해야 하는 번거로움이 있었습니다. 하지만 **Vercel**의 등장으로 GitHub 리포지토리 푸시 한 번이면 빌드, 배포, CDN 무효화, SSL 인증서 발급까지 한 번에 이루어지는 완벽한 CI/CD 환경을 갖출 수 있게 되었습니다.

본 포스팅에서는 Next.js로 구축된 정적 사이트를 Vercel로 무중단 배포하는 상세한 과정을 다룹니다.

---

## 1. Next.js 정적 내보내기 (Static Export)

Vercel은 Next.js의 개발사로, 별도의 설정 없이도 Next.js 프로젝트를 완벽하게 배포할 수 있습니다. 하지만 서버 사이드 기능을 사용하지 않는 순수 **정적 블로그**를 구축하려면 `next.config.ts`에서 정적 내보내기 설정을 해야 합니다.

```typescript
// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true, // Vercel의 Image Optimization 런타임 비활성화
  },
};

export default nextConfig;
```

> [!WARNING]
> `output: "export"` 설정 시 `next/image`의 기본 이미지 최적화 API를 사용할 수 없습니다. `unoptimized: true`를 반드시 설정하여 빌드 에러를 방지해야 합니다.

## 2. Vercel 프로젝트 연동

GitHub에 프로젝트를 푸시했다면 Vercel 대시보드에서 다음 단계를 진행합니다.

1. **Add New Project** 선택
2. 연동된 GitHub 계정에서 해당 리포지토리의 `Import` 버튼 클릭
3. **Framework Preset**이 `Next.js`로 자동 지정되었는지 확인
4. `Deploy` 클릭

놀랍게도 단 한 번의 커맨드 추가 없이, Vercel은 Next.js의 빌드 명령어를 자동으로 인식하고 최적의 환경에서 빌드를 시작합니다.

## 3. Trouble Shooting: 빌드 오류 해결하기

배포 과정 중 만나기 쉬운 `YAMLException`이나 `Type Error` 유형을 해결하는 기본 원칙은 **"로컬 환경에서의 완전한 빌드 검증"**입니다. Vercel에서 에러가 발생했다면, 터미널에서 다음 명령어로 문제를 진단하세요.

```bash
# 캐시 삭제 후 완전한 클린 빌드
rm -rf .next
npm run build
```

TypeScript 타입 에러, 마크다운의 Frontmatter 인덴트 오류(YAML Parsing) 등은 위 명령어를 통해 로컬에서 대부분 사전 차단할 수 있습니다.

## 4. 커스텀 도메인 매핑

배포 완료 후 Vercel은 `*.vercel.app` 형태의 도메인을 기본 제공하지만, 프로페셔널한 블로그 운영을 위해서는 커스텀 도메인이 필수입니다.

- **Settings > Domains** 메뉴 진입
- 구매한 도메인(예: `myawesomedevblog.com`) 입력
- 도메인 제공업체(GoDaddy, 가비아 등)의 DNS 설정에서 Vercel이 안내하는 `A` 레코드 혹은 `CNAME` 레코드 등록

Vercel은 도메인 인증 즉시 Let's Encrypt를 통한 무료 SSL(HTTPS) 인증서를 자동 발급하고 갱신까지 관리해 줍니다.

---

## 🚀 결론

Vercel을 활용하면 개발자는 인프라 관리에 쏟는 시간을 0으로 수렴하게 만들고, 오직 **'좋은 글과 코드'**를 작성하는 본연의 작업에만 집중할 수 있습니다. 지금 바로 Vercel을 도입하여 최상의 개발자 경험(DX)을 누려보세요.
