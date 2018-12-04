const fs = require('fs');
const modelTemplate = require('../templates/modelTemplate');

/**
 * Generates an object that will be the structure for the model that will be created.
 * @param {String} contentTypeId - Content Type's ObjectId from which it is created.
 * @param {Object} fields - Fields the new Content Type will have.
 * @returns {Object} Model structure that will be written in the file.
 */
const generateModelStructure = (contentTypeId, contentTypeName, fields) => {
  const fieldsValues = Object.values(fields);

  const contentTypeReference = {
    _contentType: {
      type: 'Schema.Types.ObjectId',
      default: contentTypeId,
      ref: 'ContentType',
    },
  };

  // Specify the reference to the Content Type from which it is created.
  const generatedModelStructure = { ...contentTypeReference };

  // Merges all the documents and creates the model structure
  fieldsValues.forEach(fieldValue => {
    // Skip the Content Type name field.
    if (fieldValue === contentTypeName) return;
    const generatedModelKey = fieldValue;
    const generatedModelValue = 'string';
    const modelDocument = { [generatedModelKey]: generatedModelValue };

    Object.assign(generatedModelStructure, modelDocument);
  });

  return generatedModelStructure;
};

// Creates the model with the specified structure.
const modelCreator = (contentTypeId, contentTypeName, fields) => {
  const modelStructure = generateModelStructure(contentTypeId, contentTypeName, fields);

  // It is necessry to stringify the structure so that it works correctly with the template.
  const modelStructureStringified = JSON.stringify(modelStructure, null, 2);
  const newModel = modelTemplate(contentTypeName, modelStructureStringified);
  const modelsPath = `${__dirname}/../../models/${contentTypeName}.js`;

  // Writes the model
  fs.writeFileSync(modelsPath, newModel);
};

module.exports = modelCreator;
