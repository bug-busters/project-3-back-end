'use strict';

var express = require('express');
var router = express.Router();
var model = require('../models');

/* GET past orders of user*/
router.route('/:user_id')
  .get(function (req, res) {
    // Past orders index
    var pastOrders = model.PastOrder.find({ 'userId':  req.params.id });
    res.json(pastOrders);
  }, function (err) {
    console.log(err);
  });


module.exports = router;
