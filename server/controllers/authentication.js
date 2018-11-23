const jwt = require('jwt-simple');
const Admin = require('../models/Admin');
const keys = require('../config');

const tokenForAdmin = admin => {
  const timestamp = new Date().getTime();

  return jwt.encode({ sub: admin.id, iat: timestamp }, keys.jwtSecret);
};

exports.register = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(422).json({
      message: {
        type: 'error',
        body: 'You must provide email and password',
      },
    });
  }

  Admin.findOne({ email }, (err, existingAdmin) => {
    if (err) return next(err);

    if (existingAdmin) {
      return res.status(422).json({
        message: {
          type: 'error',
          body: 'Email is already in use',
        },
      });
    }

    const newAdmin = new Admin({
      email,
      password,
    });

    newAdmin.save().then(() => {
      res.send({
        token: tokenForAdmin(newAdmin),
        message: {
          type: 'success',
          body: 'Admin created successfully',
        },
      });
    });
  });
};
