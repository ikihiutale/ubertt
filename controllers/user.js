/**
 * User controller.
 */
'use strict';

/**
 * Module dependencies.
 */
var logger = require('../settings/logger'),
    User   = require('../model/user');

/**
 * Create user.
 *
 * @param {object} req The request object
 * @param {object} res The request object
 * @returns {object} the user corresponding to the specified id
 * @api public
 */
function create(req, res) {
  var user = new User();
  image.fileName = req.files.image.name;
  image.url = path.join(req.body.url, req.files.image.path);
  image.user = req.body.userId;

  image.save(function(err, image) {
      if (err) {
          logger.error(err.message);
          return res.status(400).send(err);
      } else {
          res.status(201).json(image);
      }
  });
}


module.exports = {
create: create,
  findAll: findAll
};

/**
 * Find an user by id.
 *
 * @param {Object} req The request object
 * @param {Object} res The request object
 * @returns {Object} the user corresponding to the specified id
 * @api public
 */
function findById(req, res) {
  return User.findById(req.params.id, 'name email avatar', function (err, user) {
        if (err) {
            logger.error(err.message);
            return res.status(400).send(err);
        } else {
            res.json(user);
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

module.exports = {
    findById: findById,
    findAll: findAll
};
