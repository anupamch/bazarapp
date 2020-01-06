"use strict";

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
    'BazarSlip',
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
      },
      item_count: { type: DataTypes.INTEGER, defaultValue: 0 },
      delivery_status: { type: DataTypes.BOOLEAN, defaultValue: false },
      user_id: DataTypes.INTEGER.UNSIGNED,
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
      delivery_slot_id: DataTypes.INTEGER.UNSIGNED,
      delivery_date: {
        type: DataTypes.DATE
       
      },
      total_cost: {
        type: DataTypes.DOUBLE,
        defaultValue: 0
      },
      payable_cost: {
        type: DataTypes.DOUBLE,
        defaultValue: 0
      },
      discount_cost: {
        type: DataTypes.DOUBLE,
        defaultValue: 0
      },
      delivery_charge: {
        type: DataTypes.DOUBLE,
        defaultValue: 0
      },
      slip_text: {
        type: DataTypes.TEXT,
        defaultValue: ''
      },
      slip_image: {
        type: DataTypes.STRING,
        defaultValue: ''
      }
    },
    {
      timestamps: true,
      underscored: true
    }
  );
};
