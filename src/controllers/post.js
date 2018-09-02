import Boom from 'boom';
import * as HttpStatus from 'http-status-codes';

import Post from '../models/post';
import { TagController } from './tag';
import { UserController } from './user';

export class PostController {
  /**
   * Display a listing of the resource.
   *
   * @param {*} req
   * @param {*} res
   * @return {Promise<Response>}
   */
  async loadAll(req, res) {
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;

    const posts = await Post.paginate({}, { page, limit, lean: true });

    posts.docs = await TagController.populateTagDetailInCollection(posts.docs);
    posts.docs = await UserController.populateUserDetailInCollection(posts.docs);

    return res.status(HttpStatus.OK).json(posts);
  }

  /**
   * Load a resource by its id.
   *
   * @param {*} req
   * @param {*} res
   * @return {Promise<any | never>}
   */
  loadById(req, res) {
    const postId = req.params.postId;
    return Post.findById(postId)
      .lean()
      .then(async (post) => {
        post = await TagController.populateTagDetailInObject(post);
        post = await UserController.populateUserDetailInObject(post);
        return res.status(HttpStatus.OK).json(post);
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
    return Post.countDocuments()
      .then((totalPosts) => {
        return res.status(HttpStatus.OK).json({
          total: totalPosts,
        });
      })
      .catch((err) => {
        return res.json(Boom.internal(err));
      });
  }

  /**
   * Create a new resource in storage.
   *
   * @param {*} req
   * @param {*} res
   * @return {Promise<Response | never>}
   */
  create(req, res) {
    const post = new Post(req.body);

    // eslint-disable-next-line camelcase
    post.user_id = req.auth._id;

    return post
      .save(post)
      .then((post) => {
        return res.status(HttpStatus.OK).json(post);
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
    const postId = req.params.postId;
    return Post.findByIdAndUpdate(postId, req.body)
      .then(() => {
        return res.status(HttpStatus.OK).json({
          message: 'Post successfully updated!',
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
    const postId = req.params.postId;
    return Post.findByIdAndRemove(postId)
      .then(() => {
        return res.status(HttpStatus.OK).json({
          message: 'Post successfully deleted!',
        });
      })
      .catch((err) => {
        return res.json(Boom.internal(err));
      });
  }

  /**
   * Get all posts a specific user.
   *
   * @param {*} req
   * @param {*} res
   */
  getUserAllPosts(req, res) {
    const userId = req.params.userId;

    // eslint-disable-next-line camelcase
    Post.find({ user_id: userId })
      .then((posts) => {
        return res.status(HttpStatus.OK).json(posts);
      })
      .catch((err) => {
        return res.json(Boom.internal(err));
      });
  }
}
