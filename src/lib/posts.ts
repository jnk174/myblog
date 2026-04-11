import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import gfm from 'remark-gfm';

const postsDirectory = path.join(process.cwd(), 'src/content/blog');

// 마크다운 기호를 제거하는 유틸리티
function stripMarkdown(text: string): string {
  if (!text) return '';
  return text
    .replace(/\*\*(.*?)\*\*/g, '$1') // bold
    .replace(/\*(.*?)\*/g, '$1')   // italic
    .replace(/__(.*?)__/g, '$1')   // bold
    .replace(/_(.*?)_/g, '$1')     // italic
    .replace(/\[(.*?)\]\(.*?\)/g, '$1') // links
    .replace(/`{1,3}(.*?)`{1,3}/g, '$1') // code
    .replace(/#/g, ''); // headers
}

export type PostData = {
  slug: string[]; // URL용 슬러그 (접두사 제거됨)
  fullSlug: string[]; // 실제 파일 경로용 슬러그 (접두사 포함)
  title: string;
  date: string;
  category?: string;
  tags?: string[];
  contentHtml?: string;
  excerpt?: string;
};

// 재귀적으로 파일 목록을 가져오는 함수
function getFilesRecursively(dir: string): string[] {
  let results: string[] = [];
  if (!fs.existsSync(dir)) return results;
  const list = fs.readdirSync(dir);

  list.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getFilesRecursively(filePath));
    } else if (filePath.endsWith('.md')) {
      results.push(filePath);
    }
  });

  return results;
}

// 파일명에서 YYMMDD_ 접두사를 제거하는 함수
function cleanSlugPart(part: string): string {
  return part.replace(/^\d{6}_/, '');
}

export function getSortedPostsData(): PostData[] {
  const filePaths = getFilesRecursively(postsDirectory);
  const allPostsData = filePaths.map((fullPath) => {
    const relativePath = path.relative(postsDirectory, fullPath);
    const pathParts = relativePath.replace(/\.md$/, '').split(path.sep);

    // URL용 슬러그: 마지막 파트(파일명)에서 접두사 제거
    const slug = [...pathParts];
    slug[slug.length - 1] = cleanSlugPart(slug[slug.length - 1]);

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);

    const data = matterResult.data as {
      title: string;
      date: string;
      category?: string;
      tags?: string[];
      excerpt?: string;
    };

    return {
      slug,
      fullSlug: pathParts,
      ...data,
      title: stripMarkdown(data.title),
      excerpt: data.excerpt ? stripMarkdown(data.excerpt) : '',
    };
  });

  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getAllPostSlugs() {
  const posts = getSortedPostsData();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function getPostData(slugArray: string[]): Promise<PostData> {
  const posts = getSortedPostsData();

  // URL 슬러그가 일치하는 포스트 찾기
  const post = posts.find(p => p.slug.join('/') === slugArray.join('/'));

  if (!post) {
    throw new Error(`Post not found for slug: ${slugArray.join('/')}`);
  }

  const fullPath = path.join(postsDirectory, `${post.fullSlug.join('/')}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const matterResult = matter(fileContents);

  // 굵은 글씨(**) 파싱 문제를 해결하기 위해 remark 설정을 더 명시적으로 구성
  const processedContent = await remark()
    .use(gfm)
    .use(html, { sanitize: false }) // 렌더링 안정성을 위해 html 플러그인 사용
    .process(matterResult.content);

  // 마지막 배포 버전 확인을 위한 주석 마커 추가
  const contentHtml = processedContent.toString() + '\n<!-- v2.1-debug-marker -->';

  return {
    ...post,
    contentHtml,
  };
}

export function getAllCategories(): { name: string; count: number }[] {
  const posts = getSortedPostsData();
  const categoryCounts: Record<string, number> = {};

  posts.forEach((post) => {
    if (post.category) {
      categoryCounts[post.category] = (categoryCounts[post.category] || 0) + 1;
    }
  });

  return Object.entries(categoryCounts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count); // 개수 많은 순으로 정렬
}

export function getAllTags(): { name: string; count: number }[] {
  const posts = getSortedPostsData();
  const tagCounts: Record<string, number> = {};

  posts.forEach((post) => {
    post.tags?.forEach((tag) => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1;
    });
  });

  return Object.entries(tagCounts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
}
