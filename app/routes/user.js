/**
 * Authentication routes.
 */
'use strict';

var router = require('express').Router(),
    passport = require('passport'),
    user = require('../controllers/user');

/**
 * Set routes.
 * @param {object} app The express application
 */
function setRoutes(app) {
  router.get('/login', user.renderLogin);
  router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
  }));

  /*
  router.post('/auth/login', authentication.login);
  router.get('/auth/logout', authentication.logout);
  router.get('/auth/signup', authentication.signup);
  app.use(router);
  */
  app.use(router);
}
module.exports = setRoutes;
