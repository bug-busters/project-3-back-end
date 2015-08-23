'use strict';

var mongoose = require('mongoose');

var userSchema = new mongoose.Schema ({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: false,
    unique: true,
    validates: {
      isEmail: true
    }
  },
  password : {
    type : String,
    required : false,
    unique : false
  },
  dob: {
    type: String,
    match: /\d{4}-\d{2}-\d{2}/
  },
  phone_number: {
    type: String,
    required: true,
    unique: true,
  },
  // Address Book Part
  address_book: {
    primary_address: {
      name: {
        last: {
          type: String,
          required: true
        },
        first: {
          type: String,
          required: true
        }
      },
      address : {
        type: String,
        required: false
      }
    }
  }
}, {
  timestamps: true,
});

var User = mongoose.model('User', userSchema);

module.exports = User;

