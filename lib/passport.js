'use strict';

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt');
var models = require('../models');
var User = models.User;

passport.serializeUser(function(user, done) {
	console.log('===inside serializeUser');
	done(null, user.id);
});

passport.deserializeUser(function(id, done) {
	console.log('deserializer');
	User.findOne({
		where: { id: id }
	}).then(function(user) {
		done(null, user);
	}).catch(function(error) {
		done(error);
	});
});

var localStrat = new LocalStrategy({
	usernameField : 'email'
}, function(email, password, done) {
	User.findOne({
		where : {
			email: email
		}
	})
	.then(function(user) {
		if (!user) {
			return done(null, false);
		}

		bcrypt.compare(password, user.password, function(err, match) {
				if (err) {
					return done(err);
				}
				done(null, match ? user : false);
			});
	}).catch(function(err) {
		done(err);
	});
});

passport.use(localStrat);

module.exports = passport;
