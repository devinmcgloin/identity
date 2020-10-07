import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const projectsDirectory = 'content/projects/';

export const getAllProjectIds = () => {
  const fileNames = fs.readdirSync(projectsDirectory);

  return fileNames.map((fileName) => {
    return {
      params: {
        slug: fileName.replace(/\.mdx$/, ''),
      },
    };
  });
};

export function getSortedProjectData() {
  const fileNames = fs.readdirSync(projectsDirectory);
  const allProjectData = fileNames.map((fileName) => {
    const id = fileName.replace(/\.mdx$/, '');

    const fullPath = path.join(projectsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    const matterResult = matter(fileContents);
    const frontMatter = JSON.parse(JSON.stringify(matterResult));

    return {
      slug: `/projects/${id}`,
      id,
      ...frontMatter.data,
    };
  });

  return allProjectData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}
