import fs from 'fs';
import path from 'path';

import { Config } from './config';

export const isPathExist = (filePath) => {
  return fs.existsSync(path.resolve(__dirname, filePath));
};

export const getDatabaseURI = () => {
  return `
    mongodb://${Config.get('MONGODB_HOST', '127.0.0.1')}:${Config.get('MONGODB_PORT', '27017')}/${Config.get('MONGODB_DATABASE', 'node_api')}
  `;
};
