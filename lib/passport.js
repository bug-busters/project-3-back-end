'use strict';

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt');
var models = require('../models');
var User = require('../models/user');

passport.serializeUser(function(user, done) {
	console.log('===inside serializeUser');
	done(null, user.id);
});

passport.deserializeUser(function(id, done) {
	User.findOne({
		where: { id: id }
	}).then(function(user) {
		done(null, user);
	}).catch(function(error) {
		done(error);
	});
});

var localStrat = new LocalStrategy(function(username, password, done) {
	User.findOne({
			userame: username
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
				})
				.catch(function(err) {
					done(err);
				});
		});
});

passport.use(localStrat);

module.exports = passport;
