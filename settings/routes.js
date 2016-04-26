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
  console.log('miksi ei');
  // If they aren't redirect them to the home page
  req.flash('error', 'Could not update your name, please contact our support team');
  res.redirect('/');
}

/**
 * Set user routes.
 * @param {object} app The express application
 * @private
 */
function setRoutes(app, passport) {
  // Displays home page
  router.get('/', ctlrs.home);
  // Displays sign up and log in pages  
  router.get('/login', ctlrs.login);
  router.get('/signup', ctlrs.signup);
  
  // Sends the request through the local sign up strategy, 
  // and if successful takes user to home page, otherwise returns to log in page
  app.post('/signup', passport.authenticate('local_signup', {
    successRedirect: '/',
    failureRedirect: '/login'
  }));

  // Sends the request through the local log in strategy, and if successful 
  // takes user to homepage, otherwise returns then to signin page
  app.post('/login', passport.authenticate('local_signin', {
    successRedirect: '/',
    failureRedirect: '/signin'
    })
  );
  
  // Logs user out of site, deleting them from the session, 
  // and returns to home page
  app.get('/signout', function(req, res){
    var name = req.user.username;
    console.log("LOGGIN OUT " + req.user.username);
    req.logout();
    res.redirect('/');
    req.session.notice = "You have successfully been logged out " + name + "!";
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