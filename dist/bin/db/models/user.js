"use strict";

module.exports = function (mongoose) {
  var userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    address: {
      type: String,
      "default": null
    },
    phone: {
      type: String,
      "default": null
    },
    created: {
      type: Date,
      "default": Date.now
    }
  });
  var user = mongoose.model('User', userSchema);
  return user;
};