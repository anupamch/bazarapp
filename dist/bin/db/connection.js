"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var crypto = require('crypto');

var mongoose = require('mongoose');

var models = require('./models');

var connection = {};
mongoose.connect('mongodb://localhost:27017/bazerapp');
connection.dbConnection = mongoose.connection;
connection.dbConnection.once('open', function () {
  console.log("DB Connected");
  connection.User = models['user'](mongoose);
  connection.UserAuth = models['user_auth'](mongoose);
  connection.UserAuth.countDocuments({
    'username': 'admin'
  }, function (err, count) {
    if (err) throw err;
    console.log("Number of users:", count); //readCSV()

    if (count == 0) {
      var shasum = crypto.createHash('sha1');
      shasum.update('12345678');
      var password = shasum.digest('hex');
      new connection.User({
        firstName: "Anupam",
        lastName: "Chowdhury"
      }).save(function (err, results) {
        if (err) throw err;
        new connection.UserAuth({
          username: 'admin',
          password: password,
          user: results._id
        }).save(function (err, results) {
          if (err) throw err;
          console.log("Admin Created");
        });
      });
    }
  });
});

var readCSV = function readCSV() {
  var fs = require('fs');

  var parse = require('csv-parse');

  var csvData = [];
  fs.createReadStream('public/plist.csv').pipe(parse({
    delimiter: ':'
  })).on('data', function (csvrow) {
    console.log(csvrow); //do something with csvrow

    csvData.push(csvrow);
  }).on('end', function () {
    //do something wiht csvData
    console.log(csvData);
  });
};

var _default = connection;
exports["default"] = _default;