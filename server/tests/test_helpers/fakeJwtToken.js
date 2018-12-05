const jwt = require('jwt-simple');
const saveAdminInDb = require('./saveAdminInDb');
const keys = require('../../config');

const fakeJwtToken = async () => {
  const { savedAdmin } = await saveAdminInDb();
  const sub = savedAdmin.id;
  const iat = new Date().getTime();
  const token = jwt.encode({ sub, iat }, keys.jwtSecret);

  return token;
};

module.exports = fakeJwtToken;
