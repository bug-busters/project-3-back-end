'use strict';

module.exports = function(mongoose) {
	var Schema = mongoose.Schema;

	var pastOrderSchema = new Schema({
		user_id: {
			type: Number,
			required: true,
			validates: {
				isInt: true
			}
		},
		orderDate: {
			type: Date,
			default: Date.now
		},
		products: [{
			sku: {
				type: Number,
				required: true,
				validates: {
					isInt: true
				}
			},
			title: {
				type: String,
				required: true,
				unique: true
			},
			price: {
				type: Number,
				required: true,
				validates: {
					isDecimal: true
				}
			},
			quantity: {
				type: Number,
				required: true,
				validates: {
					isInt: true
				}
			}
		}],
		status: {
			type: String,
			required: true
		}
	});

	var PastOrder = mongoose.model('PastOrder', pastOrderSchema);

	return PastOrder;
};
