import renderToString from 'next-mdx-remote/render-to-string';
import hydrate from 'next-mdx-remote/hydrate';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { getAllProjectIds } from 'lib/projects';
import BaseLayout from 'layouts/base';
import { CommonMetadata } from 'components/metadata';
import Image from 'components/zoomable-image';

const components = { Image };

export default function PostPage({ source, frontMatter }) {
  const content = hydrate(source, { components });
  return (
    <BaseLayout includeFooter>
      <CommonMetadata
        title={frontMatter.title}
        description={frontMatter.excerpt}
      />
      <div className="pt-16 pb-20 px-4 text-base max-w-prose mx-auto">
        <div className="mt-2 mb-8 flex items-center justify-between">
          <h1 className="text-3xl leading-8 font-extrabold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10">
            {frontMatter.title}
          </h1>

          <a
            href={`https://github.com/${frontMatter.repo}`}
            className="text-gray-400 hover:text-gray-300"
          >
            <span className="sr-only">GitHub</span>
            <svg
              className="h-7 w-7"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                clip-rule="evenodd"
              />
            </svg>
          </a>
        </div>
        <div className="prose dark:prose-dark">{content}</div>
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
