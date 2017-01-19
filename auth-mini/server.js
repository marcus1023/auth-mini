var express = require('express');
var session = require('express-session');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy
var config = require('./config.js');

var app = express();
app.use(session({
  secret: config.secret,
  resave: false,
  saveUninitialized: false
}))

app.use(passport.initialize());
app.use(passport.session());

// console.log(config);


//FacebookStategy

passport.use('facebook', new FacebookStrategy({
  clientID: config.facebook.clientID,
  clientSecret: config.facebook.clientSecret,
  callbackURL: 'http://localhost:3000/auth/facebook/callback',
  profileFields:[]
},(accessToken, refreshToken, profile, done) => {
  //Access the database.
  done(null, profile);
}))

passport.serializeUser((user, done) => {
  return done(null, user)
})
passport.deserializeUser((user, done) => {
  return done(null, user)
})



app.get('/auth/facebook', passport.authenticate('facebook'))

app.get('/auth/facebook/callback', passport.authenticate('facebook'), (req, res) => {
  res.status(200).send(req.user);
})



app.listen(3000, function(){
  console.log("app is listening")
})
