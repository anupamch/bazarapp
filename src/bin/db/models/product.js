"use strict";
module.exports=function(sequelize, DataTypes){
    return sequelize.define('product',{
        id: { type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        name: DataTypes.DataTypes.STRING,
        sku: DataTypes.STRING,
        description:DataTypes.STRING,
        price:DataTypes.STRING,
        image:DataTypes.STRING,
        unit:DataTypes.STRING,
        minimum_order:{type:DataTypes.DOUBLE,defaultValue:1},
        discount:{type:DataTypes.DOUBLE,default:0},
        service_cost:{type:DataTypes.DOUBLE,default:0},
        status:{type:DataTypes.INTEGER,default:1},
        category_id:DataTypes.INTEGER.UNSIGNED,
        
    }, {
        timestamps: false,
        underscored: true
    });

}
