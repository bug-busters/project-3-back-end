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
        },
        quantity: {
          type: Number,
          required: true,
          unique: true,
          validate: {
            isInt: true
          }
        }
      }
    ],
    status: {
      type: String,
      required: true
    }

  }, {
    timestamps: true
  });

  pastOrderSchema.virtual('total').get(function() {
        var total = 0.00;

        this.products.forEach(function(product) {
            total += product.price * product.quantity;
        });

        return total;
  });

  pastOrderSchema.virtual('subtotal').get(function() {
        var subTotalArr = {};

        this.products.forEach(function(product) {
            subTotalArr[product.sku] = product.price * product.quantity;
        });

        return subTotalArr;
  });

  var PastOrder = mongoose.model('PastOrder', pastOrderSchema);

  return PastOrder;
};

