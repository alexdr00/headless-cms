const mongoose = require('mongoose');
const request = require('supertest');
const Admin = require('../../models/Admin');
const app = require('../../index');

afterEach((done) => {
  mongoose.connection
    .dropCollection('admins', () => {
      done();
    });
});

describe('Post to /auth/register', () => {
  it('Should save admin to database', (done) => {
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
    it('Should return error when email is blank', (done) => {
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

    it('Should return error when email already exists', (done) => {
      const email = 'example@example.com';

      const newAdmin = new Admin({
        email,
        password: '1234567',
      });

      newAdmin.save().then(() => {
        request(app)
          .post('/auth/register')
          .send({
            email,
            password: 1234567890,
          })
          .end((err, res) => {
            expect(res.body.message.body).toBe('Email is already in use');
            done();
          });
      });
    });
  });
});
