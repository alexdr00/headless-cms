const mongoose = require('mongoose');

const { Schema } = mongoose;
/* eslint-disable */

const postSchema = Schema({
  "_contentType": {
    "type": Schema.Types.ObjectId,
    "default": "5c0efe549b531d611b778779",
    "ref": "ContentType"
  },
  "title": "string",
  "description": "string",
  "/images/hola.jpg": "string"
})

module.exports = mongoose.model('post', postSchema);