import { remark } from 'remark';
import html from 'remark-html';
import gfm from 'remark-gfm';

async function test() {
  const content = 'This is **bold** text.';
  try {
    const processedContent = await remark()
      .use(gfm)
      .use(html)
      .process(content);
    console.log('Result:', processedContent.toString());
  } catch (e) {
    console.error('Error:', e);
  }
}

test();
