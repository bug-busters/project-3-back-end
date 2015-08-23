'use strict';

var db = new Mongo().getDB('syntactic_sugar');
db.users.remove({});

db.users.insert({
	username: 'user1',
	email: 'user1@test.com',
	password: 'idontknow',
	dob: '2015-08-23',
	phone_number: '123-456-7890',
	address_book: {
		primary_address: {
			name: {
				last: 'Doe',
				first: 'John'
			},
			address: '12345 Main Str, Boston, MA'
		}
	}
});
