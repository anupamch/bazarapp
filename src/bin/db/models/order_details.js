"use strict";
module.exports=function(sequelize, DataTypes){
    return sequelize.define('orderDetails',{
        id: { type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        service_cost:{type:DataTypes.DOUBLE,default:0},
        discount:{type:DataTypes.DOUBLE,default:0},
        unit_price:DataTypes.DOUBLE,
        total_price:DataTypes.DOUBLE,
        item_count:DataTypes.INTEGER,
        product_unit:DataTypes.STRING,
        delivery_status:{type:DataTypes.DOUBLE,default:0},
        product_id:DataTypes.INTEGER.UNSIGNED,
        order_id:DataTypes.INTEGER.UNSIGNED,                  
        
    }, {
        timestamps: false,
        underscored: true
    });

}
