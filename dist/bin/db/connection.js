"use strict";
'user strict';

var _express = _interopRequireDefault(require("express"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = require('../../app.js');

app = (0, _express.default)();

var Sequelize = require('sequelize');

var fs = require('fs');

var env = app.get('env');
console.log(env);
var dbConfigFile = __dirname + "/dbConfig.json";
var data = fs.readFileSync(dbConfigFile, 'utf8');
var dbConfig = JSON.parse(data)['development'];
var password = dbConfig.password ? dbConfig.password : null;
var port = dbConfig.port ? dbConfig.port : 3306;
var connection = new Sequelize(dbConfig.database, dbConfig.user, password, {
  host: 'localhost',
  dialect: 'mysql',
  port: port,
  max: 5,
  min: 0,
  idle: 10000
});
connection.authenticate().then(function (err) {
  console.log('Connection has been established successfully.');
}, function (err) {
  console.log('Unable to connect to the database:' + err);
});
module.exports = connection;