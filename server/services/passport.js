const passport = require('passport');
const { Strategy: JwtStrategy } = require('passport-jwt');
const { ExtractJwt } = require('passport-jwt');
const LocalStrategy = require('passport-local');

const Admin = require('../models/Admin');
const keys = require('../config');

// Local Strategy (This is just for signing in)
const localOptions = { usernameField: 'email' };

const localLogin = new LocalStrategy(localOptions, (email, password, done) => {
  Admin.findOne({ email }, (err, adminFound) => {
    if (err) return done(err);
    if (!adminFound) return done(null, false);

    adminFound.comparePassword(password, (error, isEqual) => {
      if (error) return done(err);
      if (!isEqual) return done(null, false);
      return done(null, adminFound);
    });
  });
});

// JWT Strategy (This gets the sign-in token for the browser to be used)
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: keys.jwtSecret,
};

const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {
  Admin.findById(payload.sub).then(adminFound => {
    if (!adminFound) return done(null, false);

    return done(null, adminFound);
  }).catch(err => done(err));
});

passport.use(jwtLogin);
passport.use(localLogin);
