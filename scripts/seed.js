'use strict';

// var db = new Mongo().getDB('syntactic_sugar');
// db.users.remove({});

// db.users.insert({
// 	username: 'user1',
// 	email: 'user1@test.com',
// 	password: 'idontknow',
// 	dob: '2015-08-23',
// 	phone_number: '123-456-7890',
// 	address_book: {
// 		primary_address: {
// 			name: {
// 				last: 'Doe',
// 				first: 'John'
// 			},
// 			address: '12345 Main Str, Boston, MA'
// 		}
// 	}
// });

var async = require('async');

var models = require('../models');

async.series([
  function (cb){ //Clear DB
    models.Product.remove({where: {}}).then(cb);
  },
  function (cb){ //Seed DB
    async.parallel([
      function (cb){
        models.Product.create({
          sku: 170432,
          title: 'Vanilla Javascript',
          description: 'A simple white cake with vanilla butter cream frosting.',
          price: 2.25,
          stock: 25,
          image: 'img/2.jpg'
          }).then(done);
      },
      function (cb){
        models.Product.create({
          sku: 921079,
          title: 'Chocolate 401',
          description: 'A simple white cake with vanilla butter cream frosting.',
          price: 2.50,
          stock: 22,
          image: 'img/3.jpg'
          }).then(done);
      },
      function (cb){
        models.Product.create({
          sku: 129943,
          title: 'Ruby on Chocolate',
          description: 'Raspberry filled chocolate cake with raspberry cream cheese frosting.',
          price: 2.75,
          stock: 6,
          image: 'img/4.jpg'
          }).then(done);
      },
      function (cb){
        models.Product.create({
          sku: 444927,
          title: 'Red Velvet Gem',
          description: 'Rich red velvet cake with cream cheese frosting.',
          price: 2.25,
          stock: 3,
          image: 'img/5.jpg'
          }).then(done);
      },
      function (cb){
        models.Product.create({
          sku: 308954,
          title: 'Code Confetti',
          description: 'Zesty lemon cake with vanilla butter cream frosting and sugar confetti garnish.',
          price: 2.50,
          stock: 13,
          image: 'img/6.jpg'
          }).then(done);
      },
      function (cb){
        models.Product.create({
          sku: 654891,
          title: 'Debug Under Stars',
          description: 'Extra-dark caffeinated chocolate cake to keep you up when programming late into the night.',
          price: 2.75,
          stock: 13,
          image: 'img/7.jpg'
          }).then(done);
      }
    ], function (err, results){

    }, function (err, results){
      if (err) { console.log(err);}
      console.log('Products created');
      cb();
    });
  }
], function (err, results){
  console.log('DB is ready');
});
