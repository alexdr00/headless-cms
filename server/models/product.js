const mongoose = require('mongoose');

const { Schema } = mongoose;
/* eslint-disable */

const productSchema = Schema({
  _contentType: {
    type: Schema.Types.ObjectId,
    default: '5c05bc9732a9b6042b8584a6',
    ref: 'ContentType',
  },
  // "product": "string",
  name: 'string',
  description: 'string',
  price: 'string',
  image: 'string',
});

module.exports = mongoose.model('product', productSchema);
