const passport = require('passport');
const { Strategy: JwtStrategy } = require('passport-jwt');
const { ExtractJwt } = require('passport-jwt');
const LocalStrategy = require('passport-local');

const Admin = require('../models/base/Admin');
const keys = require('../config');

// Local Strategy (This is just for signing in)
const localOptions = { usernameField: 'email' };

const localLogin = new LocalStrategy(localOptions, async (email, password, done) => {
  const adminFound = await Admin.findOne({ email });
  if (!adminFound) return done(null, false);

  const isMatch = await adminFound.comparePassword(password);
  if (!isMatch) return done(null, false);

  return done(null, adminFound);
});

// JWT Strategy
// This is for signing in. Returns a token for the browser.
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: keys.jwtSecret,
};

const jwtLogin = new JwtStrategy(jwtOptions, async (payload, done) => {
  const adminFound = await Admin.findById(payload.sub);

  if (!adminFound) return done(null, false);

  return done(null, adminFound);
});

passport.use(jwtLogin);
passport.use(localLogin);
