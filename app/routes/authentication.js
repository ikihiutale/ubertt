/**
 * Authentication routes.
 */
'use strict';

var router = require('express').Router(),
    authentication = require('../controllers/authentication');

/**
 * Set routes.
 * @param {object} app The express application
 */
function setRoutes(app) {
  /*
  router.post('/auth/login', authentication.login);
  router.get('/auth/logout', authentication.logout);
  router.get('/auth/signup', authentication.signup);
  app.use(router);
  */
}
module.exports = setRoutes;
