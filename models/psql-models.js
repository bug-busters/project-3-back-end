'use strict';

require('dotenv').load();

var Sequelize = require('sequelize');

var database = {
	name:     process.env.DB_NAME,
	username: process.env.DB_USERNAME,
	password: process.env.DB_PASSWORD,
	info: {
		host:    process.env.DB_HOST,
		port:    process.env.DB_PORT,
		dialect: process.env.DB_DIALECT
	}
};

var sequelize = new Sequelize(database.name, database.username, database.password, database.info);

var Product = sequelize.define('Product', {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		primaryKey: true,
		allowNull: false
	},
	sku: {
		type: Sequelize.INTEGER,
		allowNull: false
	}
});

var Cart = sequelize.define('Cart', {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		primaryKey: true,
		allowNull: false
	},
	sku: {
		type: Sequelize.INTEGER,
		allowNull: false
	},
	quantity: {
		type: Sequelize.INTEGER,
		allowNull: false
	}
});

var models = {
	Product: Product,
	Cart: Cart
};

module.exports = models;
