/**
 * Routes.
 */
'use strict';

var router = require('express').Router(),
    logger = require('./logger'),
    ctlrs = require('../controllers');

/**
 * Make sure a user is logged in
 * @method isLoggedIn
 * @param {object} req
 * @param {object} res
 * @param {function} next
 * @private
 */
function isLoggedIn(req, res, next) {
  // If user is authenticated in the session, carry on 
  if (req.isAuthenticated()) {
    return next();
  }
  // If they aren't redirect them to the home page
  res.redirect('/');
}

/**
 * Set user routes.
 * @param {object} app The express application
 * @private
 */
function setRoutes(app, passport) {
  router.get('/', ctlrs.home);
  
  router.get('/login', ctlrs.login);
  router.get('/signup', ctlrs.signup);
  //router.route('/signup').post(auth.signup);
  //router.route('/signin').post(auth.signin);
  
  router.route('/signout').get(function(req, res) {
    req.logout();
    res.redirect('/');
  });

  router.get('/profile', isLoggedIn, ctlrs.profile);
  app.use(router);
}

/**
 * Set error routes
 * @method setErrRoutes
 * @param {object} app The express application
 * @private
 */
function setErrRoutes(app) {
  app.use(function (err, req, res, next) {
    
    // If the error object doesn't exists
    if (!err) { return next(); }
    // Log it
    logger.error('Internal error (%d - url: %s): %s', 
            res.statusCode, req.originalUrl, err.stack);
    if (err.code === 'EBADCSRFTOKEN') {
      // handle CSRF token errors here 
      res.status(403).send('Bad CSRFT token - form tampered');
    }
    // Redirect to Internal Server Error
    res.sendStatus(500);
  });
  // Assume 404 since no middleware responded
  app.use(function (req, res) {
    logger.error('Page not found error (url: %s)', req.originalUrl);
    // Redirect to Page not Found
    res.sendStatus(404);
  });
}

module.exports = {
  setRoutes: setRoutes,
  setErrRoutes: setErrRoutes
};