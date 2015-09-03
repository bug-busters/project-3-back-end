'use strict';

require('dotenv').load();

var database = {
	name:     process.env.DATABASE_URL,
	username: process.env.DB_USERNAME,
	password: process.env.DB_PASSWORD,
	info: {
		host:     process.env.DB_HOST,
		port:    +process.env.DB_PORT,
		dialect:  process.env.DB_DIALECT
	}
};

var Sequelize = require('sequelize');
var sequelize = new Sequelize(database.name, database.username, database.password, database.info);

var mongoose = require('mongoose');
mongoose.connect(process.env.MONGOLAB_URI);

var models = {};

models.sequelize = sequelize;
models.mongoose = mongoose;

models.Product = require('./product')(mongoose, models);
models.Cart = sequelize.import('./cart');
models.User = sequelize.import('./user');
models.Address = sequelize.import('./address');
models.PastOrder = require('./past-orders')(mongoose, models);

Object.keys(models).forEach(function(modelName) {
	if ('associate' in models[modelName]) {
		models[modelName].associate(models);
	}
});

module.exports = models;
