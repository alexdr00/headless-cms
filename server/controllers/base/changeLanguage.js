const i18n = require('i18n');

module.exports = (req, res, next) => {
  i18n.setLocale(req.query.language);
  next();
};
