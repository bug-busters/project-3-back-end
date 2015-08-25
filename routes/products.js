'use strict';

var express = require('express');
var router = express.Router();
var model = require('../models');

router.route('/')
  .get(function (req, res) {
    //Products index
    model.Product.find({})
      .then(function (products) {
        res.json(products);
      },
      function(err) {
        console.log(err);
      });
  })
  .post(function (req, res) {
    // Create a new product (cupcake)
    model.Product.create(req.body)
      .then(function(products) {
        res.json(products);
        console.log('Product created');
      },
      function(error) {
        console.log(error);
        console.log('Failed to create a product');
      });
  });

router.route('/:id')
  // Show by ID request
  .all(function (req, res, next) {
    model.Product.findById(req.params.id)
      .then(function(product) {
        res.locals.product = product;
        next();
      },
      function(error) {
        next(error);
        console.log('Error');
      });
  })
  .get(function(req, res) {
    // Sends the get request for the product
    model.Product.findByID(req.params.id)
      .then(function(products) {
        res.json(products);
      },
      function(error) {
        console.log(error);
      });
  })
  .patch(function(req, res) {
    //updates the product
    res.locals.product.update(req.body)
      .then(function(product) {
        res.json(product);
      },
      function(error) {
        res.sendStatus(500);
        console.log('error in updating product');
      });
  })
  .delete(function(res, req) {
    //delete product route
    res.sendStatus(404);
    console.log('error in deleting the product');
  })
  .all(function(error, req, res, next) {
    res.sendStatus(404);
  });

module.exports = router;

