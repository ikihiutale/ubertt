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
    session = require('express-session'),
    flash = require('connect-flash'),
    // Templating engine 
    exphbs = require('express-handlebars'),
    cookieParser = require('cookie-parser'),
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
    // Handles any errors that occur throughout 
    // the entire middleware process
    errorHandler = require('errorhandler'),
    // A library for performing numerous different types of 
    // date string formatting
    moment = require('moment'),
    favicon = require('serve-favicon'),
    csurf = require('csurf'),
    passport = require('passport'),
    config = require('./config'),
    routes = require('./routes'),
    logger = require('./logger');

/**
 * Set Handlerbars as the template engine with 
 * main.hbs as the default main layout.
 * @method setViewEngine
 * @param {Object} app The express application
 * @private
 */
function setViewEngine(app) {
  var hbs = exphbs.create({    
    defaultLayout: 'main',    
    layoutsDir: path.join(app.get('views'), '/layouts'),    
    partialsDir: [path.join(app.get('views'), '/partials')],
    extname: '.hbs',
    helpers: {
      foo: function () { return 'FOO!'; },
      bar: function () { return 'BAR!'; }
    }});
  app.set('views', path.join(__dirname, '../views')); 
  // The used file extension for Handlebars is .hbs. It could be
  // anything as long as the first parameter to the app.engine() 
  // function and the second parameter in the app.set('view engine') 
  // function are identical. 
  app.engine('.hbs', hbs.engine);
  app.set('view engine', '.hbs'); 
}

/**
 * Set session
 * @method setSession
 * @param {object} app The express application
 * @private
 */
function setSession(app) {
  // Session parameters
  var sess = {
      secret: config.token.secret,
      cookie: { secure: false },
      // Forces the session to be saved back to the session store, 
      // even if the session was never modified during the request
      resave: false,
      // If true forces a session that is "uninitialized" to be saved 
      // to the store
      saveUninitialized: true
  };
  if (config.environment !== 'development') {
    // Cookie with secure: true is a recommended option. However, it 
    // requires an https-enabled website, i.e., HTTPS is necessary 
    // for secure cookies. If secure is set, and you access your site 
    // over HTTP, the cookie will not be set. If you have your node.js behind 
    // a proxy and are using secure: true, you need to set "trust proxy" in express
    // app.set('trust proxy', 1);
    
    // Serve secure cookies
    // sess.cookie.secure = true;
  }
  app.use(session(sess));
}

/**
 * Set flash messages
 * @method setFlashMsg
 * @param {object} app The express application
 * @private
 */
function setFlashMsg(app) {
  // Use connect-flash for flash messages stored in session
  app.use(flash()); 
  
  // Ensures that flash messages will be available to 
  // the template as locals.
  app.use(function(req, res, next){
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    res.locals.notice = req.flash('notice');
    delete req.session.error;
    delete req.session.success;
    delete req.session.notice;
    next();
  });
}
  
/**
 * Set Passport
 * @method setFlashMsg
 * @param {object} app The express application
 * @private
 */
function setPassport(app) {
  app.use(passport.initialize());
  // Persistent login sessions
  app.use(passport.session());
}

/**
 * Set Cross-site request forgery prevent module
 * @method setCSURF
 * @param {object} app The express application
 * @private
 */
function setCSURF(app) {
  // The way to prevent the Cross-site request forgery (CSRF) 
  // attacks  is to pass a unique token to the browser. 
  // When the browser then submits a form, the server checks to 
  // make sure the token matches. The csurf middleware will handle 
  // the token creation and verification.
  app.use(csurf());
  // All forms (and AJAX calls), have to provide a field 
  // called _csrf, which must match the generated token. 
  app.use(function(req, res, next) {
    res.locals._csrfToken = req.csrfToken();
    next();
  });
}

/**
 * Wire up our routes via the app object.
 * Router is used and it responds to requests such as 
 * GET, POST, PUT, and UPDATE.
 * Route error handling is also set here.
 * @method setRoutesAndStatic
 * @param {object} app The express application
 * @private
 */
function setRoutes(app) {
  // Predefined static resource directory for css, js etc.
  app.use('/public', express.static(path.join(__dirname, '../public')));
  routes.setRoutes(app, passport);
  routes.setErrRoutes(app);
}

/**
 * Initialize the application middleware.
 * @param {object} app The express application
 * @private
 */
function setMiddleware(app) {
  // Environment dependent middleware
  if (config.environment === 'development') {
    // Log every request to the console
    app.use(morgan('dev', { "stream": logger.stream }));
    // app.use(morgan('dev'));
    // Disable views cache
    app.disable('view cache');
  } 
  // Block the header from containing information about the server
  app.disable('x-powered-by'); 
  // Get information from html forms
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  // TODO app.use(cookieParser());
  // Request body parsing middleware should be above methodOverride
  app.use(methodOverride('X-HTTP-Method-Override'));
  // TODO uncomment after placing your favicon in /public
  // app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
  setViewEngine(app);
  // Set routes
  setSession(app);
  setFlashMsg(app);
  setPassport(app);
  setCSURF(app);
  setRoutes(app);
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
