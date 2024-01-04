// Importing required module
const mongoose = require('mongoose');

// Define the user schema
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  progress: {
    type: Object,
    default: {},
  },
  resources: {
    type: Array,
    default: [],
  },
});

// Create the user model
const User = mongoose.model('User', UserSchema);

// Export the user model
module.exports = User;
