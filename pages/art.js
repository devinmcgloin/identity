import BaseLayout from 'layouts/base';
import GridList from 'components/grid-layout';
import { getAllArtworkUris } from 'lib/art';
import { PageHeader } from 'components/page-header';
import { ContentBlock } from 'components/content';

const Index = ({ images }) => {
  return (
    <BaseLayout>
      <div className="pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8">
        <div className="relative max-w-lg lg:max-w-7xl">
          <PageHeader
            title="Art"
            subtitle="Made with a bit of math and lots of tinkering, occasionally plotted on paper"
          />
        </div>
        <div className="mt-12 grid gap-12 border-t-2 border-gray-100 dark:border-gray-700 pt-12 md:grid-cols-2 lg:gap-x-5">
          <ContentBlock
            slug="/interactive/boids"
            title="Boids"
            description="These boids are based on common flocking patterns, and attempt to create a digital Koi Pond from above."
          />
          <ContentBlock
            slug="/interactive/fermat"
            title="Fermat's Spirals"
            description="See Fermat's spiral fill the screen, or tweak the angle to create your own spiral."
          />
          <ContentBlock
            slug="/interactive/solar"
            title="Solar"
            description="A two dimensional solar system, simple rotations in 2d space."
          />
          <ContentBlock
            slug="/interactive/rings"
            title="Additive Rings"
            description="Overlapping rings that vary based on configurable parameters."
          />
          <ContentBlock
            slug="/interactive/bezier"
            title="Bezier"
            description="A simple visualization explaining how bezier curves operate."
          />
        </div>
        <div className="mt-12 border-t-2 border-gray-100 dark:border-gray-700">
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
