"use strict";

module.exports =function(sequelize, DataTypes){


    return sequelize.define('productCategory',{
        id: { type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        name: DataTypes.STRING,
        status:{type:DataTypes.INTEGER,default:1}
           
    }, {
        timestamps: false,
        underscored: true
    });
  
}
