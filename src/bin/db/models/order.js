"use strict";
module.exports=function(mongoose){
var orderSchema = mongoose.Schema({
        payment_mode:{type:String,default:'cod'},
        payment_status:{type:Boolean,default:false},
        item_number:Number,
        discount_cost:{type:Number,default:0},
        total_cost:{type:Number,default:0},
        user:{
                    type: mongoose.Schema.Types.ObjectId, 
                    ref: 'User'
                  },        
        created: { 
            type: Date,
            default: Date.now
        }
    });
var order = mongoose.model('Order',orderSchema);    
return order
}
