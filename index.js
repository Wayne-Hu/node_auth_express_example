var bodyParser = require("body-parser");
var express = require("express");
var OAuthServer = require("express-oauth-server");
const Model = require("./InMemoryCache");

var app = express();

app.oauth = new OAuthServer({
  debug: true,
  model: new Model()
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.all("/oauth/token", app.oauth.token());

app.get("/", app.oauth.authenticate(), function(req, res) {
  res.send("Congratulations, you are in a secret area!");
});

app.get("/public", function(req, res) {
  // Does not require an access_token.
  res.send("Public area");
});

app.listen(3000);
