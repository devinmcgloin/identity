import BaseLayout from 'layouts/base';
import { PageHeader } from 'components/page-header';
import { ContentBlock } from 'components/content';
import fs from 'fs';
import path from 'path';
import YAML from 'yaml';
import { useState } from 'react';
import Badge from 'components/badge';
import { groupBy } from 'lib/array';

const Index = ({ things, tags }) => {
  const [selectedTag, setTag] = useState();

  return (
    <BaseLayout includeFooter includeNewsletter>
      <div className=" pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8">
        <div className="relative max-w-lg lg:max-w-7xl">
          <PageHeader
            title="Things"
            subtitle="Interesting Links, Books, Quotes. Collected from around the Internet."
          >
            <div className="mt-2">
              {tags.map((tag) => (
                <Badge
                  key={tag}
                  handleClick={() => setTag(tag)}
                  handleDismiss={() => setTag()}
                  selected={tag == selectedTag}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </PageHeader>
        </div>
        {Object.entries(groupBy(things, 'type')).map(([section, values]) => {
          let filteredValues = values.filter((thing) => {
            if (!selectedTag) return true;
            if (!thing.tags || thing.tags.length === 0) return false;
            let normalizedTags = thing.tags.map((t) => t.toLowerCase());
            return normalizedTags.includes(
              selectedTag.toLowerCase().replace('-', ' ')
            );
          });
          return (
            <div className="mt-12">
              <div class="relative">
                <div
                  class="absolute inset-0 flex items-center"
                  aria-hidden="true"
                >
                  <div class="w-full border-t-2 border-gray-100 dark:border-gray-700"></div>
                </div>
                <div class="relative flex justify-center">
                  <span class="capitalize px-3 bg-white dark:bg-off-black text-lg font-medium text-gray-900 dark:text-gray-200">
                    {section}s
                  </span>
                </div>
              </div>
              {filteredValues.length > 0 ? (
                <div className="mt-3 grid gap-6 md:grid-cols-2 lg:gap-x-5">
                  {filteredValues.map((l) => (
                    <a
                      href={l.url}
                      className={`bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200 rounded-md shadow-sm p-6 ${
                        l.url && 'transform hover:scale-105 duration-200'
                      }`}
                    >
                      <div className="text-center text-md font-semibold">
                        {l.title}
                      </div>
                      <div className="font-serif pb-2 text-xl leading-7 font-medium">
                        {l.text}
                      </div>
                      <div className="text-center text-base text-gray-400">
                        {l.author}
                      </div>
                    </a>
                  ))}
                </div>
              ) : (
                <div
                  className={`flex justify-center content-evenly mt-3 bg-gray-100 dark:bg-gray-700 dark:border-gray-600 rounded-md shadow-sm w-full h-32 p-6 border-dashed border-2`}
                ></div>
              )}
            </div>
          );
        })}
      </div>
    </BaseLayout>
  );
};

export async function getStaticProps(context) {
  const fullPath = path.join('content/', 'things.yml');
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  const things = YAML.parse(fileContents);
  let tags = [
    ...new Set(things.flatMap((thing) => thing.tags).filter((tag) => !!tag)),
  ];

  return {
    props: { things, tags },
  };
}

export default Index;
