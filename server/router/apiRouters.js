const requireDir = require('require-dir');
const passport = require('passport');

const apiRouters = requireDir('./api');
require('../services/passport');

const requireAuth = passport.authenticate('jwt', { session: false });

module.exports = app => {
  const routers = Object.values(apiRouters);

  routers.forEach(router => {
    app.use('/api', requireAuth, router);
  });
};
