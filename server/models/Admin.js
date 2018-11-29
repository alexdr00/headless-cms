const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const { Schema } = mongoose;

const AdminSchema = new Schema({
  email: { type: String, lowercase: true, trim: true },
  password: String,
  // role: String,
});

// Hash salt password before saving into the db
AdminSchema.pre('save', function (next) {
  bcrypt.hash(this.password, 16, (err, hashedPassword) => {
    if (err) return next(err);

    this.password = hashedPassword;
    next();
  });
});

// Method for comparing plain password with hash-salted password
AdminSchema.methods.comparePassword = function (candidatePassword) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(candidatePassword, this.password, (err, isEqual) => {
      if (err) reject(err);

      resolve(isEqual);
    });
  });
};

module.exports = mongoose.model('admin', AdminSchema);
