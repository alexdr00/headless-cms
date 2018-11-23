const request = require('supertest');
const { app, serverConnection } = require('../../index');

describe('Express', () => {
  afterEach((done) => {
    serverConnection.close(() => {
      done();
    });
  });

  it('/auth/register should respond with 200', () => {
    request(app)
      .post('/auth/register')
      .end((err, response) => {
        expect(response.status).toBe(200);
      });
  });
});
