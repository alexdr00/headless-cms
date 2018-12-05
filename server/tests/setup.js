const mongoose = require('mongoose');

jest.setTimeout(30000);

beforeAll(done => {
  // Close previous connections
  mongoose.connection.close(() => {
    // Then connect to the test database
    mongoose.connect(
      'mongodb://localhost:27017/minim-cms-test',
      { useNewUrlParser: true },
    );
    done();
  });
});

afterAll(done => {
  mongoose.connection.dropDatabase(() => {
    done();
  });
});
