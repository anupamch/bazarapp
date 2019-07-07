"use strict";

module.exports =function(mongoose) {


    var  offerSchema = mongoose.Schema({
        
       
        offer: String,
          
    });
    var offer=mongoose.model('Offer',offerSchema)
    return offer;
}
