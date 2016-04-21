/**
 * Log in page controller 
 */
'use strict';

function ctrl(req, res) {
  var viewModel = {
      title: "UberTT",
      pageTitle: "Log In",
      user: null
  };
  console.log("LOGIN: " + req.body._csrfToken);
  res.render('login', viewModel);
} 

module.exports = ctrl;