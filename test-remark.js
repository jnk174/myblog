const { remark } = require('remark');
const gfm = require('remark-gfm');
const remarkRehype = require('remark-rehype');
const rehypeStringify = require('rehype-stringify');

async function test() {
  const content = 'This is **bold** text.';
  const processedContent = await remark()
    .use(gfm)
    .use(remarkRehype)
    .use(rehypeStringify)
    .process(content);
  console.log('Result:', processedContent.toString());
}

test();
