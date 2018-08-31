import Boom from 'boom';

import User from '../models/user';

export class UserController {
  /**
   * Get user from jwt.
   *
   * @param {object} req
   * @param {object} res
   */
  me(req, res) {}

  /**
   * Login user by generating a new jwt token.
   *
   * @param {object} req
   * @param {object} res
   */
  login(req, res) {}

  /**
   * Register and login user by generating a new jwt token.
   *
   * @param {object} req
   * @param {object} res
   */
  register(req, res) {
    const user = new User(req.body);
    return user
      .save(user)
      .then((user) => {
        return res.json(user);
      })
      .catch((err) => {
        return res.json(Boom.internal(err));
      });
  }

  /**
   * Display a listing of the resource.
   *
   * @param {object} req
   * @param {object} res
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
   * @param {object} req
   * @param {object} res
   */
  loadById(req, res) {
    const userId = req.params.userId;
    return User.findById(userId)
      .then((user) => {
        return res.json(user);
      })
      .catch((err) => {
        return res.json(Boom.internal(err));
      });
  }

  /**
   * Return the total amount of a specific resource.
   *
   * @param {object} req
   * @param {object} res
   */
  count(req, res) {
    return User.countDocuments()
      .then((totalUsers) => {
        return res.json({
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
   * @param {object} req
   * @param {object} res
   */
  update(req, res) {
    const userId = req.params.userId;
    return User.findByIdAndUpdate(userId, req.body, { upsert: true })
      .then(() => {
        return res.json({
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
   * @param {object} req
   * @param {object} res
   */
  destroy(req, res) {
    const userId = req.params.userId;
    return User.findByIdAndRemove(userId)
      .then(() => {
        return res.json({
          message: 'User successfully deleted!',
        });
      })
      .catch((err) => {
        return res.json(Boom.internal(err));
      });
  }
}
