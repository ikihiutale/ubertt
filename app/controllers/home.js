/**
 * Home page controller 
 */
'use strict';

/**
 * Render a home page.
 * @param {object} req The request object
 * @param {object} res The respond object
 * @api public
 */
function renderHome(req, res) {
  var viewModel = {
      title: "UberTT",
      pageTitle: "Home", 
      user: null
  };
  // Render the view locally and sends the HTML as a response.
  // Note that Express has also another method for rendering views:
  // app.render() - used to render the view and then pass the HTML to a callback function.
  // If an application has to send HTML e-mails then probably the app.render() method
  // will be used
  res.render('home', viewModel);

} 

/**
 * Render a login page.
 * @param {object} req The request object
 * @param {object} res The respond object
 * @api public
 */
function renderLogin(req, res) {
  var viewModel = {
      title: "UberTT",
      pageTitle: "Login", 
      user: null
  };
  // Render the view locally and sends the HTML as a response.
  // Note that Express has also another method for rendering views:
  // app.render() - used to render the view and then pass the HTML to a callback function.
  // If an application has to send HTML e-mails then probably the app.render() method
  // will be used
  res.render('login', viewModel);
} 

/**
 * Render a login page.
 * @param {object} req The request object
 * @param {object} res The respond object
 * @api public
 */
function renderSignup(req, res) {
  var viewModel = {
      title: "UberTT",
      pageTitle: "Signup", 
      user: null
  };
  res.render('signup', viewModel);
} 

module.exports = {
    renderHome: renderHome,
    renderLogin: renderLogin,
    renderSignup: renderSignup
}