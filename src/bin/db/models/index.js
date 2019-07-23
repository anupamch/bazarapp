"use strict";
var db=require('../connection.js')
var DataTypes = require("sequelize");


// load models
var models = [
     'user',
     'user_auth',
     'product',
     'product_category',
     'order',
     'order_details',
     'offer'
   
];


models.forEach(function(model) {

    module.exports[model]= require("./"+model);
});

(function(m) {
  console.log(m)  
  m.user_auth.belongsTo(m.user,{foreignKey:'user_id'})
  m.product.belongsTo(m.product_category,{foreignKey:'category_id'})
  m.order_details.belongsTo(m.product,{foreignKey:'product_id'})
  m.order_details.belongsTo(m.order,{foreignKey:'order_id'})
    
})(module.exports);

module.exports.db = db;