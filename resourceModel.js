// Importing required module
const mongoose = require('mongoose');

// Define the resource schema
const ResourceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  gradeLevel: {
    type: String,
    required: true,
  },
  resourceType: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

// Create the resource model
const Resource = mongoose.model('Resource', ResourceSchema);

// Export the resource model
module.exports = Resource;
