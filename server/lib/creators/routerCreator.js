const fs = require('fs');
const routerTemplate = require('../templates/routerTemplate');

const routerCreator = contentTypeName => {
  const newRouter = routerTemplate(contentTypeName);
  fs.writeFileSync(`${__dirname}/../router/api/${contentTypeName}.js`, newRouter);
};

module.exports = routerCreator;
