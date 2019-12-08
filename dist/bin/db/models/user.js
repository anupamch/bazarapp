"use strict";

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('user', {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true
    },
    landmark: {
      type: DataTypes.STRING,
      allowNull: true
    },
    pincode: {
      type: DataTypes.STRING,
      allowNull: true
    },
    city: {
      type: DataTypes.STRING
    },
    state: {
      type: DataTypes.STRING,
      defaultValue: 'WB'
    },
    country: {
      type: DataTypes.STRING,
      defaultValue: 'IN'
    },
    phone: DataTypes.STRING,
    email: {
      type: DataTypes.STRING
    },
    user_status_id: {
      type: DataTypes.INTEGER,
      defaultValue: 1
    },
    user_type_id: {
      type: DataTypes.INTEGER
    }
  }, {
    timestamps: true,
    underscored: true
  });
};