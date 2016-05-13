/**
 * User model.
 */
'use strict';

var mongoose = require('mongoose'),
    bcrypt = require('bcrypt-nodejs');

var SALT_VALUE = 10;

/**
 * Define our user schema
 */
var UserSchema = new mongoose.Schema({
  name: {
    first: {
      type: String,
      required: true
    },
    last: {
      type: String,
      required: true
    },
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
    lowercase: true,
    match: [/.+\@.+\..+/, 'Please fill a valid email address']
  },
  created: {
    type: Date, 
    default: Date.now
  }
});

/**
 * User schema validators
 */
UserSchema.path('email').validate(function(email) {
  return email.length; 
}, 'Password cannot be blank');

UserSchema.path('email').validate(function(value, respond) {
  var self = this;
  this.constructor.findOne({email: value}, function(err, user) {
    if(err) { throw err; }
    if(user) {
      if(self.id === user.id) {
        return respond(true);
      }
      return respond(false);
    }
    respond(true);
  });
}, 'The specified email address is already in use');

UserSchema.path('password').validate(function(password) {
  return password.length > 4;
}, 'Your password must be at least 5 characters long');

/**
 * User schema pre hooks
 */
UserSchema.pre('save', function(cb) {
  var user = this;
  // Break out if the password hasn't changed
  if (!user.isModified('password')) {
    return cb();
  }
  
  // Password changed so it need to be hashed
  bcrypt.genSalt(SALT_VALUE, function(err, salt) {
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

/**
 * User schema methods
 */
UserSchema.methods.verifyPassword = function(password, cb) {
  bcrypt.compare(password, this.password, function(err, match) {
    if (err) {
      return cb(err);
    }
    cb(null, match);
  });
};

UserSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(SALT_VALUE), null);
};

/**
 * User schema statics methods
 */
UserSchema.statics.findByEmail = function(email, cb) {
  return this.find({ email: new RegExp(email, 'i') }, cb);
}

/**
 * User schema virtual methods
 */
UserSchema.virtual('name.full').get(function () {
  return this.name.first + ' ' + this.name.last;
});

module.exports = mongoose.model('User', UserSchema);
