'use strict';

var express = require('express');
var router = express.Router();
var models = require('../models/index');

router.route('/:user_id')
	.get(function(req, res) {
		//Carts index
		models.Cart.find({
				'user_id': req.params.user_id
			})
			.then(function(cart) {
					res.json(cart);
				},
				function(error) {
					console.log(error);
				});
	}).post(function(req, res) {
		// Create a new cart
		console.log('post /cart/user_id');
		console.log(req.body);
		models.Cart.create({'user_id': req.params.user_id, 'products': req.body.products })
			.then(function(cart) {
					res.json(cart);
					console.log('New cart created.');
				},
				function(error) {
					console.log(error);
					console.log('POST /cart/:user_id Failed to initialize the cart.');
				});
	}).patch(function(req, res) {
		console.log('patch /cart/user_id');
		models.Cart.findOne({
				where: {
					'user_id': req.params.user_id
				}
			})
			.then(function(cart) {
					console.log(req.body);
					cart.update({'products': req.body.products});
					res.sendStatus(200);
				},
				function(error) {
					console.log(error);
					console.log('PATCH /cart/:user_id Failed to initialize the cart.');
				});
	});

// router.route('/:id')
//   // Show cart by ID
//   .all(function (req, res, next) {
//     models.Cart.findById(req.params.id)
//     .then(function(user) {
//       res.locals.cart = cart;
//       next();
//     },
//     function (error) {
//       next(error);
//       console.log(error);
//     });
//   })
//   .get(function (req, res) {
//     //Sends the get cart by USERID request
//     models.Cart.findByUserID(req.params.User.id)
//       .then(function (cart) {
//         res.json(cart);
//       },
//       function (error) {
//         console.log(error);
//       });
//   })
//   .patch(function (req, res) {
//     //Updates the cart
//     res.locals.product.update(req.body)
//       .then(function (cart) {
//         res.json(cart);
//       },
//       function (error) {
//         res.sendStatus(500);
//         console.log('error is updating the cart');
//       });
//   })
//   .delete(function (req, res) {
//     res.sendStatus(404);
//     console.log('error in deleting the product');
//   })
//   .all(function (error, req, res, next) {
//     res.sendStatus(404);
//   });

module.exports = router;
