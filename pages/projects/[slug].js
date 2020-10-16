import renderToString from 'next-mdx-remote/render-to-string';
import hydrate from 'next-mdx-remote/hydrate';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { getAllProjectIds } from 'lib/projects';
import BaseLayout from 'layouts/base';

const components = {};

export default function PostPage({ source, frontMatter }) {
  const content = hydrate(source, { components });
  return (
    <BaseLayout>
      <div className="pt-16 pb-20 px-4 text-base max-w-prose mx-auto">
        <h1 className="mt-2 mb-8 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10">
          {frontMatter.title}
        </h1>
        <div className="prose text-gray-500">{content}</div>
      </div>
    </BaseLayout>
  );
}

export async function getStaticPaths() {
  let paths = getAllProjectIds();

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const fullPath = path.join('content/projects/', `${params.slug}.mdx`);
  const source = await fs.readFileSync(fullPath, 'utf8');

  const { content, data } = await matter(source);
  const frontMatter = JSON.parse(JSON.stringify(data));
  const mdxSource = await renderToString(content, {
    components,
    scope: frontMatter,
  });

  return { props: { source: mdxSource, frontMatter: frontMatter } };
}
