const fs = require('fs');
const modelTemplate = require('../lib/modelTemplate');

const generateModelStructure = (contentTypeId, fields) => {
  const fieldsKeys = Object.keys(fields);

  const contentTypeReference = {
    _contentType: {
      type: 'Schema.Types.ObjectId',
      default: contentTypeId,
      ref: 'ContentType',
    },
  };

  const generatedModelStructure = { ...contentTypeReference };

  fieldsKeys.forEach(fieldKey => {
    const generatedModelKey = fieldKey;
    const generatedModelValue = 'string';
    const modelDocument = { [generatedModelKey]: generatedModelValue };
    // Merges all the documents and creates the model structure
    Object.assign(generatedModelStructure, modelDocument);
  });

  return generateModelStructure;
};

const modelCreator = (contentTypeId, fields) => {
  const modelStructure = generateModelStructure(contentTypeId, fields);
  const modelStructureStringified = JSON.stringify(modelStructure, null, 2);
  const { contentTypeName } = fields;

  const newModel = modelTemplate(contentTypeName, modelStructureStringified);

  // Creates model
  fs.writeFileSync(`${__dirname}/../models/${fields.contentTypeName}.js`, newModel);
};

module.exports = modelCreator;
