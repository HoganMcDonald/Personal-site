const mongoose = require ('mongoose');
const bcrypt = require ('bcrypt');
const Schema = mongoose.Schema;

// schema
const userSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
}); // end schema

// password hasher
userSchema.pre('save', function(next) {
  var user = this;
  if(!user.isModified('password')) {
    return next();
  }
  bcrypt.genSalt(process.env.SALT_WORK_FACTOR, function( err, salt ) {
    bcrypt.hash(user.password, salt, function( err, hash ) {
      user.password = hash;
      next();
    }); // end hash
  }); // end bcrypt
}); // end UserSchema.pre

// password comparison
userSchema.methods.comparePassword = function( attemptedPassword, callback ) {
  bcrypt.compare( attemptedPassword, this.password, function(err, isMatch) {
    callback(isMatch);
  }); // end compare
}; // end UserSchema.comparePassword

// user model
const users = mongoose.model('users', userSchema);
module.exports = users;
