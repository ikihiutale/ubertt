/**
 * Home page controller 
 */
'use strict';

function ctrl(req, res) {
  var viewModel = {
      title: "UberTT"
  };
  res.render('registration', viewModel);
} 

module.exports = ctrl;