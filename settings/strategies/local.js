/**
 * Local strategy will a database to store account info.
 */
'use strict';

var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    logger = require('../logger'),
    User = require('../../app/models/user');

/**
 * Initialize the local strategy for use by Passport.
 * The local strategy require a verify function which receives the credentials
 * (username and password) submitted by the user.  The function must verify
 * that the password is correct and then invoke cb with a user object, which
 * will be set at req.user in route handlers after authentication.
 * @method localStrategy
 */
function init() {
  passport.use(new LocalStrategy({
    usernameField: 'uber_email',
    passwordField: 'uber_pwd1',
    passReqToCallback: true}, function(req, email, password, cb) {
    logger.debug("ctrl-strategies-local email: " + email);
    User.authenticate(email, password, 
      function(err, user) {
        // The message will be displayed on the next page the user visits.
        // No success messages for logging in currently.
        cb(err, user, err ? { error: err.message } : null);
      }
    );
  }));
}

module.exports = {
  init: init
};
