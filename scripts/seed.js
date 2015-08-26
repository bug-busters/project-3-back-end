'use strict';

var db = new Mongo().getDB('syntactic_sugar');

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


db.products.remove({});


db.products.insert({
  sku: 170431,
  title: 'Vanilla Javascript',
  description: 'A simple white cake with vanilla butter cream frosting.',
  price: 2.25,
  stock: 25,
  image: 'img/2.jpg'
});

db.products.insert({
  sku: 921079,
  title: 'Chocolate 404',
  description: 'A chocolate cake so delicious, it will be devoured before anyone else can find it.',
  price: 2.50,
  stock: 26,
  image: 'img/3.jpg'
});

db.products.insert({
  sku: 170432,
  title: 'Ruby on Chocolate',
  description: 'Raspberry filled chocolate cake with raspberry cream cheese frosting.',
  price: 2.75,
  stock: 35,
  image: 'img/4.jpg'
});

db.products.insert({
  sku: 170433,
  title: 'Red Velvet Gem',
  description: 'Rich red velvet cake with cream cheese frosting.',
  price: 2.25,
  stock: 15,
  image: 'img/5.jpg'
});

db.products.insert({
  sku: 270432,
  title: 'Code Confetti',
  description: 'Zesty lemon cake with vanilla butter cream frosting and sugar confetti garnish.',
  price: 2.25,
  stock: 15,
  image: 'img/6.jpg'
});

db.products.insert({
  sku: 181432,
  title: 'Late Night Debugging',
  description: 'Extra-dark caffeinated chocolate cake to keep you up when programming late into the night.',
  price: 2.25,
  stock: 25,
  image: 'img/7.jpg'
});


db.pastorders.remove({});

db.pastorders.insert({
  userId: 1,
  products: [
      {
        sku: 270432,
        title: 'Code Confetti',
        price: 2.25,
        quantity: 3
      },
      {
        sku: 181432,
        title: 'Late Night Debugging',
        price: 2.25,
        quantity: 4
      },
      {
        sku: 170433,
        title: 'Red Velvet Gem',
        price: 2.25,
        quantity: 2
      }
    ],
  status: 'delivered'
});

db.pastorders.insert({
  userId: 1,
  products: [
      {
        sku: 270432,
        title: 'Code Confetti',
        price: 2.25,
        quantity: 3
      },
      {
        sku: 921079,
        title: 'Chocolate 404',
        price: 2.25,
        quantity: 1
      },
      {
        sku: 170431,
        title: 'Vanilla Javascript',
        price: 2.25,
        quantity: 1
      }
    ],
  status: 'delivered'
});

db.pastorders.insert({
  userId: 2,
  products: [
      {
        sku: 270432,
        title: 'Code Confetti',
        price: 2.25,
        quantity: 3
      },
      {
        sku: 181432,
        title: 'Late Night Debugging',
        price: 2.25,
        quantity: 4
      },
      {
        sku: 170433,
        title: 'Red Velvet Gem',
        price: 2.25,
        quantity: 2
      }
    ],
  status: 'delivered'
});

db.pastorders.insert({
  userId: 2,
  products: [
      {
        sku: 270432,
        title: 'Code Confetti',
        price: 2.25,
        quantity: 3
      },
      {
        sku: 921079,
        title: 'Chocolate 404',
        price: 2.25,
        quantity: 1
      },
      {
        sku: 170431,
        title: 'Vanilla Javascript',
        price: 2.25,
        quantity: 1
      }
    ],
  status: 'delivered'
});
