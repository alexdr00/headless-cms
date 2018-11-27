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
  it('Should save admin to database', done => {
    request(app)
      .post('/auth/register')
      .send({
        email: 'example@example.com',
        password: '12345',
      })
      .end((err, res) => {
        expect(res.body.message.body).toBe('Admin created successfully');
        done();
      });
  });

  describe('Validation', () => {
    it('Should return error when email is blank', done => {
      request(app)
        .post('/auth/register')
        .send({
          email: '',
          password: '12345',
        })
        .end((err, res) => {
          expect(res.body.message.body).toBe('You must provide email and password');
          done();
        });
    });

    it('Should return error when email already exists', async done => {
      const { email, password } = await saveAdminInDb();

      request(app)
        .post('/auth/register')
        .send({ email, password })
        .end((err, res) => {
          expect(res.body.message.body).toBe('Email is already in use');
          done();
        });
    });
  });
});

describe('Post to /auth/sign_in', () => {
  it('Should return sign-in token when credentials are OK', async done => {
    const { email, password } = await saveAdminInDb();

    request(app)
      .post('/auth/sign_in')
      .send({ email, password })
      .end((err, res) => {
        const tokenEncoded = res.body.token;
        const tokenDecoded = jwt.decode(tokenEncoded, keys.jwtSecret);
        expect(tokenDecoded).toHaveProperty('sub');
        done();
      });
  });
});
