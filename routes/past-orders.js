'use strict';

var express = require('express');
var router = express.Router();
var models = require('../models/index');

/* GET past orders of user*/
router.route('/:user_id')
	.get(function(req, res) {
		var pastOrders = [];

		models.PastOrder.find({
				'userId': req.params.user_id
			})
			.then(function(pastOrder) {
					pastOrders.push(JSON.parse(pastOrder));
					res.status(200).json(pastOrders);
				},
				function(error) {
					console.error('GET /past-orders/:user_id error');
					console.error(error);
					res.sendStatus(500);
				});
	})
	.post(function(req, res) {
		models.PastOrder.create({
			userId: null,
			orderDate: null,
			products: [],
			status: null,
			subTotals: this.subtotal(),
			grandTotal: this.grandTotal()
		})
			.then(function() {
				console.log('success');
				res.sendStatus(200);
			}, function() {
				console.error('past order create failed');
				res.sendStatus(500);
			});
	});

module.exports = router;
