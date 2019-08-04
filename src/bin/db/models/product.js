"use strict";
module.exports=function(sequelize, DataTypes){
    return sequelize.define('Product',{
        id: { type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        name: DataTypes.STRING,
        sku: DataTypes.STRING,
        description:DataTypes.STRING,
        price:DataTypes.STRING,
        image:DataTypes.STRING,
        unit:DataTypes.STRING,
        minimum_order:{type:DataTypes.DOUBLE,defaultValue:1},
        discount:{type:DataTypes.DOUBLE,defaultValue:0},
        is_service:{type:DataTypes.BOOLEAN,defaultValue:0},
        service_name:DataTypes.STRING,
        service_cost:{type:DataTypes.DOUBLE,defaultValue:0},
        status:{type:DataTypes.INTEGER,defaultValue:1},
        category_id:DataTypes.INTEGER.UNSIGNED,
        
    }, {
        timestamps: true,
        underscored: true
    });

}
