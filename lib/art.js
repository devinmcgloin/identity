import walkDirectory from 'lib/walk';
import sizeOf from 'image-size';

const projectsDirectory = 'public/art';

export const getAllArtworkPaths = async () => {
  let images = walkDirectory(projectsDirectory);
  return images.map((fileName) => {
    let size = sizeOf(fileName);
    return { ...size, path: fileName.replace(/^public/, '') };
  });
};
