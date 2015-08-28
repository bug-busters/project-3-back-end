'use strict';

var express = require('express');
var router = express.Router();
var models = require('../models/index');

router.route('/:user_id')
	// #TODO:0 This route is really ugly and needs to be refactored.
	.get(function(req, res) {
		// Create default outgoing cart object.
		var outgoingCart = {
			products: {},
			totals: {
				subtotals: {},
				grandTotal: 0
			}
		};
		// Find cart by user_id and retrieve the products field.
		models.Cart.findOne({
				where: {
					'user_id': req.params.user_id
				},
				attributes: ['products']
			})
			.then(function(cart) {
					var productsJSON = JSON.parse(cart.products);
					var skus = [];

					// Create an array of SKUs for the mongoDB query later.
					// Push each product SKU into the outgoingCart products
					// object as a key and set its value to the quantity.
					for (var sku in productsJSON) {
						if (productsJSON.hasOwnProperty(sku)) {
							skus.push(sku);

							outgoingCart.products[sku] = {};
							outgoingCart.products[sku].quantity = productsJSON[sku];
						}
					}

					// Find the products in mongoDB matching the SKUs in the sku
					// array that was created earlier.
					models.Product.find({
							'sku': {
								$in: skus
							}
						}, 'sku title price', function(error, products) {
							// Populate title and price fields for each SKU key.
							products.forEach(function(product) {
								outgoingCart.products[product.sku].title = product.title;
								outgoingCart.products[product.sku].price = product.price;
							});
						})
						.then(function() {
							// Populate subtotals and grandTotal in totals key.
							for (var product in outgoingCart.products) {
								if (outgoingCart.products.hasOwnProperty(product)) {
									outgoingCart.totals.subtotals[product] = outgoingCart.products[product].quantity * outgoingCart.products[product].price;
									outgoingCart.totals.grandTotal += outgoingCart.totals.subtotals[product];
								}
							}
						})
						.then(function() {
							// Send the cart information to the front end.
							res.status(200).json(outgoingCart);
						}, function(error) {
							console.error('GET /cart/:user_id mongoDB query error');
							console.error(error);
							res.sendStatus(500);
						});
				},
				function(error) {
					console.error('GET /cart/:user_id error');
					console.error(error);
					res.sendStatus(500);
				});
	}).post(function(req, res) {
		// Create a new cart
		console.log('post /cart/user_id');
		console.log(req.body);
		models.Cart.create({
				'user_id': req.params.user_id,
				'products': req.body.products
			})
			.then(function(cart) {
					res.status(201).json(cart);
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
					cart.update({
						'products': req.body.products
					});
					res.sendStatus(200);
				},
				function(error) {
					console.log(error);
					console.log('PATCH /cart/:user_id Failed to initialize the cart.');
				});
	}).post(function(req, res) {
		// Create a new cart
		console.log('post /cart/user_id');
		console.log(req.body);
		models.Cart.create({
				'user_id': req.params.user_id,
				'products': req.body.products
			})
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
					cart.update({
						'products': req.body.products
					});
					res.sendStatus(200);
				},
				function(error) {
					console.log(error);
					console.log('PATCH /cart/:user_id Failed to initialize the cart.');
				});
	});

router.route('/checkout')
	.post(function(req, res) {
		console.log('POST checkout hit');
		console.log('BODY');
		console.log(req.body);
		console.log('PARAMS');
		console.log(req.params);
	});

// router.route('/stripe/')
// .post(function(req, res) {
// 	// (Assuming you're using express - expressjs.com)
// 	// Get the credit card details submitted by the form
// 	var stripeToken = request.body.stripeToken;
// 	.then(function() {
// 		res.json(stripeToken);
// 	},
// 	function(error) {
// 		console.log(error);
// 	});
// });

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
