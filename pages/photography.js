import BaseLayout from 'layouts/base';
import useSWR from 'swr';
import GridList from 'components/grid-layout';
import { userStats } from 'lib/unsplash';

const Index = ({ views, downloads, images }) => {
  return (
    <BaseLayout>
      {views}

      <GridList
        title="Photographs"
        images={images.map((image) => image.urls.regular)}
      ></GridList>
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
