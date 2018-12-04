const ContentType = require('../../models/base/ContentType');
const modelCreator = require('../../lib/modelCreator');
const routerCreator = require('../../lib/routerCreator');
const { makeMessage } = require('../../lib/messageMaker');

const createContentType = async (req, res) => {
  const fields = req.body;
  const newContentType = new ContentType(fields);

  const contentTypeSaved = await newContentType.save();
  const { contentTypeName, _id } = contentTypeSaved;

  modelCreator(_id, contentTypeName, fields);
  routerCreator(contentTypeName);

  res.json(makeMessage('Content Type Created Successfully', 'success'));
};

module.exports = createContentType;
