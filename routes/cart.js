'use strict';

var express = require('express');
var router = express.Router();
var model = require('../models/cart');

router.route('/')
  .get(function(req, res) {
    //Carts index
    model.Cart.findAll({})
      .then(function(carts){
        res.json(carts);
      },
      function(error) {
        console.log(error);
      });
  }).post(function(req, res) {
    // Create a new cart
    model.Cart.create(req.body)
      .then(function(carts) {
        res.json(carts);
        console.log('New cart created.');
      },
      function(error) {
        console.log(error);
        console.log('Failed to initialize the cart.');
      });
  });

router.route('/:id')
  // Show cart by ID
  .all(function(req, res, next) {
    model.Cart.findById(req.params.id)
    .then(function(user) {
      res.locals.cart = cart;
      next();
    },
    function(error) {
      next(error);
      console.log(error);
    });
  })
  .get(function(req, res) {
    //Sends the get cart by USERID request
    model.Cart.findByUserID(req.params.User.id)
      .then(function(cart) {
        res.json(cart);
      },
      function(error) {
        console.log(error);
      });
  })
  .patch(function(req, res) {
    //Updates the cart
    res.locals.product.update(req.body)
      .then(function(cart) {
        res.json(cart);
      },
      function(error) {
        res.sendStatus(500);
        console.log('error is updating the cart');
      });
  })
  .delete(function(req, res) {
    res.sendStatus(404);
    console.log('error in deleting the product');
  })
  .all(function(error, req, res, next) {
    res.sendStatus(404);
  });

module.exports = router;
