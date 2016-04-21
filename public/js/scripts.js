(function($, W) {
  
  var namespace;
  
  namespace = {
    /**
     * Events
     */
    setEvents: function() {
      $(".nav a").on("click", function(){
        $(".nav").find(".active").removeClass("active");
        $(this).parent().addClass("active");
      });
    },   
    /**
     * Sign up  validator
     */
    signup_validate: function() {
      $('#uber_signup').validate({
        //framework: 'bootstrap',
        errorClass: 'control-label has-error',
        rules: {
          uber_forename: { 
            minlength: 2,
            required: true
          }, 
          uber_surname: {
            minlength: 2,
            required: true
          },      
          uber_email: {
            required: true,
            email: true
          },
          uber_pwd1: { 
            required: true,
            minlength: 5
          },
          uber_pwd2: {
            required: true,
            minlength: 5, 
            equalTo: "#uber_pwd1"
          }
        }, 
        messages: {
          uber_forename: "Please enter your forename",
          uber_surname: "Please enter your surname", 
          uber_email: "Please enter a valid email address",
          uber_pwd1: {
              required: "Please provide a password",
              minlength: "Your password must be at least 5 characters long",
              equalTo: "Passwords are not equals" 
          },
          uber_pwd2: {
            required: "Please provide a password",
            minlength: "Your password must be at least 5 characters long",
            equalTo: "Passwords are not equals"
          } 
        },
        highlight: function (element, errorClass, validClass) {
          $(element).closest('.form-group').addClass('has-error');
        },
        unhighlight: function (element, errorClass, validClass) {
          $(element).closest('.form-group').removeClass('has-error');
        },
        submitHandler: function(form) {
          //form.submit();
        }
      });
     },
     /**
      * Log in validator
      */
     login_validate: function() {
       $('#uber_login').validate({
         //framework: 'bootstrap',
         errorClass: 'control-label has-error',
         rules: {
           uber_email: {
             required: true,
             email: true
           },
           uber_pwd1: { 
             required: true,
             minlength: 5
           }
         }, 
         messages: {
           uber_email: "Please enter a valid email address",
           uber_pwd1: {
               required: "Please provide a password",
               minlength: "Your password must be at least 5 characters long",
           }
         },
         highlight: function (element, errorClass, validClass) {
           $(element).closest('.form-group').addClass('has-error');
         },
         unhighlight: function (element, errorClass, validClass) {
           $(element).closest('.form-group').removeClass('has-error');
         },
         submitHandler: function(form) {
           //form.submit();
         }
       });
      } 
   };  
   W.ns = namespace;
})(this.jQuery, window);

$(function() {
    ns.setEvents();
    ns.signup_validate();
    ns.login_validate();
});
