"use strict";

module.exports =function(sequelize, DataTypes){


   return sequelize.define('Offer',{
        
       
        offer: DataTypes.STRING,
          
    }, {
        timestamps: true,
        underscored: true
    });
    
}
