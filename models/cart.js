'use strict';

module.exports = function(sequelize, Datatype) {
	var Cart = sequelize.define('Cart', {
		id: {
			type: Datatype.INTEGER,
			autoIncrement: true,
			primaryKey: true,
			allowNull: false
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
    }
	});

	return Cart;
};
