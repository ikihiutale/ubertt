/**
 * Application's middleware initialization and settings 
 */
'use strict';

var cors = require('cors'),
    path = require('path'),
    // Automated logging of request/response
    morgan = require('morgan'),
    helmet = require('helmet'),
    express = require('express'),
    // Templating engine 
    exphbs = require('express-handlebars'),
    // Helps parsing any form fields that are submitted 
    // via a HTML form submission from a browser
    bodyParser = require('body-parser'),
    // BodyParser supports only JSON and URL encoded form 
    // submissions and not multipart form submissions that 
    // are used in the case of file upload.
    // The multer module supports the file uploads
    multer = require('multer'),
    // For older browsers that don't properly support 
    // REST HTTP verbs the methodOverride allows 
    // this to be faked using a special hidden input field
    methodOverride = require('method-override'),
    // Allows cookies to be sent and received
    cookieParser = require('cookie-parser'),
    // Handles any errors that occur throughout 
    // the entire middleware process
    errorHandler = require('errorhandler'),
    // A library for performing numerous different types of 
    // date string formatting
    moment = require('moment'),
    favicon = require('serve-favicon'),
    config = require('./config'),
    routes = require('./routes'),
    logger = require('./logger');



/**
 * Set routes and error handling
 * @method setRoutes
 * @param {Object} app The express application
 * @private
 */
function setRoutes(app) {
  routes.setRoutes(app);
  
  // Predefined static resource directory for css, js etc.
  // NOTE: it's important that your static middleware is 
  // defined after the route settings (routes.setRoutes) so that 
  // static assets aren't inadvertently taking priority over a 
  // matching route that may have been defined.
  app.use('/public', express.static(path.join(__dirname, '../public')));

  routes.setErrRoutes(app);
}

/**
 * Set view engine
 * @method setViewEngine
 * @param {Object} app The express application
 * @private
 */
function setViewEngine(app) {
  // The used file extension for Handlebars is .hbs. It could be
  // anything as long as the first parameter to the app.engine() 
  // function and the second parameter in the app.set('view engine') 
  // function are identical. 
  app.set('views', path.join(__dirname, '../views')); 
  app.engine('.hbs', exphbs.create({    
    defaultLayout: 'main',    
    layoutsDir: path.join(app.get('views'), '/layouts'),    
    partialsDir: [path.join(app.get('views'), '/partials')],
    extname: '.hbs' }).engine);
  app.set('view engine', '.hbs'); 
}

/**
 * Initialize the application middleware.
 * @param {object} app The express application
 * @private
 */
function setMiddleware(app) {
  // Environment dependent middleware
  if (config.environment === 'development') {
    // Enable logger (morgan)
    app.use(morgan('dev', { "stream": logger.stream }));
    // app.use(morgan('dev'));
    // Disable views cache
    app.set('view cache', false);
  } 
  // Request body parsing middleware should be above methodOverride
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(methodOverride());
  app.use(cookieParser(config.token.secret));
  // Wire up our routes via the app object.
  // Router is used and it responds to requests such as 
  // GET, POST, PUT, and UPDATE
  setRoutes(app);

 
  // uncomment after placing your favicon in /public
  //app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
  setViewEngine(app);
  if (config.environment === 'development') {   
    app.use(errorHandler()); 
  }
}

/**
 * Set Helmet headers configuration.
 * @method setHelmetHeaders
 * @param {object} app The express application
 * @private
 */
function setHelmet(app) {
  // Use helmet to secure Express headers
  app.use(helmet.xframe());
  app.use(helmet.xssFilter());
  app.use(helmet.nosniff());
  app.use(helmet.ienoopen());
  app.disable('x-powered-by');
}

/**
 * Configure CORS (Cross-Origin Resource Sharing) headers to 
 * support Cross-site HTTP requests.
 * @method setCors
 * @param {object} app The express application
 * @private
 */
function setCors(app) {
  // setup CORS
  app.use(cors());
  app.use(function(req, res, next) {
    // Website you wish to allow to connect
    res.set('Access-Control-Allow-Origin', '*');
    // Request methods you wish to allow
    res.set('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT');
    // Request headers you wish to allow
    res.set('Access-Control-Allow-Headers', 'Origin, Accept, Content-Type, X-Requested-With, X-CSRF-Token');
    // Pass to next layer of middleware
    next();
  });
}

/**
 * Configure app modules config files.
 *
 * @method initGonfig
 * @param {Object} app The express application
 * @private
 */
function initGonfig(app) {
}


/**
 * Initialize the Express application.
 *
 * @method init
 * @returns {Object} the express application
 */
module.exports = {
  init: function() {
    var app = express();
    // Set Express middleware
    setMiddleware(app);
    // Set Helmet security headers
    setHelmet(app);
    // Set CORS
    setCors(app);
    return app;
  }
};
