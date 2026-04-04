import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import gfm from 'remark-gfm';

const postsDirectory = path.join(process.cwd(), 'src/content/blog');

export type PostData = {
  slug: string[]; // e.g., ['2026-04', 'my-post']
  title: string;
  date: string;
  categories?: string[];
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

export function getSortedPostsData(): PostData[] {
  const filePaths = getFilesRecursively(postsDirectory);
  const allPostsData = filePaths.map((fullPath) => {
    // '/src/content/blog' 에 상대적인 경로 계산
    const relativePath = path.relative(postsDirectory, fullPath);
    const slug = relativePath.replace(/\.md$/, '').split(path.sep);

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);

    const data = matterResult.data as {
      title: string;
      date: string;
      categories?: string[];
      tags?: string[];
      excerpt?: string;
    };

    return {
      slug,
      ...data,
    };
  });

  // 날짜순 내림차순 정렬
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getAllPostSlugs() {
  const filePaths = getFilesRecursively(postsDirectory);
  return filePaths.map((fullPath) => {
    const relativePath = path.relative(postsDirectory, fullPath);
    const slug = relativePath.replace(/\.md$/, '').split(path.sep);
    return {
      slug,
    };
  });
}

export async function getPostData(slugArray: string[]): Promise<PostData> {
  const fullPath = path.join(postsDirectory, `${slugArray.join('/')}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const matterResult = matter(fileContents);

  const processedContent = await remark()
    .use(gfm)
    .use(html)
    .process(matterResult.content);
  
  const contentHtml = processedContent.toString();

  const data = matterResult.data as {
    title: string;
    date: string;
    categories?: string[];
    tags?: string[];
    excerpt?: string;
  };

  return {
    slug: slugArray,
    contentHtml,
    ...data,
  };
}

export function getAllCategories(): string[] {
  const posts = getSortedPostsData();
  const categories = new Set<string>();
  posts.forEach((post) => {
    post.categories?.forEach((cat) => categories.add(cat));
  });
  return Array.from(categories);
}

export function getAllTags(): string[] {
  const posts = getSortedPostsData();
  const tags = new Set<string>();
  posts.forEach((post) => {
    post.tags?.forEach((tag) => tags.add(tag));
  });
  return Array.from(tags);
}
