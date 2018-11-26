const mongoose = require('mongoose');

const Admin = require('../../models/Admin');

// callback: what assertion to perform after saving the admin
const saveAdminInDb = callback => {
  const password = '123456';

  const newAdmin = new Admin({
    password,
    email: 'example@example.com',
  });

  newAdmin.save().then(savedAdmin => callback(savedAdmin, password));
};

afterEach(done => {
  mongoose.connection.dropCollection('admins', () => {
    done();
  });
});

describe('Password encryption', () => {
  it('Should encrypt password after saving the admin', done => {
    saveAdminInDb((savedAdmin, password) => {
      expect(savedAdmin.password).not.toBe(password);
      done();
    });
  });

  it('Should compare plain passwords and encrypted password correctly', done => {
    saveAdminInDb((savedAdmin, password) => {
      savedAdmin.comparePassword(password, (err, isMatch) => {
        expect(isMatch).toBe(true);
        done();
      });
    });
  });
});
