import fs from 'fs';
import { remark } from 'remark';
import html from 'remark-html';
import gfm from 'remark-gfm';
import matter from 'gray-matter';

async function test() {
  const fullPath = 'src/content/blog/2026-04/260411_making-750m-in-20-years.md';
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const matterResult = matter(fileContents);
  
  try {
    const processedContent = await remark()
      .use(gfm)
      .use(html)
      .process(matterResult.content);
    fs.writeFileSync('test-output.html', processedContent.toString());
    console.log('Saved to test-output.html');
  } catch (e) {
    console.error('Error:', e);
  }
}

test();
