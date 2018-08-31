import bcrypt from 'mongoose-bcrypt';
import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema({
  email: {
    type: String,
    trim: true,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
    bcrypt: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

userSchema.plugin(bcrypt);

const User = mongoose.model('User', userSchema);

module.exports = User;
