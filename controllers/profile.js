/**
 * Profile page controller 
 */
'use strict';

function ctrl(req, res) {
  var viewModel = {
    title: "UberTT",
    pageTitle: "Profile", 
    // Get the user out of session and pass to template
    user : req.user 
  };
  res.render('profile', viewModel);
} 

module.exports = ctrl;