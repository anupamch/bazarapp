"use strict";

var db = require('../connection.js');

var DataTypes = require("sequelize"); // load models


var models = ['User', 
              'UserAuth', 
              'Product', 
              'ProductCategory', 
              'DeliverySlot', 
              'Order', 
              'OrderDetails', 
              'Offer', 
              'AdminSetting',
              'BazarSlip'
            ];
models.forEach(function (model) {
  module.exports[model] = db.import("./" + model);
});

(function (m) {
  m.UserAuth.belongsTo(m.User, {
    foreignKey: 'user_id'
  });
  m.Product.belongsTo(m.ProductCategory, {
    foreignKey: 'category_id'
  });
  m.Order.belongsTo(m.User, {
    foreignKey: 'user_id'
  });
  m.Order.belongsTo(m.DeliverySlot, {
    foreignKey: 'delivery_slot_id'
  });
  m.OrderDetails.belongsTo(m.Product, {
    foreignKey: 'product_id'
  });
  m.OrderDetails.belongsTo(m.Order, {
    foreignKey: 'order_id'
  });
  m.OrderDetails.belongsTo(m.Product, {
    foreignKey: 'product_id'
  });
  m.BazarSlip.belongsTo(m.User, {
    foreignKey: 'user_id'
  });
  m.User.hasMany(m.BazarSlip, {
    foreignKey: 'user_id'
  });
  m.User.hasMany(m.Order, {
    foreignKey: 'user_id'
  });

})(module.exports);

module.exports.db = db;