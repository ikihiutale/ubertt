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

module.exports = {
    renderHome: renderHome
}