const mongoose = require('mongoose');

const { Schema } = mongoose;

const ContentTypeSchema = new Schema({
  contentTypeName: String,
  shortText: String,
  longText: String,
  number: String,
  time: String,
  date: String,
  dateTime: String,
  file: String,
  image: String,
  code: String,
  boolean: String,
  timestamp: { type: Date, default: new Date() },
});

module.exports = mongoose.model('ContentType', ContentTypeSchema);
