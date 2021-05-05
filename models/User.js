// models/User.js

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  user_id: {
    type: Number,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String
  }
});

module.exports = User = mongoose.model('user', UserSchema);