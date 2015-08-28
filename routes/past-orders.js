'use strict';

var express = require('express');
var router = express.Router();
var models = require('../models/index');

/* GET past orders of user*/
router.route('/:user_id')
  .get(function (req, res) {
    var outGoingHistory = [];
    models.PastOrder.find({
      'user_id': req.params.user_id
    })
    .then(function (pastorder) {

      for (var i = 0; i < pastorder.length; i++) {
        var pastOrder = {
          products: {},
        };
        var dateArray = pastorder[i].orderDate.toString().split(' ');
        var dateString = dateArray[0] + " " + dateArray[1] + " " + dateArray[2] + ", " + dateArray[3];
        pastOrder['status'] = pastorder[i].status;
        pastOrder['products'] = pastorder[i].products;
        pastOrder['grandTotal'] = pastorder[i].grandTotal;
        pastOrder['orderDate'] = dateString;
        outGoingHistory.push(pastOrder);
      }

      console.log('outGoingHistory: ', outGoingHistory);
      res.json(outGoingHistory);
    },
    function (error) {
      console.log(error);
    });
  })
  .post(function (req, res) {
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
