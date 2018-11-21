const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const { Schema } = mongoose;

const AdminSchema = new Schema({
  username: {
    type: String,
    unique: true,
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
  },
  password: String,
  role: String,
});

// Hash salt password before saving into the db
AdminSchema.pre('save', function (next) {
  bcrypt.hash(this.password, 16, (err, hashedPassword) => {
    if (err) return next(err);

    this.password = hashedPassword;
    return next();
  });
});

// Method for comparing plain password with hashed password
AdminSchema.methods.comparePassword = function (candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, (err, isEqual) => {
    if (err) return callback(err);

    return callback(null, isEqual);
  });
};

module.exports = mongoose.model('admin', AdminSchema);
