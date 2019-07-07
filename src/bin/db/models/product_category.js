"use strict";

module.exports =function(mongoose) {


    var  productCategorySchema = mongoose.Schema({
        
        username: String,
        password: String,
        
        user:{
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'User'
        }        
    });
    var product_category=mongoose.model('ProductCategory',productCategorySchema)
    return product_category;
}
