"use strict";

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('OrderDetails', {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    service_cost: {
      type: DataTypes.DOUBLE,
      defaultValue: 0
    },
    discount: {
      type: DataTypes.DOUBLE,
      defaultValue: 0
    },
    unit_price: DataTypes.DOUBLE,
    total_price: DataTypes.DOUBLE,
    item_count: DataTypes.INTEGER,
    product_unit: DataTypes.STRING,
    delivery_status: {
      type: DataTypes.DOUBLE,
      defaultValue: 0
    },
    product_id: DataTypes.INTEGER.UNSIGNED,
    order_id: DataTypes.INTEGER.UNSIGNED
  }, {
    timestamps: true,
    underscored: true
  });
};