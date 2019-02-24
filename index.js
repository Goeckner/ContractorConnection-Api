const express = require('express')
const session = require('express-session')
const app = express()
const https = require('https')
const bodyParser = require('body-parser')
const routes = require('./app/routes/appRoutes')
const cors = require('cors')
require('dotenv').config()
var passport = require("passport")
var FacebookStrategy = require("passport-facebook").Strategy
var GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;

passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(obj, done) {
  done(null, obj);
});



passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_ID,
  clientSecret:process.env.FACEBOOK_SECRET,
  callbackURL: process.env.FACEBOOK_CALLBACK
},
function(accessToken, refreshToken, profile, done) {
  process.nextTick(function () {
    //Check whether the User exists or not using profile.id
    //Further DB code.
    return done(null, profile);
  });
}
));
passport.use(
	new GoogleStrategy(
		{
			clientID: process.env.GOOGLE_ID,
			clientSecret: process.env.GOOGLE_SECRET,
			callbackURL: process.env.GOOGLE_CALLBACK
		},
		function(accessToken, refreshToken, profile, done) {
			var userData = {
				email: profile.emails[0].value,
				name: profile.displayName,
				token: accessToken
			};
			done(null, userData);
		}
	)
);



app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({secret: 'secretive', key: 'sid'}))
app.use(passport.initialize());
app.use(passport.session());

app.use(cors())

app.get('/', (req, res) => {
  res.send('This is a different message!')
})

function ensureAuthenticated(req, res, next){
  if(req.isAuthenticated()) {
    return next()
  }
  res.redirect('/login')
}

app.listen(3001, () => console.log('Server running on port 3001'))

routes(app)
