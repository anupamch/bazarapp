"use strict";

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('Order', {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    payment_mode: {
      type: DataTypes.STRING,
      defaultValue: 'cod'
    },
    address: {
      type: DataTypes.STRING
     
    },
    payment_status: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    item_number: DataTypes.INTEGER,
    discount_cost: {
      type: DataTypes.DOUBLE,
      defaultValue: 0
    },
    delivery_charge: {
      type: DataTypes.DOUBLE,
      defaultValue: 0
    },
    total_cost: {
      type: DataTypes.DOUBLE,
      defaultValue: 0
    },
    payable_cost: {
      type: DataTypes.DOUBLE,
      defaultValue: 0
    },
    delivery_date: {
      type: DataTypes.DATE
     
    },
    user_id: DataTypes.INTEGER.UNSIGNED,
    delivery_slot_id: DataTypes.INTEGER.UNSIGNED
  }, {
    timestamps: true,
    underscored: true
  });
};