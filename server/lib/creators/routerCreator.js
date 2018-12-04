const fs = require('fs');
const routerTemplate = require('../templates/routerTemplate');

const routerCreator = contentTypeName => {
  const newRouter = routerTemplate(contentTypeName);
  const routersPath = `${__dirname}/../../router/api/${contentTypeName}.js`;

  fs.writeFileSync(routersPath, newRouter);
};

module.exports = routerCreator;
