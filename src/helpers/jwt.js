import jwt from 'jsonwebtoken';

import { Config } from './config';
import { getJWTExpiresDate } from './common';

/**
 * Generate a jwt secret token for user.
 *
 * @param {*} data
 */
export const generateJWTToken = (data) => {
  const jwtSecret = Config.get('JWT_SECRET', 'node-api');
  const jwtAlgorithm = Config.get('JWT_ALGORITHM', 'HS256');
  const jwtExpire = parseInt(Config.get('JWT_EXPIRE', 3600));

  return {
    token: jwt.sign(data, jwtSecret, {
      expiresIn: jwtExpire,
      algorithm: jwtAlgorithm,
    }),
    expireAt: getJWTExpiresDate(),
  };
};

/**
 * Decode a provided jwt token.
 *
 * @param {string} token
 */
export const decodeJwtToken = (token) => {};
