---
title: "Next.js Static Blog 런칭 인사"
date: "2026-04-04"
categories:
  - "개발"
  - "Next.js"
tags:
  - "blog"
  - "vercel"
  - "static-export"
excerpt: "완벽하게 커스터마이즈된 Markdown 기반 정적 블로그를 성공적으로 배포하게 되었습니다. 기능과 적용 기술을 소개합니다."
---

# Next.js Static Blog 런칭 인사

안녕하세요! 새로운 블로그에 오신 것을 환영합니다! 🎉

이 블로그는 **Next.js 16.2 App Router** 기반으로 개발되었으며, `output: 'export'` 설정을 활용하여 완전히 정적인 HTML과 자원들로 구성됩니다. 이를 통해 Vercel 뿐만 아니라 GitHub Pages 등 어떤 CDN에도 쉽게 호스팅할 수 있습니다.

## 주요 기능 및 스펙

1. **Markdown 및 Frontmatter 지원**: `gray-matter`와 `remark`를 활용해 월별 디렉토리에 마크다운 코드를 작성하면 아름답게 렌더링 됩니다.
2. **카테고리와 태그**: 프론트매터 시스템을 활용해 카테고리와 다중 태그를 지정할 수 있고, 목록에서 해당 조건에 맞는 글만 즉시 필터링할 수 있습니다.
3. **아름다운 디자인 시스템**: `Shadcn UI` (bold-tech 테마)와 `TailwindCSS v4`의 Typography 플러그인이 결합되어 현대적이고 유려한 시각 경험을 제공합니다. 
4. **강력한 정적 생성 (SSG)**: 블로그 페이지들은 빌드 타임에 한 번만 렌더링 되어 매우 빠르고 SEO에 유리합니다.

### 코드 예시

어떻게 보일지 궁금하시다면, 아래의 기본 `posts.ts`의 일부를 참고해주세요:

```typescript
export function getSortedPostsData() {
  // src/content 아래의 파일들을 재귀적으로 가져와 파싱합니다!
  const filePaths = getFilesRecursively(postsDirectory);
  // ... 처리 로직
}
```

앞으로 다양한 기술 포스트들이 이곳에서 월별 구조로 관리될 예정입니다! 기대해 주세요!
