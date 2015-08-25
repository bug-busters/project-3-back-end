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
		}
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
				return this.getSubtotals().reduce();
			}
		}
	});

	return Cart;
};
