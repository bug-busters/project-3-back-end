'use strict';

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/syntactic_sugar');

var Schema = mongoose.Schema;

var productSchema = new Schema({
	title: {
		type: String,
		required: true,
		unique: true
	},
	description: {
		type: String,
		required: true
	},
	price: {
		type: Number,
		required: true
	},
	image: String
}, {
	timestamps: true
});

var Product = mongoose.model('Product', productSchema);

module.exports = Product;