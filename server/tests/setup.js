const mongoose = require('mongoose');

jest.setTimeout(30000);

beforeAll(() => {
  mongoose.connect('mongodb://localhost:27017/minim-cms-test', { useNewUrlParser: true });
});
