const mongoose = require('mongoose');

const saveAdminInDb = require('../test_helpers/saveAdminInDb');

afterEach(done => {
  mongoose.connection.dropCollection('admins', () => {
    done();
  });
});

describe('Password encryption', () => {
  it('Should encrypt password after saving the admin', async done => {
    const { savedAdmin, password } = await saveAdminInDb();
    expect(savedAdmin.password).not.toBe(password);
    done();
  });

  it('Should compare plain passwords and encrypted password correctly', async done => {
    const { savedAdmin, password } = await saveAdminInDb();
    const isMatch = await savedAdmin.comparePassword(password);
    expect(isMatch).toBe(true);
    done();
  });
});
