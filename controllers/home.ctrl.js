/**
 * Home page controller 
 */
'use strict';

function ctrl(req, res) {
  var viewModel = {
      title: "UberTT"
  };
  res.render('login', viewModel);
} 

module.exports = ctrl;