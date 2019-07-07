"use strict";
module.exports=function(mongoose){
var userSchema = mongoose.Schema({
        firstName: String,
        lastName: String,
        address:String,
        landmark:String,
        pincode:String,
        city:{type:String,default:null},
        state:{type:String,default:'WB'},
        country:{type:String,default:'IN'},
        phone:String,
        email:{type:String,default:null},
        created: { 
            type: Date,
            default: Date.now
        }
    });
var user = mongoose.model('User',userSchema);    
return user
}




