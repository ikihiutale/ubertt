/**
 * Authentication
 */
'use strict';

var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    logger = require('./logger'),
    User = require('../models/user');

/**
 * Configure the local strategy for use by Passport.
 * The local strategy require a verify function which receives the credentials
 * (username and password) submitted by the user.  The function must verify
 * that the password is correct and then invoke cb with a user object, which
 * will be set at req.user in route handlers after authentication.
 * @method localStrategy
 */
function localStrategy() {
  passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback : true
  },
  function(req, email, password, cb) {
    logger.debug("Passport email: " + email + ", passwd: " + password);
    User.findOne({
      email: email.toLowerCase()
    }, function(err, user) {
      if (err) { return cb(err); }
        // No user found with that email
        if (!user) {
          return cb(null, false, { error: 'The email is not found' });
        }
        // make sure the password is correct
        user.comparePassword(password, function(err, isMatch) {
          if (err) { return cb(err); }
          // Check if passwords didn't match
          if (!isMatch) {
            return cb(null, false, { error: 'The password is not correct.' });
          }
          // Success  
          return cb(null, user);
        });
      });
    }
  ));
}

/**
 * Init authentication 
 * @method init
 * @param {object} app The express application
 * @private
 */

function init(app) {
  localStrategy();
  
  //Configure Passport authenticated session persistence.
  // In order to restore authentication state across HTTP requests, Passport needs
  // to serialize users into and deserialize users out of the session.  The
  // typical implementation of this is as simple as supplying the user ID when
  // serializing, and querying the user record by ID from the database when
  // deserializing.
  passport.serializeUser(function(user, cb) {
    logger.debug("Passport serialized user id: " + user.id);
    cb(null, user.id);
  });

  passport.deserializeUser(function(id, cb) {
    User.findById(id, function(err, user) {
      logger.debug("Passport deserialized user id: " + user.id);
      cb(err, user);
    });
  });
  
  // Initialize Passport and restore authentication state, 
  // if any, from the session.
  app.use(passport.initialize());
  app.use(passport.session());
}

module.exports = {
  init: init
};
