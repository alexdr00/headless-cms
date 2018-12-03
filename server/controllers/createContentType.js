const ContentType = require('../models/base/ContentType');
const modelCreator = require('../lib/modelCreator');

const createContentType = async (req, res, next) => {
  const fields = req.body;
  const newContentType = new ContentType(fields);

  const contentTypeSaved = await newContentType.save();
  modelCreator(contentTypeSaved._id, fields);

  next();
};

module.exports = createContentType;
