/**
 * Db configuration
 */

'use strict';

var mongoose = require('mongoose'),
    logger = require('./logger'),
    config = require('./config');

/**
 * Create a db connection:
 *  - open the db connection is when the server process starts
 *  - monitor the connection events: connected, error and disconnected
 *  - close the db connection when the server process terminates
 *
 * @param {function} cb The callback that is called after the db connection is open
 */
function createDbConnection(cb) {
  // Configure mongoose for debug
  if(config.environment === 'development') {
    // mongoose.set('debug', true);
    mongoose.set('debug', function (coll, method, query, doc, options) {
      var queryTmp = JSON.stringify(query), optionsTmp = JSON.stringify(options || {});
      logger.debug('Moongoose: %s.%s(%s) %s', coll, method, queryTmp, optionsTmp);
    });
  }

  // Create the db connection
  mongoose.connect(config.mongodb.uri, config.mongodb.options);

  // The db is successfully connected
  mongoose.connection.on('connected', function () {
    logger.info('Mongoose connected to ' + config.mongodb.uri);
  });

  // The db connection throws an error
  mongoose.connection.on('error', function (err) {
    logger.error('Mongoose connection error: ' + err);
  });

  // The db connection is disconnected
  mongoose.connection.on('disconnected', function () {
    logger.info('Mongoose disconnected');
  });

  // The db the connection is open
  mongoose.connection.once('open', function () {
    if(cb && typeof(cb) === 'function') {
      logger.debug('Mongoose connection is open');
      cb();
    }
  });

  // When the process ends, the db connection is closed
  process.on('SIGINT', function() {
    mongoose.connection.close(function () {
      logger.info('Mongoose disconnected through app termination');
      process.exit(0);
    });
  });
}

module.exports = createDbConnection;
