"use strict";
module.exports=function(sequelize, DataTypes){
    return sequelize.define('Order',{
        id: { type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        order_id:{type:DataTypes.STRING(10),allowNull: false,
            unique: true},
        payment_mode:{type:DataTypes.STRING,defaultValue:'cod'},
        payment_status:{type:DataTypes.BOOLEAN,defaultValue:false},
        item_number:DataTypes.INTEGER,
        discount_cost:{type:DataTypes.DOUBLE,defaultValue:0},
        total_cost:{type:DataTypes.DOUBLE,defaultValue:0},
        payable_cost:{type:DataTypes.DOUBLE,defaultValue:0},
        user_id:DataTypes.INTEGER.UNSIGNED,
        delivery_date:DataTypes.DATE,
        delivery_slot_id:DataTypes.INTEGER.UNSIGNED,
        address:DataTypes.TEXT,
        delivery_charge:{type:DataTypes.DOUBLE,defaultValue:0},
              
        
    }, {
        timestamps: true,
        underscored: true
    });

}
