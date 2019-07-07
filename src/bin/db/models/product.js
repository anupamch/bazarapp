"use strict";
module.exports=function(mongoose){
var productSchema = mongoose.Schema({
        name: String,
        sku: String,
        price:String,
        image:String,
        unit:String,
        minimum_order:{type:Number,default:1},
        discount:{type:Number,default:0},
        service_cost:{type:Number,default:0},
        category:{
                  type: mongoose.Schema.Types.ObjectId, 
                  ref: 'ProductCategory'
                },
        created: { 
            type: Date,
            default: Date.now
        }
    });
var product = mongoose.model('Product',productSchema);    
return product
}
