const mongoose = require('mongoose');

const { Schema } = mongoose;
/* eslint-disable */

const productSchema = Schema({
  "contentType": {
    "type": Schema.Types.ObjectId,
    "default": "5c01e58c1abebe3722a0d855",
    "ref": "ContentType"
  },
  "product": "string",
  "name": "string",
  "description": "string",
  "price": "string",
  "image": "string"
})

module.exports = mongoose.model('product', productSchema);