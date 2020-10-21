import BaseLayout from 'layouts/base';
import useSWR from 'swr';
import GridList from 'components/grid-layout';
import { userStats } from 'lib/unsplash';
import { PageHeader } from 'components/page-header';
import { ContentBlock } from 'components/content';
import fs from 'fs';
import path from 'path';
import YAML from 'yaml';

const Index = ({ books }) => {
  return (
    <BaseLayout>
      <div className=" pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8">
        <div className="relative max-w-lg lg:max-w-7xl">
          <PageHeader
            title="Books"
            subtitle="Things I've enjoyed reading. ☺️ > 👏 > 👍"
          />
        </div>
        <div className="mt-12 grid gap-12 border-t-2 border-gray-100 dark:border-gray-700 pt-12 md:grid-cols-2 lg:gap-x-5">
          {books
            .sort((a, b) => b.rating - a.rating)
            .map((b) => (
              <ContentBlock
                key={b.url}
                externalLink={b.url}
                title={`${
                  b.rating === 3 ? '☺️' : b.rating === 2 ? '👏' : '👍'
                } ${b.title} · ${b.author}`}
                description={
                  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
                }
              />
            ))}
        </div>
      </div>
    </BaseLayout>
  );
};

export async function getStaticProps(context) {
  const fullPath = path.join('content/', 'books.yml');
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  const books = YAML.parse(fileContents);

  return {
    props: { books },
  };
}

export default Index;
