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
  thumbnail?: string;
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

  // 굵은 글씨(**) 파싱 문제를 해결하기 위한 강력한 전처리 (Nuclear Option)
  // 마크다운 파서가 한글 인접 문자를 제대로 처리하지 못하는 경우를 대비해 직접 강제 치환
  const contentFixed = matterResult.content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

  const processedContent = await remark()
    .use(gfm)
    .use(html, { sanitize: false }) // <strong> 태그를 허용하기 위해 sanitize: false 설정
    .process(contentFixed);

  // 마지막 배포 버전 확인을 위한 주석 마커 업데이트
  const contentHtml = processedContent.toString() + '\n<!-- v2.2-force-bold-fix -->';

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

  // 개발 관련 카테고리 키워드 (이 키워드가 포함되면 리스트 맨 뒤로 보냄)
  const devKeywords = [
    "코딩", "Next.js", "Vercel", "Supabase", "React", "Programming",
    "Backend", "Frontend", "Cloud", "Infrastructure", "Deployment", "Automation"
  ];

  return Object.entries(categoryCounts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => {
      const isDevA = devKeywords.some(keyword => a.name.includes(keyword));
      const isDevB = devKeywords.some(keyword => b.name.includes(keyword));

      if (isDevA && !isDevB) return 1; // A가 개발이면 뒤로
      if (!isDevA && isDevB) return -1; // B가 개발이면 A가 앞으로
      
      return a.name.localeCompare(b.name); // 둘 다 같은 그룹이면 이름순
    });
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
