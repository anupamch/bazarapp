"use strict";
module.exports=function(sequelize, DataTypes){
    return sequelize.define('user',{
        id: { type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        firstName: DataTypes.STRING,
        lastName: DataTypes.STRING,
        address:DataTypes.STRING,
        landmark:DataTypes.STRING,
        pincode:DataTypes.STRING,
        city:{type:DataTypes.STRING,default:null},
        state:{type:DataTypes.STRING,default:'WB'},
        country:{type:DataTypes.STRING,default:'IN'},
        phone:DataTypes.STRING,
        email:{type:DataTypes.STRING,default:null},
        
    }, {
        timestamps: false,
        underscored: true
    });

}




