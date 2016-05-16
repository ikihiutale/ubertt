/**
 * User controller.
 */
'use strict';

/**
 * Module dependencies.
 */
var logger = require('../../settings/logger'),
    User = require('../models/user');

function prettyJSON(obj) {
  console.log(JSON.stringify(obj, null, 2));
}

var ValidationErrors = {
  REQUIRED: 'required',
  NOTVALID: 'notvalid',
  /* ... */
};

/**
 * Create user.
 *
 * @param {object} req The request object
 * @param {object} res The request object
 * @returns {object} the user corresponding to the specified id
 * @api public
 */
function create(req, res) {
  var user = new User({
    name: {first: req.body.uber_forename, last: req.body.uber_surname},
    email: req.body.uber_email,
    password: req.body.uber_pwd1
  });
  user.save(function(err) {
    if (err) {
      var errMsg = '';
      logger.info("ctrl-user-create: " + prettyJSON(err));
      // go through all the errors...
      for (var errName in err.errors) {
        errMsg += errName + ": " + err.errors[errName].message;
        errMsg += " (" + err.errors[errName].value + ")\n";
      }
      logger.error("ctrl-user-create: " + errMsg);
      req.flash("error", errMsg);
      res.redirect('/signup')
    } 
    else {
      logger.debug("ctrl-user-create: id=" + user._id);
      req.flash("success", "User created");
      res.redirect('/');
    }
  });
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

/**
 * Find one usr.
 * @param {object} req The request object
 * @param {object} res The response object
 * @param {string} id The user id
 * @param {id} next The callback 
 * @returns {object} the user
 * @api public
 */
function findById(req, res, id, next) {
  User.findOne({_id: id}, function(err, user) {
    if (err) {
      return next(err);
    }
    else {
      req.user = user;
      next();
    }
  });
};

module.exports = {
    create: create,
    findAll: findAll,
    findById: findById
};
