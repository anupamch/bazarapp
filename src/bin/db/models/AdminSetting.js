"use strict";

module.exports =function(sequelize, DataTypes){


   return sequelize.define('AdminSetting',{
        
        id:{ type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        to_email: DataTypes.STRING,
        from_email: DataTypes.STRING,
        min_order: DataTypes.DOUBLE,
        shipping_order_range: {type:DataTypes.DOUBLE,comment:"min_order to that range shipping charge applicable"},
        shipping_price:DataTypes.DOUBLE

          
    }, {
        timestamps: true,
        underscored: true
    });
    
}
