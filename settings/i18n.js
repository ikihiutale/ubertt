/**
 * Localization
 * https://www.drzon.net/i18n-for-node-express/
 */

'use strict';

var i18n = require('i18n'),
    path = require('path');

// By default, i18n module uses accept-language request 
// header to guess language settings. You can tell it to look 
// for a cookie that contains the language if you want. 
// In this case I used a cookie named lang.
i18n.configure({
  // Setup some locales
  locales:['en', 'fi'],
  // Where to store json files
  directory: path.join(__dirname, '../locales'),
  defaultLocale: 'en',
  // Sets a custom cookie name to parse locale 
  // settings from  - defaults to NULL
  cookie: 'lang',
});


module.exports = function(req, res, next) {
  i18n.init(req, res);
  res.local('__', res.__);
  var current_locale = i18n.getLocale();
  return next();
};
