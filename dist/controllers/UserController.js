"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Controller2 = _interopRequireDefault(require("./Controller"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var UserController =
/*#__PURE__*/
function (_Controller) {
  _inherits(UserController, _Controller);

  function UserController() {
    _classCallCheck(this, UserController);

    return _possibleConstructorReturn(this, _getPrototypeOf(UserController).apply(this, arguments));
  }

  _createClass(UserController, [{
    key: "getUser",
    value: function getUser(req, res) {
      _get(_getPrototypeOf(UserController.prototype), "db", this).call(this).User.find({}, function (err, users) {
        res.send({
          users: users,
          response: 200
        });
      });
    }
  }, {
    key: "authenticate",
    value: function authenticate(req, res) {
      var shasum = crypto.createHash('sha1');
      shasum.update(req.body.password);
      var password = shasum.digest('hex');
      var username = req.body.name;

      _get(_getPrototypeOf(UserController.prototype), "db", this).call(this).UserAuth.find({
        'username': username,
        'password': password
      }).populate('user').exec(function (err, docs) {
        if (err) throw err; //console.log(docs)

        if (docs.length > 0) {
          var token = _jsonwebtoken["default"].sign({
            id: docs.user
          }, "78947bhfn%sdfsdfAw@#234", {
            expiresIn: Math.floor(Date.now() / 1000) // expires in 24 hour

          });

          res.send({
            user: docs[0].user,
            token: token,
            auth: "1"
          });
        } else {
          res.send({
            auth: "0"
          });
        }
      });
    }
  }]);

  return UserController;
}(_Controller2["default"]);

exports["default"] = UserController;