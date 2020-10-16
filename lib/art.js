import walkDirectory from 'lib/walk';

const projectsDirectory = 'public/art';

export const getAllArtworkUris = async () => {
  let images = walkDirectory(projectsDirectory);
  return images.map((fileName) => fileName.replace(/^public\//, ''));
};
