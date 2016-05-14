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
/*
 * http://stackoverflow.com/questions/25480633/how-do-i-display-flash-message-without-page-refresh-using-express-and-connect-fl
 * router.post("/login", function (req, res) {
    var username = req.body.username;
    var pwd = req.body.pwd;
    if (username === "demo" && pwd === "demo") {
        req.flash("messages", { "success" : "Sign Up Success" });
        res.redirect("/me/dashboard");
    } else {
        req.flash("messages", { "error" : "Invalid username or password" });
        res.locals.messages = req.flash();
        res.render("login', { title: 'Login"});
    }
});
 */
module.exports = ctrl;