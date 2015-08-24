'use strict';

require('dotenv').load();

var database = {
	name:     process.env.DB_NAME,
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
mongoose.connect('mongodb://localhost/syntactic_sugar');

var models = {};

models.ProductP = require('./productp');
models.ProductM = require('./productm')(mongoose, models);
models.User = require('./user')(mongoose, models);

sequelize.sync();

module.exports = models;
