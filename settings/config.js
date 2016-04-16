/**
 * Configuration
 */
'use strict';

var config = {};

config.environment = process.env.NODE_ENV || 'development';

// Token settings
config.token = {
    secret: process.env.TOKEN_SECRET || 'ubertt',
    expiration: process.env.TOKEN_EXPIRATION || 60*60*24 //24 hours
};

// Server settings
config.server = {
    host: '',
    port: process.env.NODE_PORT || process.env.PORT || 8000
};

// MongoDB settings
config.mongodb = {
    uri: process.env.MONGODB_URI || process.env.MONGOLAB_URI || "mongodb://127.0.0.1:27017/ubertt",
    options: {"user": "", "pass": ""}
};

// Export configuration object
module.exports = config;
