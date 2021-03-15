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
    <BaseLayout includeFooter includeNewsletter>
      <div className=" pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8">
        <div className="relative max-w-lg lg:max-w-7xl">
          <PageHeader
            title="Bookshelf"
            subtitle="Books I've enjoyed reading."
          />
        </div>
        <div className="mt-12 grid gap-12 border-t-2 border-gray-100 dark:border-gray-700 pt-12 md:grid-cols-2 lg:gap-x-5">
          {books
            .sort((a, b) => b.rating - a.rating)
            .map((b) => (
              <ContentBlock
                key={b.url}
                externalLink={b.url}
                title={`${b.title} · ${b.author}`}
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
