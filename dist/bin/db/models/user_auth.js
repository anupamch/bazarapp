"use strict";

module.exports = function (mongoose) {
  var userAuthSchema = mongoose.Schema({
    username: String,
    password: String,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  });
  var user_auth = mongoose.model('UserAuth', userAuthSchema);
  return user_auth;
};