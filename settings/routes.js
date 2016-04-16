/**
 * Routes.
 */
'use strict';

var router = require('express').Router(),
    logger = require('./logger'),
    ctlrs = require('../controllers');

/**
 * Set user routes.
 * @param {object} app The express application
 * @private
 */
function setRoutes(app) {
  router.get('/', ctlrs.home);
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