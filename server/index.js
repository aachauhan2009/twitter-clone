const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const request = require("request");
const qs = require("querystring");
require("dotenv").config();

const CONSUMER_KEY = process.env.CONSUMER_KEY;
const CONSUMER_SECRET = process.env.CONSUMER_SECRET;

const app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "../build")));

app.get("/api/getToken", function(req, res) {
  const url = "https://api.twitter.com/oauth/request_token";
  const oauth = {
    callback: "http://twitter.amitchauhan.tech:3000",
    consumer_key: CONSUMER_KEY,
    consumer_secret: CONSUMER_SECRET
  };
  request.post({ url, oauth }, (err, response, body) => {
    res.send({ token: qs.parse(body).oauth_token });
  });
});

app.post("/api/access", function(req, res) {
  const oauth = {
    consumer_key: CONSUMER_KEY,
    consumer_secret: CONSUMER_SECRET,
    token: req.body.oauth_token,
    verifier: req.body.oauth_verifier
  };
  const url = "https://api.twitter.com/oauth/access_token";

  request.post({ url: url, oauth: oauth }, function(e, r, body) {
    const response = qs.parse(body);
    res.send(response);
  });
});

app.get("/api/authenticate", function(req, res) {
  const url = `https://api.twitter.com/oauth/authenticate?oauth_token=${req.query.token}`;
  request.get({ url }, function(e, r, body) {
    console.log(e, body);
  });
});
app.post("/api/access", function(req, res) {
  const oauth = {
    consumer_key: CONSUMER_KEY,
    consumer_secret: CONSUMER_SECRET,
    token: req.body.oauth_token,
    verifier: req.body.oauth_verifier
  };
  const url = "https://api.twitter.com/oauth/access_token";

  request.post({ url: url, oauth: oauth }, function(e, r, body) {
    console.log(e, body);
    res.send(qs.parse(body));
  });
});

app.get("/api/post", function(req, res) {
  const authHeader = req.headers.authorization;
  const param = qs.parse(authHeader);
  console.log(req.headers.authorization, param, "authHeader");
  const oauth = {
    consumer_key: CONSUMER_KEY,
    consumer_secret: CONSUMER_SECRET,
    token: param.token,
    token_secret: param.secret
  };
  const url = "https://api.twitter.com/1.1/statuses/home_timeline.json";
  request.get({ url: url, oauth: oauth, json: true }, function(e, r, body) {
    console.log(body);
    res.send(body);
  });
});

app.listen(process.env.PORT || 8080);
