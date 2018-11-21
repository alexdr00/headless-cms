module.exports = (app) => {
  app.get('/auth', (req, res) => {
    res.send('hi');
  });
};
