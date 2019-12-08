"use strict";

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('userAuth', {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    user_id: DataTypes.INTEGER.UNSIGNED
  }, {
    timestamps: true,
    underscored: true
  });
};