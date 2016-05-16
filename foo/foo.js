app.post('/login',
  passport.authenticate('local', { successRedirect: '/',
                                   failureRedirect: '/login',
                                   failureFlash: true })
);


passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

app.post('/login',
    passport.authenticate('local', { successRedirect: '/',
                                     failureRedirect: '/login',
                                     failureFlash: true })
  );

/**
 * New node file
 */
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
});
  
  
  passport.serializeUser( (user, done) => {
    var sessionUser = { _id: user._id, name: user.name, email: user.email, roles: user.roles }
    done(null, sessionUser)
  })

  passport.deserializeUser( (sessionUser, done) => {
    // The sessionUser object is different from the user mongoose collection
    // it's actually req.session.passport.user and comes from the session collection
    done(null, sessionUser)
    
    
    
    
    function create(req, res) {
  var user = new User({
    name: {first: req.body.uber_forename, last: req.body.uber_surname},
    email: req.body.uber_email,
    password: req.body.uber_pwd1
  });
  user.save(function(err) {
    if (err) {
      
      var errMsg = '';
      prettyJSON(err);
      // go through all the errors...
      for (var errName in err.errors) {
        errMsg += errName + ": " + err.errors[errName].message;
        errMsg += " (" + err.errors[errName].value + ")\n";
        prettyJSON(err.errors[errName]);
        
        /*switch(err.errors[errName].type) {
          case ValidationErrors.REQUIRED:
            errMessage = i18n('Field is required');
            break;
          case ValidationErrors.NOTVALID:
            errMessage = i18n('Field is not valid');
            break;
        }*/
      }
      //logger.debug("JEE: " + err.errors.error.message);
      
      /*
      
      logger.error(err.message);
      if (err.name === 'ValidationError') {
        var errMsg = "Validation failed: ";
        var keys = Object.keys(err.errors);
        var endIdx = keys.length
        // indexed iteration
        for(var idx = 0; idx < endIdx; idx++) {
          var key = keys[idx], value = obj[key];
          // do what you need to here, with index i as position information
        }
      }
      */
      
      req.flash("error", errMsg);
      res.redirect('/signup')
    } 
    else {
      logger.debug("User created: " + user._id);
      req.flash("success", "User created");
      req.flash("notice", "jee jee\n\n\n");
      res.redirect('/');
    }
  });
}
    
    