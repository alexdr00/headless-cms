const mongoose = require('mongoose');

const { Schema } = mongoose;
/* eslint-disable */

const blogpostSchema = Schema({
  "_contentType": {
    "type": Schema.Types.ObjectId,
    "default": "5c05be5567664605ebb44283",
    "ref": "ContentType"
  },
  "blogpost": "string",
  "title": "string",
  "description": "string",
  "image": "string",
  "is visible": "string"
})

module.exports = mongoose.model('blogpost', blogpostSchema);