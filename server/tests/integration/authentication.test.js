const mongoose = require('mongoose');
const request = require('supertest');
const jwt = require('jwt-simple');

const saveAdminInDb = require('../test_helpers/saveAdminInDb');
const app = require('../../index');
const keys = require('../../config');

afterEach(done => {
  mongoose.connection.dropCollection('admins', () => {
    done();
  });
});

describe('Post to /auth/register', () => {
  it('Should save admin to database when data is OK', done => {
    request(app)
      .post('/auth/register')
      .send({
        email: 'example@example.com',
        password: 'SafePassword1',
        passwordConfirmation: 'SafePassword1',
      })
      .end((err, res) => {
        expect(res.body.message.body).toBe('Admin created successfully');
        expect(res.status).toBe(200);
        done();
      });
  });
});

describe('Post to /auth/sign_in', () => {
  it('Should return sign-in token when credentials exist in the db', async done => {
    const { email, password } = await saveAdminInDb();

    request(app)
      .post('/auth/sign_in')
      .send({ email, password })
      .end((err, res) => {
        const tokenEncoded = res.body.token;
        const tokenDecoded = jwt.decode(tokenEncoded, keys.jwtSecret);
        expect(tokenDecoded).toHaveProperty('sub');
        expect(tokenDecoded).toHaveProperty('iat');
        done();
      });
  });

  it("Should return status: unauthorized when credentials don't exist in the db", done => {
    request(app)
      .post('/auth/sign_in')
      .send({ email: 'inexistent@inexistent.com', password: '123456' })
      .end((err, res) => {
        expect(res.status).toBe(401);
        done();
      });
  });
});
