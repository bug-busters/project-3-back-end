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
    };

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
