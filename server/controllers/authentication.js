const jwt = require('jwt-simple');
const { validationResult } = require('express-validator/check');

const Admin = require('../models/base/Admin');
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
  const errors = validationResult(req).formatWith(({ msg }) => `${msg}`);
  const adminExists = await Admin.findOne({ email });

  // ** Validations **
  if (!errors.isEmpty()) {
    return res.status(422).json(makeErrorMessages(errors.array()));
  }

  if (adminExists) {
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
