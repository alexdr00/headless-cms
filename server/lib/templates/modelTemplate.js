const unStringifyReference = stringifiedStructure => stringifiedStructure.replace('"Schema.Types.ObjectId"', 'Schema.Types.ObjectId');

module.exports = (modelName, fields) => `const mongoose = require('mongoose');

const { Schema } = mongoose;
/* eslint-disable */

const ${modelName}Schema = Schema(${unStringifyReference(fields)})

module.exports = mongoose.model('${modelName}', ${modelName}Schema);`;
