$(function() {
  $(".nav a").on("click", function(){
    $(".nav").find(".active").removeClass("active");
    $(this).parent().addClass("active");
  });
    
  $('#uber_registration').validate({
    rules: {
      uber_forenamer: {
        minlength: 2,
        required: true
      },
      uber_surnamer: {
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
      uber_forenamer: "Please enter your forename",
      uber_surnamer: "Please enter your surname",
      uber_pwd1: {
          required: "Please provide a password",
          minlength: "Your password must be at least 5 characters long"
      },
      uber_email: "Please enter a valid email address",
      uber_pwd2: {
        required: "Please provide a password",
        minlength: "Your password must be at least 5 characters long",
        equalTo: "Passwords are not equals"
      }
    },
    highlight: function(element) {
      $(element).closest('.form-group').addClass('error');
    },
    success: function(element) {
      $(element).closest('.form-group').removeClass('error');
    },
    submitHandler: function(form) {
      form.submit();
    }
  });
});
