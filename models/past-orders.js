'use strict';

module.exports = function(mongoose) {
  var Schema = mongoose.Schema;

  var pastOrderSchema = new Schema(
    {
    userId: {
      type: Number,
      required: true,
      validate: {
        isInt: true
      }
    },
    products: [
      {
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
        price: {
          type: Number,
          required: true,
          validate: {
            isDecimal: true
          }
        }
      }
    ],
    total: {
      type: Number,
      required: true,
      validate: {
        isDecimal: true
      }
    },
    status: {
      type: String,
      required: true
    }

  }, {
    timestamps: true
  });

  var PastOrder = mongoose.model('PastOrder', pastOrderSchema);

  return PastOrder;
};

