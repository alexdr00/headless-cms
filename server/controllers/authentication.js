const jwt = require('jwt-simple');
const Admin = require('../models/Admin');
const keys = require('../config');
const makeMessage = require('../lib/makeMessage');

// Generates a jwt token
const tokenForAdmin = admin => {
  const timestamp = new Date().getTime();

  return jwt.encode({ sub: admin.id, iat: timestamp }, keys.jwtSecret);
};

exports.register = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(422)
      .json(makeMessage('msg.error.provideRegisterInfo', 'error'));
  }

  Admin.findOne({ email }, (err, existingAdmin) => {
    if (err) return next(err);

    if (existingAdmin) {
      return res.status(422).json(makeMessage('msg.error.emailInUse', 'error'));
    }

    const newAdmin = new Admin({
      email,
      password,
    });

    newAdmin.save().then(() => {
      res.send({
        token: tokenForAdmin(newAdmin),
        ...makeMessage('msg.success.adminCreated', 'success'),
      });
    });
  });
};
