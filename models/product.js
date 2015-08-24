'use strict';

module.exports = function(mongoose) {
	var Schema = mongoose.Schema;

	var productSchema = new Schema({
		sku: {
			type: Number,
			required: true,
			unique: true,
			validate: {
				isInt: true
			}
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
			required: true,
			validate: {
				isDecimal: true
			}
		},
		stock: {
			type: Number,
			required: true,
			validate: {
				isInt: true
			}
		},
		image: {
			type: String,
			validate: {
				isURL: true
			}
		}
	}, {
		timestamps: true
	});

	var Product = mongoose.model('Product', productSchema);

	return Product;
};
