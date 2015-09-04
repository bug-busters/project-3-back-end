'use strict';



var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var bodyParser = require('body-parser');
var uuid = require('uuid');

if (process.env.NODE_ENVIRONMENT === "development") {
	require('dotenv').load();
}

var mongoose = require('mongoose');
var cors = require('cors');
var stripe = require('stripe')(process.env.STRIPE_TEST_SECRET_KET);

var routes = require('./routes/index');
var users = require('./routes/users');
var products = require('./routes/products');
var cart = require('./routes/cart');
var pastorders = require('./routes/past-orders');
var checkout = require('./routes/checkout');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: false
}));

app.use(cors({
	origin: 'https://bug-busters.github.io/project-3-front-end',
	credentials: true
}));

app.options('*', cors());

app.use(session({
	secret: process.env.SESSION_SECRET,
	saveUninitialized: false,
	store: new MongoStore({
		mongooseConnection: mongoose.connection
	}),
	resave: false,
	genid: function(req) {
		return uuid.v4({
			rng: uuid.nodeRNG
		});
	},
	cookie: {
		maxAge: 300000 // 5 minutes
	}
}));

// initialize passport
var passport = require('./lib/passport');
app.use(passport.initialize());
app.use(passport.session());

app.use('/', routes);
app.use('/users', users);
app.use('/products', products);
app.use('/cart', cart);
app.use('/pastorders', pastorders);
app.use('/checkout', checkout);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

app.use('/static', express.static(path.join(__dirname, 'public')));

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
	app.use(function(err, req, res, next) {
		res.status(err.status || 500);
		res.render('error', {
			message: err.message,
			error: err
		});
	});
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
	res.status(err.status || 500);
	res.render('error', {
		message: err.message,
		error: {}
	});
});

app.use(express.static(__dirname));

module.exports = app;
