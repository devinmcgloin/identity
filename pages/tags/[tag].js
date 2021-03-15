import { getSortedPostData } from 'lib/words';
import Link from 'next/link';
import BaseLayout from 'layouts/base';
import parseISO from 'date-fns/parseISO';
import formatRelative from 'date-fns/formatRelative';
import { PageHeader } from 'components/page-header';
import { ContentBlock } from 'components/content';

export default function PostPage({ tag, taggedPosts }) {
  return (
    <BaseLayout>
      <div className=" pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8">
        <div className="relative max-w-lg lg:max-w-7xl">
          <PageHeader className="capitalize" title={tag}>
            <div className="mt-3 sm:mt-4 lg:grid lg:grid-cols-2 lg:gap-5 lg:items-center">
              <p className="text-xl leading-7  text-gray-500 dark:text-gray-400 ">
                <span className="normal-case">
                  Posts related to <span className="capitalize">{tag}</span>
                </span>
              </p>
            </div>
          </PageHeader>
        </div>

        <div className="mt-12 grid gap-12 border-t-2 border-gray-100 dark:border-gray-700 pt-12">
          {taggedPosts.map((data) => (
            <ContentBlock
              slug={data.slug}
              title={data.title}
              description={data.excerpt}
            />
          ))}
        </div>
      </div>
    </BaseLayout>
  );
}

export async function getStaticPaths() {
  let allPostData = getSortedPostData();

  let tags = allPostData
    .flatMap((post) => post.tags)
    .filter((tag) => !!tag)
    .map((tag) => `/tags/${tag.toLowerCase().replace(' ', '-')}`);

  let uniqueTags = [...new Set(tags)];
  return {
    paths: uniqueTags,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const allPostData = getSortedPostData();
  const taggedPosts = allPostData.filter((post) => {
    if (!post.tags || post.tags.length === 0) return false;
    let normalizedTags = post.tags.map((t) => t.toLowerCase());
    return normalizedTags.includes(params.tag.toLowerCase().replace('-', ' '));
  });

  return {
    props: {
      tag: params.tag.toLowerCase().replace('-', ' '),
      taggedPosts,
    },
  };
}
