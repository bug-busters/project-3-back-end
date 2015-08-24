'use strict';

module.exports = function(sequelize, Datatype) {
	var Product = sequelize.define('Product', {
		id: {
			type: Datatype.INTEGER,
			autoIncrement: true,
			primaryKey: true,
			allowNull: false
		},
		sku: {
			type: Datatype.INTEGER,
			allowNull: false
		}
	});

	return Product;
};
