"use strict";
module.exports=function(mongoose){
var orderDetailsSchema = mongoose.Schema({
        service_cost:{type:Number,default:0},
        discount:{type:Number,default:0},
        unit_price:Number,
        total_price:Number,
        item_count:Number,
        product_unit:String,
        delivery_status:{type:Number,default:0},
        product:{
                    type: mongoose.Schema.Types.ObjectId, 
                    ref: 'Product'
                  },
        order:{
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Order'
        },                  
        created: { 
            type: Date,
            default: Date.now
        }
    });
var order_details = mongoose.model('OrderDetails',orderDetailsSchema);    
return order_details
}
