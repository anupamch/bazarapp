"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _path = _interopRequireDefault(require("path"));

var _cookieParser = _interopRequireDefault(require("cookie-parser"));

var _morgan = _interopRequireDefault(require("morgan"));

var _index = _interopRequireDefault(require("./routes/index"));

var _models = _interopRequireDefault(require("./bin/db/models"));

var _crypto = _interopRequireDefault(require("crypto"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//var indexRouter = require('./routes/index');
var app = (0, _express.default)();
app.use((0, _morgan.default)('dev'));
app.use(_express.default.json());
app.use(_express.default.urlencoded({
  extended: false
}));
app.use((0, _cookieParser.default)());
app.use(_express.default.static(_path.default.join(__dirname, '../public')));

_models.default.db.sync({
  force: false
}).then(function (data) {
  _models.default.User.findOne({
    where: {
      email: 'admin@netbazzar.com'
    }
  }).then(async function (todo) {
    if (todo == null || todo == '' || todo == 'null') {
      _models.default.User.create({
        'first_name': 'Admin',
        'last_name': 'admin',
        email: 'admin@netbazzar.com',
        'address': 'netbazzar',
        'landmark': 'netbazzar',
        'pincode': 'netbazzar',
        phone: '12345678952',
        user_status_id: 1,
        user_type_id: '1'
      }).then(function (response) {
        var shasum = _crypto.default.createHash('sha1');

        shasum.update('12345678');
        var password = shasum.digest('hex');

        _models.default.UserAuth.create({
          username: 'admin',
          password: password,
          user_id: response.dataValues.id
        });
      }, function (data) {// console.log(data)
      });
    }
  });

  console.log('db Sync done');
});

app.use('/', _index.default);
var _default = app;
exports.default = _default;