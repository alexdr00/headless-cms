const jwt = require('jwt-simple');
const Admin = require('../models/Admin');
const keys = require('../config');

const { makeMessage, makeErrorMessages } = require('../lib/messageMaker');

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

  const existingAdmin = await Admin.findOne({ email });

  if (existingAdmin) {
    return res.status(422).json(makeErrorMessages(['Email is already in use']));
  }

  const newAdmin = new Admin({ email, password });
  await newAdmin.save();

  res.json({
    token: tokenForAdmin(newAdmin),
    ...makeMessage('Admin created successfully', 'success'),
  });

  next();
};
