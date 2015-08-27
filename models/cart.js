'use strict';

module.exports = function(sequelize, DataTypes) {
	var Cart = sequelize.define('Cart', {
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
			allowNull: false
		},
		user_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			unique: true
		},
		products: {
			type: DataTypes.JSON,
		},
		secret_key: process.env.STRIPE_TEST_SECRET_KET
	}, {
		classMethods: {
			getSubtotals: function() {
				var subtotals = [];
				this.products.forEach(function(product) {
					subtotals.push(product.price * product.quantity);
				});

				return subtotals;
			},

			getTotal: function() {
				return (this.getSubtotals().reduce(function(a, b) {
					return a + b;
				}, 0)).toFixed(2);
			}
		}
	});

	return Cart;
};
