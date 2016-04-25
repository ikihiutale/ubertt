/**
 * Sign up page controller 
 */
'use strict';

function ctrl(req, res) {
  var viewModel = {
      title: "UberTT",
      pageTitle: "Sign Up",
      user: null,
      message: req.flash('signupMessage')
  };
  res.render('signup', viewModel);
} 

module.exports = ctrl;