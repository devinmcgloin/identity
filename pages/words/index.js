import { getSortedPostData } from 'lib/words';
import Link from 'next/link';
import BaseLayout from 'layouts/base';
import parseISO from 'date-fns/parseISO';
import formatRelative from 'date-fns/formatRelative';
import { PageHeader } from 'components/page-header';
import { ContentBlock } from 'components/content';
import { useState } from 'react';

export default function PostPage({ allPostData, tags }) {
  const [selectedTag, setTag] = useState();

  return (
    <BaseLayout includeFooter includeNewsletter>
      <div className=" pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8">
        <div className="relative max-w-lg lg:max-w-7xl">
          <PageHeader
            title="Words"
            subtitle="Occasional thoughts commited to the internet"
          >
            <div className="mt-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  onClick={() => setTag(tag)}
                  className={`cursor-pointer inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium ${
                    tag == selectedTag
                      ? 'bg-sunset-100 text-gray-800 dark:bg-sunset-700 dark:text-gray-200'
                      : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
                  } mr-2 mb-2`}
                >
                  {tag}
                </span>
              ))}
            </div>
          </PageHeader>
        </div>

        <div className="mt-12 grid gap-12 border-t-2 border-gray-100 dark:border-gray-700 pt-12">
          {allPostData
            .filter((post) => {
              if (!selectedTag) return true;
              if (!post.tags || post.tags.length === 0) return false;
              let normalizedTags = post.tags.map((t) => t.toLowerCase());
              return normalizedTags.includes(
                selectedTag.toLowerCase().replace('-', ' ')
              );
            })
            .map((data) => (
              <ContentBlock
                key={data.slug}
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

export async function getStaticProps() {
  const allPostData = getSortedPostData();
  let tags = [
    ...new Set(allPostData.flatMap((post) => post.tags).filter((tag) => !!tag)),
  ];

  return {
    props: {
      allPostData,
      tags,
    },
  };
}
