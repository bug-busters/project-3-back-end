'use strict';

// var db = new Mongo().getDB('syntactic_sugar');
// var mongoose = require('mongoose');
var models = require('../models');

// var connection = new Mongo('ds035583.mongolab.com:35583');

models.Product.create({
  sku: 170431,
  title: 'Vanilla Javascript',
  description: 'A simple white cake with vanilla butter cream frosting.',
  price: 2.25,
  stock: 25,
  image: 'img/2.jpg'
});

// var db = connection.getDB('heroku_5kgmkd64');


// db.products.remove({});


// db.products.insert({
//   sku: 170431,
//   title: 'Vanilla Javascript',
//   description: 'A simple white cake with vanilla butter cream frosting.',
//   price: 2.25,
//   stock: 25,
//   image: 'img/2.jpg'
// });

// db.products.insert({
//   sku: 921079,
//   title: 'Chocolate 404',
//   description: 'A chocolate cake so delicious, it will be devoured before anyone else can find it.',
//   price: 2.50,
//   stock: 26,
//   image: 'img/3.jpg'
// });

// db.products.insert({
//   sku: 170432,
//   title: 'Ruby on Chocolate',
//   description: 'Raspberry filled chocolate cake with raspberry cream cheese frosting.',
//   price: 2.75,
//   stock: 35,
//   image: 'img/4.jpg'
// });

// db.products.insert({
//   sku: 170433,
//   title: 'Red Velvet Gem',
//   description: 'Rich red velvet cake with cream cheese frosting.',
//   price: 2.25,
//   stock: 15,
//   image: 'img/5.jpg'
// });

// db.products.insert({
//   sku: 270432,
//   title: 'Code Confetti',
//   description: 'Zesty lemon cake with vanilla butter cream frosting and sugar confetti garnish.',
//   price: 2.25,
//   stock: 15,
//   image: 'img/6.jpg'
// });

// db.products.insert({
//   sku: 181432,
//   title: 'Late Night Debugging',
//   description: 'Extra-dark caffeinated chocolate cake to keep you up when programming late into the night.',
//   price: 2.25,
//   stock: 25,
//   image: 'img/7.jpg'
// });


// db.pastorders.remove({});

// db.pastorders.insert({
//   user_id: 1,
//   products: [
//       {
//         sku: 270432,
//         title: 'Code Confetti',
//         price: 2.25,
//         quantity: 3,
//         subtotal: 6.75
//       },
//       {
//         sku: 181432,
//         title: 'Late Night Debugging',
//         price: 2.25,
//         quantity: 4,
//         subtotal: 9.00
//       },
//       {
//         sku: 170433,
//         title: 'Red Velvet Gem',
//         price: 2.25,
//         quantity: 2,
//         subtotal: 4.50
//       }
//     ],
//   status: 'delivered',
//   grandTotal: 20.25,
//   orderDate: ISODate("2015-08-28T01:25:51.498Z")
// });

// db.pastorders.insert({
//   user_id: 1,
//   products: [
//       {
//         sku: 270432,
//         title: 'Code Confetti',
//         price: 2.25,
//         quantity: 3,
//         subtotal: 6.75
//       },
//       {
//         sku: 921079,
//         title: 'Chocolate 404',
//         price: 2.25,
//         quantity: 1,
//         subtotal: 2.25
//       },
//       {
//         sku: 170431,
//         title: 'Vanilla Javascript',
//         price: 2.25,
//         quantity: 1,
//         subtotal: 2.25
//       }
//     ],
//   status: 'delivered',
//   grandTotal: 11.25,
//   orderDate: ISODate("2015-08-28T01:25:51.498Z")
// });

// db.pastorders.insert({
//   user_id: 2,
//   products: [
//       {
//         sku: 270432,
//         title: 'Code Confetti',
//         price: 2.25,
//         quantity: 3,
//         subtotal: 6.75
//       },
//       {
//         sku: 181432,
//         title: 'Late Night Debugging',
//         price: 2.25,
//         quantity: 4,
//         subtotal: 9.00
//       },
//       {
//         sku: 170433,
//         title: 'Red Velvet Gem',
//         price: 2.25,
//         quantity: 2,
//         subtotal: 4.50
//       }
//     ],
//   status: 'delivered',
//   grandTotal: 20.25,
//   orderDate: ISODate("2015-08-28T01:25:51.498Z")
// });

// db.pastorders.insert({
//   user_id: 2,
//   products: [
//       {
//         sku: 270432,
//         title: 'Code Confetti',
//         price: 2.25,
//         quantity: 3,
//         subtotal: 6.75
//       },
//       {
//         sku: 921079,
//         title: 'Chocolate 404',
//         price: 2.25,
//         quantity: 1,
//         subtotal: 2.25
//       },
//       {
//         sku: 170431,
//         title: 'Vanilla Javascript',
//         price: 2.25,
//         quantity: 1,
//         subtotal: 2.25
//       }
//     ],
//   status: 'delivered',
//   grandTotal: 11.25,
//   orderDate: ISODate("2015-08-28T01:25:51.498Z")
// });
