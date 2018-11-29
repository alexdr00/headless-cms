const passport = require('passport');

require('../services/passport');

const Authentication = require('../controllers/authentication');
const changeLanguage = require('../controllers/changeLanguage');
const makeMessage = require('../lib/messageMaker');
const registerValidationChain = require('../lib/registrationValidationChain');

const requireSignIn = passport.authenticate('local', { session: false });
// const requireAuth = passport.authenticate('jwt', { session: false });

module.exports = app => {
  app.post('/auth/register', registerValidationChain, Authentication.register);

  app.get('/change_language', changeLanguage, (req, res) => {
    res.json(makeMessage('El lenguaje se cambió con éxito', 'info'));
  });

  app.post('/auth/sign_in', requireSignIn, Authentication.signIn);
};
