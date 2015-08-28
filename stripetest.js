'use strict';

require('dotenv').load();

var stripe = require('stripe')(process.env.STRIPE_TEST_SECRET_KEY);

var token = {
	number: 4242424242424242,
	cvc: 123,
	exp_month: 1,
	exp_year: 2016
};

var charge = {
	amount: 42069,
	currency: 'usd',
	source: token,
	description: 'test charge'
};

stripe.charges.create(charge, function(error, charge) {
	if (error) {
		console.error('error');
		console.error(error);
	}

	console.log('charge');
	console.log(charge);
});
