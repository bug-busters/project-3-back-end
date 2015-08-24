'use strict';

module.exports = function(sequelize, DataTypes) {
  var Address = sequelize.define('Address', {
    id : {
      type : DataTypes.INTEGER,
      autoIncrement : true,
      primaryKey : true
    },
    user_id : {
      type : DataTypes.INTEGER,
      allowNull : false
    },
    type : {
      type : DataTypes.STRING,
      allowNull : true,
    },
    street: {
      type : DataTypes.STRING,
      allowNull : false
    },
    city: {
      type : DataTypes.STRING,
      allowNull : false
    },
    state: {
      type : DataTypes.STRING,
      allowNull : false
    },
    postal_code: {
      type : DataTypes.INTEGER,
      allowNull : true
    }
  }, {
    timestamps : true
  });

  return Address;
};

