import fs from 'fs';
import path from 'path';

export const isPathExist = (filePath) => {
  return fs.existsSync(path.resolve(__dirname, filePath));
};
