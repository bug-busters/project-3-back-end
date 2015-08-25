'use strict';

var express = require('express');
var router = express.Router();
var models = require('../models');

router.route('/:user_id')
  .get(function (req, res) {
    //Carts index
    models.Cart.find({ 'user_id': req.params.id })
      .then(function (cart){
        res.json(cart);
      },
      function (error) {
        console.log(error);
      });
  }).post(function (req, res) {
    // Create a new cart
    models.Cart.create(req.body)
      .then(function (cart) {
        res.json(cart);
        console.log('New cart created.');
      },
      function (error) {
        console.log(error);
        console.log('Failed to initialize the cart.');
      });
  }).patch(function (req, res) {
    models.Cart.find({ 'user_id': req.params.id })
    .then(function (cart) {
      cart.update(req.body);
      res.sendStatus(200);
    },
      function (error) {
        console.log(error);
        console.log('Failed to initialize the cart.');
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
