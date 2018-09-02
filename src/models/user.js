import * as bcrypt from 'bcrypt';
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

userSchema.pre('save', function(next) {
  this.password = bcrypt.hashSync(this.password, 10);
  next();
});

userSchema.statics.comparePassword = (plainPassword, hashPassword) => {
  return bcrypt.compareSync(plainPassword, hashPassword);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
