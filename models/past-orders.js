'use strict';

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/syntactic_sugar');

var Schema = mongoose.Schema;

var pastOrderSchema = new Schema({
  userId: {
    type: Number,
    required: true,
    validate: {
      isInt: true
    }
  },
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
  image: {
    type: String,
    validate: {
      isURL: true
    }
  }
}, {
  timestamps: true
});
