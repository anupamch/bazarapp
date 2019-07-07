"use strict";
module.exports=function(mongoose){
var categorySchema = mongoose.Schema({
        name: String,
        created: { 
            type: Date,
            default: Date.now
        }
    });
var category = mongoose.model('Category',categorySchema);    
return category
}
