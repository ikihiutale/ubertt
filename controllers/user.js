/**
 * User controller.
 */
'use strict';

/**
 * Module dependencies.
 */
var logger = require('../settings/logger'),
    User   = require('../models/user');

/**
 * Create user.
 *
 * @param {object} req The request object
 * @param {object} res The request object
 * @returns {object} the user corresponding to the specified id
 * @api public
 */
function create(req, res) {
  logger.debug("+++ ctrl-user-crete");
  var user = new User({
    forename: req.body.uber_forename,
    surname: req.body.uber_surname,
    email: req.body.uber_email,
    password: req.body.uber_pwd1
  });
  user.save(function(err) {
      if (err) {
          logger.error(err.message);
          // return res.status(400).send(err);
          req.flash("error", err.message);
          res.redirect('/signup')
      } 
      else {
        logger.debug("User created: " + user._id);
        req.flash("info", "User created");
        res.redirect('/');
      }
  });
  logger.debug("--- ctrl-user-crete");
}

/**
 * List of users.
 * @param {object} req The request object
 * @param {object} res The request object
 * @returns {array} the list of users
 * @api public
 */
function findAll(req, res) {
    User.find(function(err, users) {
        if (err) {
            logger.error(err.message);
            return res.status(400).send(err);
        } else {
            res.json(users);
        }
    });
}

module.exports = {
    create: create,
    findAll: findAll
};
