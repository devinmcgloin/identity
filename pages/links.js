import BaseLayout from 'layouts/base';
import { PageHeader } from 'components/page-header';
import { ContentBlock } from 'components/content';
import fs from 'fs';
import path from 'path';
import YAML from 'yaml';
import { useState } from 'react';
import Badge from 'components/badge';

const Index = ({ links, tags }) => {
  const [selectedTag, setTag] = useState();

  return (
    <BaseLayout includeFooter includeNewsletter>
      <div className=" pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8">
        <div className="relative max-w-lg lg:max-w-7xl">
          <PageHeader
            title="Links"
            subtitle="Interesting Links, Collected from around the Internet."
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
        <div className="mt-12 grid gap-6 border-t-2 border-gray-100 dark:border-gray-700 pt-12 md:grid-cols-2 lg:gap-x-5">
          {links
            .filter((link) => {
              if (!selectedTag) return true;
              if (!link.tags || link.tags.length === 0) return false;
              let normalizedTags = link.tags.map((t) => t.toLowerCase());
              return normalizedTags.includes(
                selectedTag.toLowerCase().replace('-', ' ')
              );
            })
            .map((l) => (
              <a
                href={l.url}
                className="bg-gray-100 rounded-md shadow-sm p-4 transform hover:scale-105 duration-200 text-center"
              >
                <div>{l.title}</div>
              </a>
            ))}
        </div>
      </div>
    </BaseLayout>
  );
};

export async function getStaticProps(context) {
  const fullPath = path.join('content/', 'links.yml');
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  const links = YAML.parse(fileContents);
  let tags = [
    ...new Set(links.flatMap((link) => link.tags).filter((tag) => !!tag)),
  ];

  return {
    props: { links, tags },
  };
}

export default Index;
