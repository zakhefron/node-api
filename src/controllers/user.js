import Boom from 'boom';
import * as HttpStatus from 'http-status-codes';
import { validationResult } from 'express-validator/check';

import User from '../models/user';
import { generateJWTToken } from '../helpers/jwt';

export class UserController {
  /**
   * Get user from jwt token.
   *
   * @param {*} req
   * @param {*} res
   * @return {Response}
   */
  me(req, res) {
    return res.status(HttpStatus.OK).json(req.auth);
  }

  /**
   * Login user by generating a new jwt token.
   *
   * @param {*} req
   * @param {*} res
   * @return {Promise<Response>}
   */
  async login(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(HttpStatus.UNPROCESSABLE_ENTITY).json({ errors: errors.array() });
    }

    const email = req.body.email;
    const password = req.body.password;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(HttpStatus.NOT_FOUND).json({
        message: 'User not found',
      });
    }

    const matched = User.comparePassword(password, user.password);
    if (!matched) {
      return res.status(HttpStatus.UNAUTHORIZED).json({
        message: 'Please provide a correct password.',
      });
    }

    const jwtToken = generateJWTToken(user.toObject({ getters: true }));

    return res.status(HttpStatus.OK).json(jwtToken);
  }

  /**
   * Register and login user by generating a new jwt token.
   *
   * @param {*} req
   * @param {*} res
   * @return {Promise<T | never>}
   */
  register(req, res) {
    const user = new User(req.body);
    return user
      .save(user)
      .then((user) => {
        return res.status(HttpStatus.OK).json(user);
      })
      .catch((err) => {
        return res.json(Boom.internal(err));
      });
  }

  /**
   * Display a listing of the resource.
   *
   * @param {*} req
   * @param {*} res
   * @return {Promise<T | never>}
   */
  loadAll(req, res) {
    return User.find({})
      .then((users) => {
        return res.json(users);
      })
      .catch((err) => {
        return res.json(Boom.internal(err));
      });
  }

  /**
   * Load a resource by its id.
   *
   * @param {*} req
   * @param {*} res
   * @return {Promise<any | never>}
   */
  loadById(req, res) {
    const userId = req.params.userId;
    return User.findById(userId)
      .then((user) => {
        return res.status(HttpStatus.OK).json(user);
      })
      .catch((err) => {
        return res.json(Boom.internal(err));
      });
  }

  /**
   * Return the total amount of a specific resource.
   *
   * @param {*} req
   * @param {*} res
   * @return {Promise<any | never>}
   */
  count(req, res) {
    return User.countDocuments()
      .then((totalUsers) => {
        return res.status(HttpStatus.OK).json({
          total: totalUsers,
        });
      })
      .catch((err) => {
        return res.json(Boom.internal(err));
      });
  }

  /**
   * Update the specified resource in storage.
   *
   * @param {*} req
   * @param {*} res
   * @return {Promise<any | never>}
   */
  update(req, res) {
    const userId = req.params.userId;
    return User.findByIdAndUpdate(userId, req.body)
      .then(() => {
        return res.status(HttpStatus.OK).json({
          message: 'User successfully updated!',
        });
      })
      .catch((err) => {
        return res.json(Boom.internal(err));
      });
  }

  /**
   * Remove the specified resource from storage.
   *
   * @param {*} req
   * @param {*} res
   * @return {Promise<any | never>}
   */
  destroy(req, res) {
    const userId = req.params.userId;
    return User.findByIdAndRemove(userId)
      .then(() => {
        return res.status(HttpStatus.OK).json({
          message: 'User successfully deleted!',
        });
      })
      .catch((err) => {
        return res.json(Boom.internal(err));
      });
  }
}
