const jwt = require('jwt-simple');
const Admin = require('../models/Admin');
const keys = require('../config');

const makeMessage = require('../lib/makeMessage');

// Generates a jwt token
const tokenForAdmin = admin => {
  const timestamp = new Date().getTime();

  return jwt.encode({ sub: admin.id, iat: timestamp }, keys.jwtSecret);
};

exports.signIn = (req, res, next) => {
  res.json({ token: tokenForAdmin(req.user) });
  next();
};

exports.register = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(422).json(makeMessage('msg.error.provideRegisterInfo', 'error'));
  }

  const existingAdmin = await Admin.findOne({ email });

  if (existingAdmin) {
    return res.status(422).json(makeMessage('msg.error.emailInUse', 'error'));
  }

  const newAdmin = new Admin({ email, password });
  await newAdmin.save();

  res.json({
    token: tokenForAdmin(newAdmin),
    ...makeMessage('msg.success.adminCreated', 'success'),
  });

  next();
};
