'use strict';

var express = require('express');
var router = express.Router();
var models = require('../models');

/* GET users listing. */
router.route('/:id')
  .get(function(req, res) {
    console.log('inside get for users');
  	models.User.find({
      where: {
        'id': req.params.id
      }
    })
    .then(function(user) {
        res.status(200).json(user);
    }, function(error) {
        console.error(error);
    });
  })
  .delete(function(req, res) {
    models.User.destroy({
      where: {
        'id': req.params.id
      }
    })
    .then(function() {
        res.send('Your account has been deleted.');
    }, function(error) {
        console.error(error);
    });
  });




module.exports = router;
