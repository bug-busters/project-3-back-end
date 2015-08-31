'use strict';

var models = require('../models/index');
var router = require('express').Router();

router.route('/:user_id')
	.get(function(req, res) {
		models.PastOrder.find({
					'user_id': req.params.user_id
				},
				'orderDate status products grandTotal',
				function(err, pastOrders) {
					if (err) {
						console.error('An error occurred while searching for past orders.');
						console.error(err);
						res.sendStatus(500);
					} else {
						var i = 0;
						var orderHistory = {};

						pastOrders.forEach(function(pastOrder) {
							orderHistory[++i] = pastOrder;
						});
					}
				})
			.then(function(orderHistory) {
				res.status(200).json(orderHistory);
			}, function(err) {
				console.error('An error occurred after processing past orders.');
				console.error(err);
				res.sendStatus(500);
			});
	})
.post(function(req, res) {
	// Create past order
	console.log('post /pastorders/user_id');
	console.log(req.body);

	models.PastOrder.create(req.body)
		.then(function(pastorder) {
				res.json(pastorder);
				console.log('New past order created.');
			},
			function(error) {
				console.log(error);
				console.log('Failed to create a new past order.');
			});

});

module.exports = router;
