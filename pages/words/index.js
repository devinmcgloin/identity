import { getSortedPostData } from 'lib/words';
import Link from 'next/link';
import BaseLayout from 'layouts/base';
import parseISO from 'date-fns/parseISO';
import formatRelative from 'date-fns/formatRelative';
import { PageHeader } from 'components/page-header';
import { ContentBlock } from 'components/content';

export default function PostPage({ allPostData }) {
  return (
    <BaseLayout>

      <div className="bg-white pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8">
        <div className="relative max-w-lg lg:max-w-7xl">
          <PageHeader title="Words">
            Occasional thoughts commited to the internet
          </PageHeader>
        </div>

        <div className="mt-12 grid gap-12 border-t-2 border-gray-100 pt-12">
          {allPostData.map((data) => (
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

export async function getStaticProps() {
  const allPostData = getSortedPostData();
  return {
    props: {
      allPostData,
    },
  };
}
