/**
 * User model.
 */
'use strict';

var mongoose = require('mongoose'),
    bcrypt = require('bcrypt-nodejs');

// Define our user schema
var UserSchema = new mongoose.Schema({
  forename: {
    type: String,
    unique: true,
    required: true
  },
  surname: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    trim: true,
    unique: true,
    required: true,
    lowercase: true
  }
});

// Execute before each user.save() call
UserSchema.pre('save', function(cb) {
  var user = this;
  // Break out if the password hasn't changed
  if (!user.isModified('password')) {
    return cb();
  }
  
  // Password changed so it need to be hashed
  bcrypt.genSalt(5, function(err, salt) {
    if (err) {
      return cb(err);
    }
    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) {
        return cb(err);
      }
      user.password = hash;
      cb();
    });
  });
});

UserSchema.methods.verifyPassword = function(password, cb) {
  bcrypt.compare(password, this.password, function(err, isMatch) {
    if (err) {
      return cb(err);
    }
    cb(null, isMatch);
  });
};

// Export the Mongoose model
module.exports = mongoose.model('User', UserSchema);