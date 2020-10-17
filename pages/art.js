import BaseLayout from 'layouts/base';
import GridList from 'components/grid-layout';
import { getAllArtworkUris } from 'lib/art';
import { PageHeader } from 'components/page-header';

const Index = ({ images }) => {
  return (
    <BaseLayout>
      <div className="bg-white pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8">
        <div className="relative max-w-lg lg:max-w-7xl">
          <PageHeader
            title="Artwork"
            subtitle="Made with a bit of math and lots of tinkering, occasionally plotted on paper"
          />
        </div>
        <div className="mt-10">
          <GridList images={images}></GridList>
        </div>
      </div>
    </BaseLayout>
  );
};

export async function getStaticProps(context) {
  const images = await getAllArtworkUris();
  return {
    props: { images },
    revalidate: 10800,
  };
}

export default Index;
