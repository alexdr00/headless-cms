const fs = require('fs');
const modelTemplate = require('../templates/modelTemplate');

const generateModelStructure = (contentTypeId, fields) => {
  const fieldsValues = Object.values(fields);

  const contentTypeReference = {
    _contentType: {
      type: 'Schema.Types.ObjectId',
      default: contentTypeId,
      ref: 'ContentType',
    },
  };

  const generatedModelStructure = { ...contentTypeReference };

  fieldsValues.forEach(fieldValue => {
    const generatedModelKey = fieldValue;
    const generatedModelValue = 'string';
    const modelDocument = { [generatedModelKey]: generatedModelValue };
    // Merges all the documents and creates the model structure
    Object.assign(generatedModelStructure, modelDocument);
  });

  return generatedModelStructure;
};

const modelCreator = (contentTypeId, contentTypeName, fields) => {
  const modelStructure = generateModelStructure(contentTypeId, fields);

  const modelStructureStringified = JSON.stringify(modelStructure, null, 2);

  const newModel = modelTemplate(contentTypeName, modelStructureStringified);

  // Creates model
  fs.writeFileSync(`${__dirname}/../models/${fields.contentTypeName}.js`, newModel);
};

module.exports = modelCreator;
