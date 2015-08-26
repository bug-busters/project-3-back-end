'use strict';

var express = require('express');
var async = require('async');
var router = express.Router();
var passport = require('passport');
var bcrypt = require('bcrypt');
var models = require('../models/');

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', {
		title: 'Syntactic Sugar'
	});
});

/* AUTHENTICATION ROUTES */
router.use(function(req, res, next) {
	if (req.session && !req.session.currRequestRoute) {
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
	.post(function(req, res, next) {
		//authentication method
		passport.authenticate('local', function(err, user, info) {
			if (err) {
				return next(err);
			}
			if (!user) {
				return res.sendStatus(404);
			}
			req.login(user, function(err) {
				if (err) {
					return next(err);
				}
			});

			// check is cart exists
			models.Cart.findAll({
					where: {
						user_id: user.id
					}
				})
				.then(function(cart) {
						console.log('cart length: ' + cart.length);
						var result = {};
						if (cart.length > 0) {
							console.log('>0 cart: ' + cart.length);
							result = {
								'user_id': user.id,
								'hasCart': true
							};
						} else {
							result = {
								'user_id': user.id,
								'hasCart': false
							};
						}
						res.status(200).json(result);
					},
					function(error) {
						console.log(error);
					});
		})(req, res, next);
	});

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
		console.log('inside POST /signup');

		if (!req.body || !req.body.email || !req.body.password) {
			console.log(req.body);
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
				models.User.create({
					email: req.body.email,
					firstName: req.body.firstName,
					lastName: req.body.lastName,
					password: hash,
					phone_number: req.body.phone_number,
					is_admin: false
				}).then(function(user) {
					req.login(user, function(err) {
						if (err) {
							return;
						}
					});
					calllater(null, user);
				}).catch(calllater);
			}
		], function(err, result) {
			if (err) {
				return next(err);
			}

			res.status(201).json({'user_id': result.id});
		});
	});

router.route('/changePassword')
	.get(function(req, res, next) {
		res.sendStatus(405);
	})
	.put(function(req, res, next) {
		var err;
		// check that user is logged
		if (!req.user) {
			err = new Error('User not logged in.');
			return next(err);
		}

		// check that body contains a passport value
		if (!req.body || !req.body.password) {
			err = new Error('No credentials.');
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
