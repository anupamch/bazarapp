"use strict";

module.exports =function(sequelize, DataTypes){


   return sequelize.define('DeliverySlot',{
        
        id: { type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        slot: DataTypes.STRING,
        status:{type:DataTypes.INTEGER,defaultValue:1}
          
    }, {
        timestamps: true,
        underscored: true
    });
    
}
