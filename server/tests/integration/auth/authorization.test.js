const passport = require('passport');
const request = require('supertest');

const fakeJwtToken = require('../../test_helpers/fakeJwtToken');
const app = require('../../../index');
require('../../../services/passport');

const requireAuth = passport.authenticate('jwt', { session: false });

describe('Get to /protected_route', () => {
  beforeAll(() => {
    // Creating fake protected route
    app.get('/protected_route', requireAuth, (req, res) => {
      res.json({ protected_resource: 'just signed in users can see this resource' });
    });
  });

  it('Should return status: unauthorized if user has no the token in the headers', done => {
    request(app)
      .get('/protected_route')
      .set('authorization', 'no-token')
      .end((err, res) => {
        expect(res.status).toBe(401);
        expect(res.body).not.toHaveProperty('protected_resource');
        done();
      });
  });

  it('Should return the wanted resource if the user has the token in the headers', async done => {
    const token = await fakeJwtToken();

    request(app)
      .get('/protected_route')
      .set('authorization', token)
      .end((err, res) => {
        expect(res.body).toHaveProperty('protected_resource');
        done();
      });
  });
});
