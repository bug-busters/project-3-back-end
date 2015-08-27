'use strict';

var express = require('express');
var router = express.Router();
var models = require('../models/index');

/* GET past orders of user*/
router.route('/:user_id')
  .get(function (req, res) {
    var outGoingHistory = {
      date: {
        products: {},
        totals: {
          subtotals: {},
          grandTotal: 0
        }
      }
    }
    .post(function(req, res) {
      // Create past order
        console.log('post /past_orders/user_id');
        console.log(req.body);
        models.Past-Orders.create({
            'user_id': req.params.user_id,
            'products': req.body.products
        })
        .then(function(cart) {
          res.json(pastOrder);
                console.log('New past order.');
          },
          function(error) {
            console.log(error);
            console.log('Failed to create a new past order.');
        });
    });

    models.PastOrder.find({
        'userId': req.params.user_id
      }).then(function(pastorder) {
          res.json(pastorder);
        },
        function(error) {
          console.log(error);
        });
    });

module.exports = router;
