require("dotenv").config();
var express = require("express");
var app = express();
var passport = require("passport");
var session = require("express-session");
var bodyParser = require("body-parser");
var env = require("dotenv");
var exphbs = require("express-handlebars");
var PORT = process.env.PORT || 3000;

// For BodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
// Passport middleware
app.use(
  session({ secret: "keyboard cat", resave: true, saveUninitialize: true })
);
app.use(passport.initialize());
app.use(passport.session());
// Handlebars
app.set("views", "./views");
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

var models = require("./models");
// Routes
require("./routes/auth.js")(app, passport);
require("./routes/book-api-routes")(app);
require("./routes/html-routes")(app);
require("./config/passport/passport.js")(passport, models.user);

models.sequelize
  .sync()
  .then(function() {
    console.log("Nice! Database looks fine");
  })
  .catch(function(err) {
    console.log(err, "Something is wrong with database");
    å;
  });

// var syncOptions = { force: false };

// // If running a test, set syncOptions.force to true
// // clearing the `testdb`
// if (process.env.NODE_ENV === "test") {
//   syncOptions.force = true;
// }

// Starting the server, syncing our models ------------------------------------/
// db.sequelize.sync(syncOptions).then(function() {
app.listen(PORT, function() {
  console.log(
    "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
    PORT,
    PORT
  );
});
// });

module.exports = app;
