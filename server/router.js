const Authentication = require('./controllers/authentication');

module.exports = (app) => {
  app.post('/auth/register', Authentication.register);
  app.get('/', (req, res) => {
    res.send('hola');
  });
};
