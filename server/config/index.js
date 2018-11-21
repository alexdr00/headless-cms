const productionKeys = require('./prod');
const developmentKeys = require('./dev');
const testingKeys = require('./testing');

if (process.env.NODE_ENV === 'production') {
  module.exports = productionKeys;
} else if (process.env.NODE_ENV === 'testing') {
  module.exports = testingKeys;
} else {
  module.exports = developmentKeys;
}
