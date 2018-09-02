import mongoose, { Schema } from 'mongoose';

const postSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  // eslint-disable-next-line camelcase
  user_id: {
    type: String,
    required: true,
  },
  // eslint-disable-next-line camelcase
  created_at: {
    type: Date,
    default: Date.now,
  },
  // eslint-disable-next-line camelcase
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
