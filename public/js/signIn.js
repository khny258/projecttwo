$("#signin-btn").on("click", function(event) {
  var user = {
    username: $("#userNameSignin")
      .val()
      .trim(),
    password: $("#userSigninPassword")
      .val()
      .trim()
  };
  $.ajax("/signin", {
    type: "POST",
    data: user
  }).then(function() {
    console.log("User signed in.");
  });
});
