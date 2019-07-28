"use strict";

module.exports =function(sequelize, DataTypes){


    return sequelize.define('ProductCategory',{
        id: { type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        name: DataTypes.STRING,
        status:{type:DataTypes.INTEGER,defaultValue:1}
           
    }, {
        timestamps: true,
        underscored: true
    });
  
}
