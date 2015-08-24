'use strict';

var express = require('express');
var async = require('async');
var router = express.Router();
var passport = require('../lib/passport');
var bcrypt = require('bcrypt');
var User = require('../models/user');

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', {
		title: 'Express'
	});
});

/* AUTHENTICATION ROUTES */

router.use(function(req, res, next) {
  if(req.session && !req.session.currRequestRoute) {
      req.session.currRequestRoute = req.path;
  } else {
    req.session && (function() {
        req.session.lastRequestRoute = req.session.currRequestRoute;
        req.session.currRequestRoute = req.path;
      })();
  }
  next();
});

router.route('/login')
	.get(function(req, res, next) {
		res.sendStatus(405);
	})
	.post(passport.authenticate('local', {
		successRedirect: '/',
		failureRedirect: '/login'
	}));

router.route('/logout')
	.all(function(req, res, next) {
		if (!req.user) {
			var err = new Error('User not logged in.');
			return next(err);
		}
		req.logout();
		res.sendStatus(200);
	});

router.route('/signup')
	.get(function(req, res, next) {
		res.sendStatus(405);
	})
	.post(function(req, res, next) {
		console.log('inside /singup');

		console.log(req.body);
		if (!req.body || !req.body.email || !req.body.password) {
			var err = new Error('No credentials.');
			return next(err);
		}

		async.waterfall([
			function(calllater) {
				bcrypt.genSalt(16, calllater);
			},
			function(salt, calllater) {
				bcrypt.hash(req.body.password, salt, calllater);
			},
			function(hash, calllater) {
				User.create({
					email: req.body.email,
					password: hash,
					phone_number: req.body.phone_number,
					is_admin: req.body.is_admin
				}).then(function(user) {
					calllater(null, user);
				}).catch(calllater);
			}
		], function(err, result) {
			if (err) {
				return next(err);
			}
			res.sendStatus(201);
		});
	});

router.route('/changePassword')
	.get(function(req, res, next) {
		res.sendStatus(405);
	})
	.put(function(req, res, next) {

		// check that user is logged
		if (!req.user) {
			var err = new Error('User not logged in.');
			return next(err);
		}

		// check that body contains a passport value
		if (!req.body || !req.body.password) {
			var err = new Error('No credentials.');
			return next(err);
		}
		async.waterfall([
			// bcrypt the password
			function(calllater) {
				bcrypt.genSalt(16, calllater);
			},
			function(salt, calllater) {
				bcrypt.hash(req.body.password, salt, calllater);
			},
			// update the Users db row with the new localPass value
			function(hash, calllater) {
				req.user.update({
					password: hash,
				}).then(function(user) {
					calllater(null, user);
				}).catch(calllater);
			}
		], function(err, result) {
			if (err) {
				// make error handler
				return next(err);
			}
		});
		// send a server response
		res.sendStatus(202);
	});

module.exports = router;
