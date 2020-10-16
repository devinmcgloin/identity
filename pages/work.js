import { getSortedProjectData } from 'lib/projects';
import Link from 'next/link';
import BaseLayout from 'layouts/base';
import { PageHeader } from 'components/page-header';
import { ContentBlock } from 'components/content';

export default function PostPage({ allProjectData }) {
  return (
    <BaseLayout>
      <div className="bg-white pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8">
        <div className="relative max-w-lg mx-auto lg:max-w-7xl">
          <PageHeader title="Work">
            Things I've been up to over the past little while
          </PageHeader>
        </div>
        <div className="mt-12 grid gap-12 border-t-2 border-gray-100 pt-12">
          <ContentBlock
            externalLink={'https://quorum.chat'}
            title="Quorum (2020 - Now)"
            description=""
          >
            <p className="mt-3 text-base leading-6 text-gray-500">
              Quorum is a way to help people build a business around chat.
              Handling all the complications around billing, membership and
              marketing.
            </p>
            <p className="mt-3 text-base leading-6 text-gray-500">
              We're a small team of ~5 at the minute, owning the product end to
              end.
            </p>
          </ContentBlock>
          <ContentBlock
            externalLink={'https://arenahq.io'}
            title="Arena (2019 - Now)"
          >
            <p className="mt-3 text-base leading-6 text-gray-500">
              Arena connects HubSpot and Slack, allowing salespeople to spend
              more time closing deals and talking to prospects instead of
              managing their pipeline.
            </p>
            <p className="mt-3 text-base leading-6 text-gray-500">
              Currently focused on tackling our retention and building out a
              flexible notification system to handle lots of new use cases.
            </p>
            <p className="mt-3 text-base leading-6 text-gray-500">
              Eventual goal is to scale to 5k MRR.
            </p>
          </ContentBlock>
          <ContentBlock
            externalLink={'https://intercom.com'}
            title="Intercom (2018 - 2020)"
          >
            <p className="mt-3 text-base leading-6 text-gray-500">
              I spent a little over 2 and a half years at Intercom, building
              features to support our Sales & Marketing use cases.
            </p>
            <p className="mt-3 text-base leading-6 text-gray-500">
              Intercom was and still is a fantastic place to learn the ins and
              outs of what it means to ship high quality software. They're a
              great bunch of people as well, and I'm sure they're hiring.
            </p>
          </ContentBlock>
        </div>
        <div className="mt-12 grid gap-12 border-t-2 border-gray-100 pt-12 md:grid-cols-2 lg:gap-x-5">
          {allProjectData.map((data) => (
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
  const allProjectData = getSortedProjectData();
  return {
    props: {
      allProjectData,
    },
  };
}
