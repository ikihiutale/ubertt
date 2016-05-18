/**
 * Authentication routes.
 */
'use strict';

var router = require('express').Router(),
    passport = require('passport'),
    logger = require('../../settings/logger'),
    user = require('../controllers/user');

/**
 * Set routes.
 * @param {object} app The express application
 */
function setRoutes(app) {
  //========================================================
  // LOGIN
  //========================================================
  router.get('/login', user.renderLogin);
  router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: 'Invalid email or password'
  }));
  
  //========================================================
  // SIGNUP
  //========================================================
  router.get('/signup', user.renderSignup);
  router.post('/signup', user.signup);

  //========================================================
  // LOGOUT
  //========================================================
  router.get('/logout', user.logout);

  app.use(router);
}
module.exports = setRoutes;
