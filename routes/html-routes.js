// var db = require("../models");
var path = require("path");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    res.render("signIn", { signUpVar: false });
  });

  // app.get("/createAccount", function(req, res) {
  //   res.render("signUp", { signUpVar: true });
  // });

  // app.get("/signIn", function(req, res) {
  //   res.render("dashboard", { signUpVar: true });
  // });

  app.get("/logout", function(req, res) {
    res.render("signIn", { signUpVar: false });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
