import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = 'content/writing/';

export const getAllPostIds = () => {
  const fileNames = fs.readdirSync(postsDirectory);

  return fileNames.map((fileName) => {
    return {
      params: {
        slug: fileName.replace(/\.mdx$/, ''),
      },
    };
  });
};

export function getSortedPostData() {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostData = fileNames.map((fileName) => {
    const id = fileName.replace(/\.mdx$/, '');

    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    const matterResult = matter(fileContents);
    const frontMatter = JSON.parse(JSON.stringify(matterResult));

    return {
      slug: `/writing/${id}`,
      id,
      ...frontMatter.data,
    };
  });

  return allPostData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}
