const { check } = require('express-validator/check');

const validatePassword = password => {
  /**
   * The regex tests that the password contains at least:
   * - 7 characters
   * - 1 uppercase letter
   * - 1 lowercase letter
   * - 1 number
   */
  const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{7,}$/gm;
  const match = password.match(regex);

  return match !== null;
};

module.exports = [
  check('email')
    .isEmail()
    .withMessage('Invalid Email'),

  check('password')
    .custom(validatePassword)
    .withMessage('Password too insecure'),

  check('passwordConfirmation')
    .custom((confirmation, { req }) => confirmation === req.body.password)
    .withMessage('Password must be equal to the confirmation'),
];
