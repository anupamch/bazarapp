"use strict";



// load models
var models = [
     'user',
     'user_auth',
     'product',
     'product_category',
     'order',
     'order_details',
     'offer',
     'category'

     
];


models.forEach(function(model) {

    module.exports[model]= require("./"+model);
});
