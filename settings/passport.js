/**
 * Authentication
 */
'use strict';

var passport = require('passport'),
    strategy = require('./strategies/local'),
    logger = require('./logger'),
    User = require('../app/models/user');

/**
 * Init authentication 
 * @method init
 * @param {object} app The express application
 * @private
 */
function init(app) {
  // Configure Passport authenticated session persistence.
  // In order to restore authentication state across HTTP requests, Passport needs
  // to serialize users into and deserialize users out of the session.  The
  // typical implementation of this is as simple as supplying the user ID when
  // serializing, and querying the user record by ID from the database when
  // deserializing.
  passport.serializeUser(function(user, cb) {
    logger.debug("ctrl-authenticate-serializeUser: user id: " + user.id);
    cb(null, user.id);
  });

  passport.deserializeUser(function(id, cb) {
    User.findById(id, function(err, user) {
      logger.debug("ctrl-authenticate-deserializeUser: " + id);
      cb(err, user);
    });
  });
  strategy.init();
  // Initialize Passport and restore authentication state, 
  // if any, from the session.
  app.use(passport.initialize());
  app.use(passport.session());
}

module.exports = {
  init: init
};
