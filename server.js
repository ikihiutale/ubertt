'use strict';

var colors  = require('colors'),
    settings = require('./settings'),
    pkg = require('./package.json');

// Initialize mongoose and start server
settings.mongoose(function startServer() {
  // Initialize express
  var app = settings.express.init();
  // Start up the server on the port specified in the config after we connected to mongodb
  app.listen(settings.config.server.port, function () {
    var serverBanner = ['',
        '******************************'.green,
        '* EXPRESS SERVER'.green,
        '* '.green + pkg.description,
        '* @version '.green + pkg.version,
        '* App started on port: '.green + settings.config.server.port, 
        '* App environment: '.green + settings.config.environment,
        '*'.green,
        '******************************'.green,
        ''].join('\n');
    settings.logger.info(serverBanner);
  });
});

