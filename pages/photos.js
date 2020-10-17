import BaseLayout from 'layouts/base';
import useSWR from 'swr';
import GridList from 'components/grid-layout';
import { userStats } from 'lib/unsplash';
import { PageHeader } from 'components/page-header';

const Index = ({ views, downloads, images }) => {
  return (
    <BaseLayout>
      <div className="bg-white pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8">
        <div className="relative max-w-lg lg:max-w-7xl">
          <PageHeader title="Photographs">
            Taken from all over, more on{' '}
            <a
              href="https://unsplash.com/@devinmcgloin"
              className="text-gray-600 hover:text-gray-900 border-b border-dotted"
            >
              Unsplash ↗
            </a>
          </PageHeader>
        </div>
        <div className="mt-10">
          <GridList
            images={images.map((image) => image.urls.regular)}
          ></GridList>
        </div>
      </div>
    </BaseLayout>
  );
};

export async function getStaticProps(context) {
  const unsplashStats = await userStats();
  return {
    props: { ...unsplashStats },
    revalidate: 10800,
  };
}

export default Index;
