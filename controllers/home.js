/**
 * Home page controller 
 */
'use strict';

function ctrl(req, res) {
  var viewModel = {
      title: "UberTT",
      pageTitle: "Home", 
      user: null
  };
  res.render('home', viewModel);
} 

module.exports = ctrl;