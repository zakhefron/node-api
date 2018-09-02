import Boom from 'boom';
import * as HttpStatus from 'http-status-codes';

import Tag from '../models/tag';
import Post from '../models/post';

export class TagController {
  /**
   * Display a listing of the resource.
   *
   * @param {*} req
   * @param {*} res
   * @return {Promise<T | never>}
   */
  loadAll(req, res) {
    return Tag.find({})
      .then((tags) => {
        return res.status(HttpStatus.OK).json(tags);
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
    const tagId = req.params.tagId;
    return Tag.findById(tagId)
      .then((tag) => {
        return res.status(HttpStatus.OK).json(tag);
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
    return Tag.countDocuments()
      .then((totalTags) => {
        return res.status(HttpStatus.OK).json({
          total: totalTags,
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
    const tag = new Tag(req.body);

    // eslint-disable-next-line camelcase
    tag.user_id = req.auth._id;

    return tag
      .save(tag)
      .then((tag) => {
        return res.status(HttpStatus.OK).json(tag);
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
    const tagId = req.params.tagId;
    return Tag.findByIdAndUpdate(tagId, req.body)
      .then(() => {
        return res.status(HttpStatus.OK).json({
          message: 'Tag successfully updated!',
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
    const tagId = req.params.tagId;
    return Tag.findByIdAndRemove(tagId)
      .then(() => {
        return res.status(HttpStatus.OK).json({
          message: 'Tag successfully deleted!',
        });
      })
      .catch((err) => {
        return res.json(Boom.internal(err));
      });
  }

  /**
   * Get all tags of a user.
   *
   * @param {*} req
   * @param {*} res
   */
  getUserAllTags(req, res) {
    const userId = req.params.userId;
    // eslint-disable-next-line camelcase
    return Tag.find({ user_id: userId })
      .then((tags) => {
        return res.status(HttpStatus.OK).json(tags);
      })
      .catch((err) => {
        return res.json(Boom.internal(err));
      });
  }

  /**
   * Get all posts of a specific tag.
   *
   * @param {*} req
   * @param {*} res
   */
  getTagPosts(req, res) {
    const tagId = req.params.tagId;

    // eslint-disable-next-line camelcase
    Post.find({ tag_id: tagId })
      .then((tags) => {
        return res.status(HttpStatus.OK).json(tags);
      })
      .catch((err) => {
        return res.json(Boom.internal(err));
      });
  }
}
