import fs from 'fs';
import path from 'path';

import { Config } from './config';

/**
 * Check if provided path exists or not.
 *
 * @param filePath
 * @return {boolean | * | void}
 */
export const isPathExist = (filePath) => {
  return fs.existsSync(path.resolve(__dirname, filePath));
};

/**
 * Get mongodb connection URI.
 *
 * @return {string}
 */
export const getDatabaseURI = () => {
  return `mongodb://${Config.get('MONGODB_HOST', '127.0.0.1')}:${Config.get('MONGODB_PORT', '27017')}/${Config.get('MONGODB_DATABASE', 'node_api')}`;
};

/**
 * Get the expiry timestamp of the jwt token.
 *
 * @return {Date}
 */
export const getJWTExpiresDate = () => {
  const timeObject = new Date();
  timeObject.setSeconds(parseInt(Config.get('JWT_EXPIRE', 3600)));
  return timeObject;
};
