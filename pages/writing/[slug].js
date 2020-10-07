import renderToString from 'next-mdx-remote/render-to-string';
import hydrate from 'next-mdx-remote/hydrate';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { getAllPostIds } from 'lib/writing';
import BaseLayout from 'layouts/base';

import ReactPlayer from 'react-player';

const components = { ReactPlayer };

export default function PostPage({ source, frontMatter }) {
  const content = hydrate(source, { components });
  return (
    <BaseLayout>
      <div className="py-5 mx-auto prose">
        <h1>{frontMatter.title}</h1>
        {content}
      </div>
    </BaseLayout>
  );
}

export async function getStaticPaths() {
  let paths = getAllPostIds();

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const fullPath = path.join('content/writing/', `${params.slug}.mdx`);
  const source = await fs.readFileSync(fullPath, 'utf8');

  const { content, data } = await matter(source);
  const frontMatter = JSON.parse(JSON.stringify(data));
  const mdxSource = await renderToString(content, {
    components,
    scope: frontMatter,
  });

  return { props: { source: mdxSource, frontMatter: frontMatter } };
}
