import Boom from 'boom';
import mongoose from 'mongoose';
import * as HttpStatus from 'http-status-codes';

import Tag from '../models/tag';
import Post from '../models/post';
import { UserController } from './user';

export class TagController {
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

    const tags = await Tag.paginate({}, { page, limit, lean: true });

    tags.docs = await UserController.populateUserDetailInCollection(tags.docs);

    return res.status(HttpStatus.OK).json(tags);
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
      .then(async (tag) => {
        tag = await UserController.populateUserDetailInObject(tag);
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
      .lean()
      .then(async (tags) => {
        tags = await UserController.populateUserDetail(tags);
        return res.status(HttpStatus.OK).json(tags);
      })
      .catch((err) => {
        return res.json(Boom.internal(err));
      });
  }

  /**
   * Put the tag detail inside passed collection.
   *
   * @param {array} collection
   */
  static async populateTagDetailInCollection(collection) {
    const tagIds = [];

    collection.forEach((item) => {
      tagIds.push(mongoose.Types.ObjectId(item.tag_id));
    });

    const tags = await Tag.find({
      _id: {
        $in: tagIds,
      },
    });

    // transform tags key by tag_id
    const tagsKeyBy = [];
    tags.forEach((tag) => {
      tagsKeyBy[tag['_id']] = tag;
    });

    collection.forEach((item) => {
      item.tagDetail = tagsKeyBy[item['tag_id']] || {};
    });

    return collection;
  }

  /**
   * Put the tag detail inside passed object.
   *
   * @param {object} object
   */
  static async populateTagDetailInObject(object) {
    const tagId = object.tag_id;

    object.tagDetail = await Tag.findById(tagId);

    return object;
  }
}
