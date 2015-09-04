'use strict';

if (process.env.NODE_ENVIRONMENT === "development") {
	require('dotenv').load();
}

var express = require('express');
var router = express.Router();
var stripe = require('stripe')(process.env.STRIPE_TEST_SECRET_KEY);

router.route('/')
	.get(function(req, res) {
		console.log('get checkout');
		res.sendStatus(403);
	})
	.post(function(req, res) {
		console.log('post checkout');
		stripe.charges.create(req.body, function(error, response) {
			if (error) {
				console.error('stripe charge error');
				console.error(error);
			}

			if (response && response.status === 'succeeded') {
				console.log('stripe charge successful!');
				res.status(200).json({ 'status': 'succeeded' });
			} else {
				console.log('stripe charge failed!');
				res.status(403).json({ 'status': 'failed' });
			}
			// res.sendStatus(403);
		});
	});

module.exports = router;
