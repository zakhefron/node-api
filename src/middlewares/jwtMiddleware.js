import unless from 'express-unless';
import * as HttpStatus from 'http-status-codes';

import { decodeJwtToken } from '../helpers/jwt';

/**
 * This Middleware will check for JWT token in HTTP requests
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @return {Response}
 */
export const jwtMiddleware = (req, res, next) => {
  const token = req.query.token;
  if (!token) {
    return res.status(HttpStatus.BAD_REQUEST).json({
      message: 'Token not provided.',
    });
  }

  const decoded = decodeJwtToken(token);

  if (decoded.message) {
    return res.status(HttpStatus.BAD_REQUEST).json(decoded);
  }

  // Put the user in the request
  req.auth = decoded;

  next();
};

jwtMiddleware.unless = unless;
