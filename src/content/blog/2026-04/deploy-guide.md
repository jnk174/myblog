---
title: "Next.js 정적 블로그: 빌드부터 Vercel 배포까지 완벽 가이드"
date: "2026-04-04"
categories:
  - "튜토리얼"
  - "배포"
tags:
  - "Next.js"
  - "Vercel"
  - "GitHub"
  - "Static-Export"
excerpt: "Next.js를 사용하여 정적 블로그를 만들고, 깃허브와 버셀을 연동하여 전 세계에 배포하는 전 과정을 상세히 정리했습니다."
---

# Next.js 정적 블로그: 빌드부터 Vercel 배포까지 완벽 가이드

나만의 블로그를 갖는 것은 모든 개발자의 꿈이죠. 오늘은 **Next.js 16.2**와 **Shadcn UI**를 활용해 만든 정적 블로그를 **GitHub**에 올리고 **Vercel**로 배포하는 전체 과정을 소개합니다.

## 1. 정적 페이지 빌드 설정 (`Static Export`)

Next.js는 서버 없이도 동작할 수 있는 정적 결과물을 만들어낼 수 있습니다. 이를 위해 `next.config.ts` 파일에 다음과 같은 설정을 추가했습니다.

```typescript
// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export", // 정적 빌드 활성화
  images: {
    unoptimized: true, // 정적 호스팅을 위한 이미지 최적화 비활성화
  },
};

export default nextConfig;
```

이렇게 하면 `npm run build` 실행 시 모든 페이지가 `out` 폴더에 HTML/CSS/JS 파일로 생성됩니다.

## 2. GitHub 저장소 연동 및 푸시

로컬에서 작업한 코드를 안전하게 보관하고 배포 자동화를 위해 GitHub에 푸시합니다.

```bash
git add .
git commit -m "feat: complete blog implementation"
git branch -M main
git remote add origin https://github.com/jnk174/myblog.git
git push -u origin main
```

## 3. Vercel 호스팅 및 도메인 설정

Vercel은 깃허브 저장소를 연결하면 코드가 업데이트될 때마다 자동으로 배포해 주는 아주 편리한 서비스입니다.

1. **Vercel 프로젝트 생성**: GitHub 저장소를 가져옵니다.
2. **Framework Preset**: 반드시 `Next.js`로 설정해야 합니다. (정적 빌드 폴더인 `out`을 자동으로 인식합니다.)
3. **도메인 변경**: Vercel 설정(Settings) -> Domains 메뉴에서 `gill-log.vercel.app`과 같은 나만의 주소를 무료로 등록할 수 있습니다.

## 4. 마치며

이제 마크다운 파일 하나만 작성해서 푸시하면 전 세계 누구나 접속할 수 있는 멋진 블로그가 완성되었습니다. **Gill's Log**의 탄생을 축하하며, 앞으로 다양한 지식들을 이곳에 채워나갈 예정입니다!

---
*작성일: 2026년 4월 4일*
*글쓴이: Gill*
