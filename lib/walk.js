import fs from 'fs';
import path from 'path';

const walkDirectory = (dir) => {
  let files = [];
  fs.readdirSync(dir).forEach((file) => {
    let fullPath = path.join(dir, file);
    if (fs.lstatSync(fullPath).isDirectory()) {
      files = files.concat(walkDirectory(fullPath));
    } else {
      files.push(fullPath);
    }
  });
  return files;
};

export default walkDirectory;
