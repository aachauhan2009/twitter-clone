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

const handledRequest = ["api/getToken", "api/access", "/api/authenticate"];

app.get("/api/getToken", function(req, res) {
  const callback = req.query.callback;
  const url = "https://api.twitter.com/oauth/request_token";
  const oauth = {
    callback,
    consumer_key: CONSUMER_KEY,
    consumer_secret: CONSUMER_SECRET
  };
  console.log(oauth, "oauth");
  request.post({ url, oauth }, (err, response, body) => {
      console.log(body, "oauth");

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

// app.get("/api/post", function(req, res) {
//   const authHeader = req.headers.authorization;
//   const param = qs.parse(authHeader);
//   console.log(req.headers.authorization, param, "authHeader");
//   const oauth = {
//     consumer_key: CONSUMER_KEY,
//     consumer_secret: CONSUMER_SECRET,
//     token: param.token,
//     token_secret: param.secret
//   };
//   const url = "https://api.twitter.com/1.1/statuses/home_timeline.json";
//   request.get({ url: url, oauth: oauth, json: true }, function(e, r, body) {
//     console.log(body);
//     res.send(body);
//   });
// });

app.all("/*", function(req, res, next) {
  if (handledRequest.includes(req.url)) {
    next();
  }

  const method = req.method;

  const originalUrl = req.url.replace('/api', '');
  const authHeader = req.headers.authorization;
  const param = qs.parse(authHeader);
  const oauth = {
    consumer_key: CONSUMER_KEY,
    consumer_secret: CONSUMER_SECRET,
    token: param.token,
    token_secret: param.secret
  };
  console.log({ originalUrl, method })
  const url = `https://api.twitter.com/1.1/${originalUrl}`;
  request[method.toLowerCase()]({ url: url, oauth: oauth, json: true }, function(e, r, body) {
    console.log(body);
    res.send(body);
  });
});

app.listen(process.env.PORT || 8080);
