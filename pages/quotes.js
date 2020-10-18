import BaseLayout from 'layouts/base';
import useSWR from 'swr';
import GridList from 'components/grid-layout';
import { userStats } from 'lib/unsplash';
import { PageHeader } from 'components/page-header';
import fs from 'fs';
import path from 'path';
import YAML from 'yaml';

const Index = ({ quotes }) => {
  return (
    <BaseLayout>
      <div className="bg-white pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8">
        <div className="relative max-w-lg lg:max-w-7xl">
          <PageHeader
            title="Quotes"
            subtitle="Wisdom from other folks"
          ></PageHeader>
        </div>
        <div className="mt-12 grid gap-12 border-t-2 border-gray-100 pt-12 md:grid-cols-2 lg:gap-x-5">
          {quotes.map((q) => (
            <div>
              <p className="mt-3 text-base leading-6 text-gray-500">{q.text}</p>
              <h3 className="mt-4 text-lg leading-7 font-semibold text-gray-900 float-right">
                {q.author} · {q.year}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </BaseLayout>
  );
};

export async function getStaticProps(context) {
  const fullPath = path.join('content/', 'quotations.yml');
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  const quotes = YAML.parse(fileContents);

  return {
    props: { quotes },
  };
}

export default Index;
