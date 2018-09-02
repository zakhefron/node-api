import jwt, { TokenExpiredError } from 'jsonwebtoken';

import { Config } from './config';
import { getJWTExpiresDate } from './common';

const JWT_OPTIONS = {
  algorithm: Config.get('JWT_ALGORITHM', 'HS256'),
  expiresIn: parseInt(Config.get('JWT_EXPIRE', 3600)),
};
const JWT_SECRET = Config.get('JWT_SECRET', 'node-api');

/**
 * Generate a jwt secret token for user.
 *
 * @param {*} data
 * @return {object}
 */
export const generateJWTToken = (data) => {
  return {
    token: jwt.sign(data, JWT_SECRET, JWT_OPTIONS),
    expireAt: getJWTExpiresDate(),
  };
};

/**
 * Decode a provided jwt token.
 *
 * @param {string} token
 * @return {*}
 */
export const decodeJwtToken = (token) => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET, JWT_OPTIONS);

    // Remove unnecessary jwt related keys
    delete decoded.iat;
    delete decoded.exp;

    return decoded;
  } catch (err) {
    if (err instanceof TokenExpiredError) {
      return {
        message: 'Provided token is expired.',
      };
    }

    return {
      message: 'An error while decoding token.',
    };
  }
};
