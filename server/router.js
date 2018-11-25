const Authentication = require('./controllers/authentication');
const changeLanguage = require('./controllers/changeLanguage');
const makeMessage = require('./lib/makeMessage');

module.exports = (app) => {
  app.post('/auth/register', Authentication.register);

  app.get('/', (req, res) => {
    res.send('hola');
  });

  app.get('/change_language', changeLanguage, (req, res) => {
    res.json(makeMessage('msg.info.languageChanged', 'info'));
  });
};
