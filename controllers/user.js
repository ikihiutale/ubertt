/**
 * User controller.
 */
'use strict';

/**
 * Module dependencies.
 */
var logger = require('../settings/logger'),
    User   = require('../models/user');

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
      prettyJSON(err);
      // go through all the errors...
      for (var errName in err.errors) {
        errMsg += errName + ": " + err.errors[errName].message;
        errMsg += " (" + err.errors[errName].value + ")\n";
        prettyJSON(err.errors[errName]);
        
        /*switch(err.errors[errName].type) {
          case ValidationErrors.REQUIRED:
            errMessage = i18n('Field is required');
            break;
          case ValidationErrors.NOTVALID:
            errMessage = i18n('Field is not valid');
            break;
        }*/
      }
      //logger.debug("JEE: " + err.errors.error.message);
      
      /*
      
      logger.error(err.message);
      if (err.name === 'ValidationError') {
        var errMsg = "Validation failed: ";
        var keys = Object.keys(err.errors);
        var endIdx = keys.length
        // indexed iteration
        for(var idx = 0; idx < endIdx; idx++) {
          var key = keys[idx], value = obj[key];
          // do what you need to here, with index i as position information
        }
      }
      */
      
      req.flash("error", errMsg);
      res.redirect('/signup')
    } 
    else {
      logger.debug("User created: " + user._id);
      req.flash("success", "User created");
      req.flash("notice", "jee jee\n\n\n");
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

module.exports = {
    create: create,
    findAll: findAll
};
