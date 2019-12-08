"use strict";

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('DeliverySlot', {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    slot: DataTypes.STRING
  }, {
    timestamps: true,
    underscored: true
  });
};