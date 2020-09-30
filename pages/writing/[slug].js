import renderToString from 'next-mdx-remote/render-to-string';
import hydrate from 'next-mdx-remote/hydrate';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

import ReactPlayer from 'react-player';

const writingDirectory = 'content/writing/';
const getAllPostIds = () => {
  const fileNames = fs.readdirSync(writingDirectory);

  return fileNames.map((fileName) => {
    return {
      params: {
        slug: fileName.replace(/\.mdx$/, ''),
      },
    };
  });
};

const components = { ReactPlayer };

export default function PostPAge({ source, frontMatter }) {
  const content = hydrate(source, { components });
  return (
    <div className="prose prose-lg">
      <h1>{frontMatter.title}</h1>

      {content}
    </div>
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
