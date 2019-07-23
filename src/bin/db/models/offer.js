"use strict";

module.exports =function(sequelize, DataTypes){


   return sequelize.define('offer',{
        
       
        offer: DataTypes.STRING,
          
    }, {
        timestamps: false,
        underscored: true
    });
    
}
