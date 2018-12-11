const mongoose = require('mongoose');

const { Schema } = mongoose;
/* eslint-disable */

const posteSchema = Schema({
  "_contentType": {
    "type": Schema.Types.ObjectId,
    "default": "5c0eff669b531d611b77877a",
    "ref": "ContentType"
  },
  "title": "string",
  "description": "string",
  "image": "string"
})

module.exports = mongoose.model('poste', posteSchema);