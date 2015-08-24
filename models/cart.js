'use strict';

module.exports = function(sequelize, Datatype) {
	var Cart = sequelize.define('Cart', {
		id: {
			type: Datatype.INTEGER,
			autoIncrement: true,
			primaryKey: true,
			allowNull: false
		},
		sku: {
			type: Datatype.INTEGER,
			allowNull: false
		},
		quantity: {
			type: Datatype.INTEGER,
			allowNull: false
		}
	});

	return Cart;
};
