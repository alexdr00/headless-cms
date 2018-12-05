const request = require('supertest');
const saveAdminInDb = require('../../test_helpers/saveAdminInDb');
const app = require('../../../index');

describe('Validate Registration', () => {
  it('Should return error when either email is blank', done => {
    request(app)
      .post('/auth/register')
      .send({
        email: '',
        password: 'SafePassword1',
        passwordConfirmation: 'SafePassword1',
      })
      .end((err, res) => {
        expect(res.body.message.errors).toContain('Invalid Email');
        done();
      });
  });

  it('Should return error when email already exists', async done => {
    const { email, password } = await saveAdminInDb();
    const passwordConfirmation = password;

    request(app)
      .post('/auth/register')
      .send({ email, password, passwordConfirmation })
      .end((err, res) => {
        expect(res.body.message.errors).toContain('Email is already in use');
        expect(res.status).toBe(422);
        done();
      });
  });

  it('Should return error when password is insecure', done => {
    const email = 'test@test.com';
    const password = '12345';
    const passwordConfirmation = password;

    request(app)
      .post('/auth/register')
      .send({ email, password, passwordConfirmation })
      .end((err, res) => {
        expect(res.body.message.errors).toContain('Password too insecure');
        expect(res.status).toBe(422);
        done();
      });
  });

  it("Should return error when the password confirmation doesn't match with the password", done => {
    const email = 'test@test.com';
    const password = 'SafePassword1';
    const passwordConfirmation = 'different';

    request(app)
      .post('/auth/register')
      .send({ email, password, passwordConfirmation })
      .end((err, res) => {
        expect(res.body.message.errors).toContain('Password must be equal to the confirmation');
        expect(res.status).toBe(422);
        done();
      });
  });
});
