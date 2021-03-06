import BaseLayout from 'layouts/base';
import useSWR from 'swr';
import GridList from 'components/grid-layout';
import { userPhotos } from 'lib/unsplash';
import { PageHeader } from 'components/page-header';

const Index = ({ images }) => {
  return (
    <BaseLayout>
      <div className=" pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8">
        <div className="relative max-w-lg lg:max-w-7xl">
          <PageHeader title="Photographs">
            <div className="mt-3 sm:mt-4 lg:grid lg:grid-cols-2 lg:gap-5 lg:items-center">
              <p className="text-xl leading-7  text-gray-500 dark:text-gray-400 ">
                Taken from all over, more on{' '}
                <a
                  href="https://unsplash.com/@devinmcgloin"
                  className="text-gray-600 hover:text-gray-900 dark:text-gray-200 dark:hover:text-gray-400 border-b border-dotted"
                >
                  Unsplash ↗
                </a>
              </p>
            </div>
          </PageHeader>
        </div>
        <div className="mt-12 border-t-2 border-gray-100 dark:border-gray-700 pt-12">
          <GridList
            images={images.map((image) => {
              return {
                path: image.urls.regular,
                height: image.height,
                width: image.width,
              };
            })}
          ></GridList>
        </div>
      </div>
    </BaseLayout>
  );
};

export async function getStaticProps(context) {
  const unsplashData = await userPhotos();
  return {
    props: { ...unsplashData },
    revalidate: 10800,
  };
}

export default Index;
