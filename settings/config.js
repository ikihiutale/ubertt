/**
 * Configuration
 */
'use strict';

var config = {};

config.environment = process.env.NODE_ENV || 'development';

// Token settings
config.token = {
  secret: process.env.TOKEN_SECRET || 'ubertt',
  expiration: process.env.TOKEN_EXPIRATION || 60*60*24 // 24 hours
};

// Server settings
config.server = {
  host: '',
  port: process.env.NODE_PORT || process.env.PORT || 8000
};

// MongoDB settings
config.mongodb = {
  uri: process.env.MONGODB_URI || process.env.MONGOLAB_URI || "mongodb://127.0.0.1:27017/ubertt",
  options: {
    // Note user and pass values apply only if not specified in uri
    user: "", 
    pass: "", 
   // When your application starts up, Mongoose automatically calls ensureIndex 
   // for each defined index in your schema. While nice for development, 
   // it is recommended this behavior be disabled in production since index creation 
   // can cause a significant performance impact. Disable the behavior by setting 
   // the autoIndex option of your schema to false
    config: { autoIndex: config.environment === 'development' }
  }
};

// Export configuration object
module.exports = config;
