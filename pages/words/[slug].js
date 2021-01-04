import renderToString from 'next-mdx-remote/render-to-string';
import hydrate from 'next-mdx-remote/hydrate';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { getAllPostIds } from 'lib/words';
import BaseLayout from 'layouts/base';
import { CommonMetadata } from 'components/metadata';

import ReactPlayer from 'react-player';
import Image from 'next/image';

const components = { ReactPlayer, Image };

export default function PostPage({ source, frontMatter }) {
  const content = hydrate(source, { components });
  return (
    <BaseLayout includeFooter>
      <CommonMetadata
        title={frontMatter.title}
        description={frontMatter.excerpt}
      />
      <div className="pt-16 pb-20 px-4 text-base max-w-prose mx-auto">
        <h1 className="mt-2 mb-8 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 dark:text-gray-200 sm:text-4xl sm:leading-10">
          {frontMatter.title}
        </h1>
        <div className="prose dark:prose-dark">{content}</div>
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
  const fullPath = path.join('content/words/', `${params.slug}.mdx`);
  const source = await fs.readFileSync(fullPath, 'utf8');

  const { content, data } = await matter(source);
  const frontMatter = JSON.parse(JSON.stringify(data));
  const mdxSource = await renderToString(content, {
    components,
    scope: frontMatter,
  });

  return { props: { source: mdxSource, frontMatter: frontMatter } };
}
