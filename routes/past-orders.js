'use strict';

var express = require('express');
var router = express.Router();
var models = require('../models/index');

/* GET past orders of user*/
router.route('/:user_id')
	.get(function(req, res) {
		var outGoingHistory = [];

		// oderDate: ,
		// grandTotal: ,
		// products: [{
		//   title: ,
		//   quantity: ,
		//   price: ,
		//   subtotal: ,
		// }],
		// status: ,
		models.PastOrder.find({
				'user_id': req.params.user_id
			})
			.then(function(pastorder) {
					for (var i = 0; i < pastorder.length; i++) {
						var pastOrder = {
							products: {},
						};
						pastOrder.status = pastorder[i].status;
						pastOrder.products = pastorder[i].products;
						pastOrder.grandTotal = pastorder[i].grandTotal;
						pastOrder.orderDate = pastorder[i].orderDate;
						outGoingHistory.push(pastOrder);
					}

					console.log('outGoingHistory: ', outGoingHistory);
					res.status(200).json(outGoingHistory);
				},
				function(error) {
					console.error('error finding past orders');
					console.error(error);
					res.sendStatus(200);
				});

	})
	.post(function(req, res) {
		console.log(req.body);
		models.PastOrder.create({
				userId: null,
				orderDate: null,
				products: [],
				status: null,
				subTotals: this.subtotal(),
				grandTotal: this.grandTotal()
			})
			.then(function(aaa) {
				console.log('success');
				console.log(aaa);
				res.sendStatus(200);
			}, function(error) {
				console.error('POST /past-orders/:user_id error');
				console.error(error);
				res.sendStatus(500);
			});
	});

module.exports = router;
