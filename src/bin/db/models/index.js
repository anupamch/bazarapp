"use strict";



// load models
var models = [
     'user',
     'user_auth',
     
];


models.forEach(function(model) {

    module.exports[model]= require("./"+model);
});
