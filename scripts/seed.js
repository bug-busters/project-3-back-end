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

var models = require('../models/product');

async.series([
  function(cb){ //Clear DB
    models.Product.destroy({where: {}}).then(function(){
    console.log("DB cleared");
    cb();
  });
  },
  function(cb){ //Seed DB
    async.parallel([], function(err, results){
      function(cb){
        models.User.create({
        	sku: 170432,
        	title: "Vanilla Javascript",
        	description: "A simple white cake with vanilla butter cream frosting.",
        	price: 2.25,
        	stock: 25,
        	image: "<img src="img/2.jpg" class="cupcake-photo">"
        	}).then(done);
      }
      function(cb){
        models.User.create({
        	sku: 921079,
        	title: "Chocolate 401",
        	description: "A simple white cake with vanilla butter cream frosting.",
        	price: 2.50,
        	stock: 22,
        	image: "<img src="img/3.jpg" class="cupcake-photo">"
        	}).then(done);
      }
      function(cb){
        models.User.create({
        	sku: 129943,
        	title: "Ruby on Chocolate",
        	description: "Raspberry filled chocolate cake with raspberry cream cheese frosting.",
        	price: 2.75,
        	stock: 6,
        	image: "<img src="img/4.jpg" class="cupcake-photo">"
        	}).then(done);
      }
      function(cb){
        models.User.create({
        	sku: 444927,
        	title: "Red Velvet Gem",
        	description: "Rich red velvet cake with cream cheese frosting."
        	price: 2.25,
        	stock: 3,
        	image: "<img src="img/5.jpg" class="cupcake-photo">"
        	}).then(done);
      }
      function(cb){
        models.User.create({
        	sku: 308954,
        	title: "Code Confetti",
        	description: "Zesty lemon cake with vanilla butter cream frosting and sugar confetti garnish."
        	price: 2.50,
        	stock: 13,
        	image: "<img src="img/6.jpg" class="cupcake-photo">"
        	}).then(done);
      }
      function(cb){
        models.User.create({
        	sku: 654891,
        	title: "Debug Under Stars",
        	description: "Extra-dark caffeinated chocolate cake to keep you up when programming late into the night."
        	price: 2.75,
        	stock: 13,
        	image: "<img src="img/7.jpg" class="cupcake-photo">"
        	}).then(done);
      }
    ], function(err, results){
      console.log("DB is ready");
    });
  }
], function(err, results){
  console.log("DB is ready")
});
