const Admin = require('../../models/Admin');

const saveAdminInDb = async (email = 'test@test.com', password = '12345678') => {
  const newAdmin = new Admin({ password, email });
  const savedAdmin = await newAdmin.save();

  return new Promise(resolve => {
    resolve({ savedAdmin, email, password });
  });
};

module.exports = saveAdminInDb;
