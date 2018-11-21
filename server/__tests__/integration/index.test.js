const request = require('supertest');

describe('Express', () => {
  let server;

  beforeEach(() => {
    server = require('../../index');
  });

  it('/auth should respond with 200', () => {
    request(server)
      .get('/auth')
      .end((err, response) => {
        expect(response.status).toBe(200);
      });
  });
});
