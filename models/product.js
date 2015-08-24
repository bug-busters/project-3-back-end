'use strict';

module.exports = function(mongoose) {
	var Schema = mongoose.Schema;

	var productSchema = new Schema({
		sku: {
			type: Number,
			required: true,
			unique: true
		},
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
		stock: {
			type: Number,
			required: true
		},
		image: {
			type: String,
		}
	}, {
		timestamps: true
	});

	var Product = mongoose.model('Product', productSchema);

	return Product;
};
