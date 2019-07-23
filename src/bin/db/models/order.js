"use strict";
module.exports=function(sequelize, DataTypes){
    return sequelize.define('order',{
        id: { type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        payment_mode:{type:DataTypes.STRING,default:'cod'},
        payment_status:{type:DataTypes.BOOLEAN,default:false},
        item_number:DataTypes.INTEGER,
        discount_cost:{type:DataTypes.INTEGER,default:0},
        total_cost:{type:DataTypes.INTEGER,default:0},
        user_id:DataTypes.INTEGER.UNSIGNED,        
        
    }, {
        timestamps: false,
        underscored: true
    });

}
