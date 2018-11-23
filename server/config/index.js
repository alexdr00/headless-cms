const productionKeys = require('./prod');
const developmentKeys = require('./dev');

if (process.env.NODE_ENV === 'production') {
  module.exports = productionKeys;
} else {
  module.exports = developmentKeys;
}
