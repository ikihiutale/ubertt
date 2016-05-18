/**
 * Home routes.
 */
'use strict';

var router = require('express').Router(),
    home = require('../controllers/home');

/**
 * Set routes.
 * @param {object} app The express application
 */
function setRoutes(app) {
  router.get('/', home.renderHome);
  app.use(router);
};

module.exports = setRoutes;
