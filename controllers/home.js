/**
 * Home page controller 
 */
'use strict';

function ctrl(req, res) {
  var viewModel = {};
  res.render('home', viewModel);
} 

module.exports = ctrl;