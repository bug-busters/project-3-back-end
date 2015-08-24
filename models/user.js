'use strict';

module.exports = function(sequelize, DataTypes) {

	var User = sequelize.define('User', {
	  id: {
	    type: DataTypes.INTEGER,
	    autoIncrement: true,
	    primaryKey: true,
	    allowNull: false
	  },
	  firstName: {
			type: DataTypes.STRING,
			required: false,
			unique: false
	  },
	  lastName: {
			type: DataTypes.STRING,
			required: false,
			unique: true
	  },
	  email: {
			type: DataTypes.STRING,
			required: false,
			unique: true,
			validates: {
				isEmail: true
			}
	  },
	  password: {
	    type : DataTypes.STRING,
	    allowNull : false,
	    unique : false
	  },
	  phone_number: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		is_admin: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: false
		}
	}, {
		timestamps: true,
		classMethods: {
      associate: function(models){
        User.hasMany(models.Address)
      }
    }
	});

	return User;
}
