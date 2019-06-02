"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _UserController = _interopRequireDefault(require("../controllers/UserController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

//import connection from '../bin/db/connection';
var router = _express["default"].Router();

var userOp = new _UserController["default"]();
/* GET api listing. */

router.use(function (req, res, next) {
  //cors();
  var protocol = req.protocol + "://";
  var host = req.hostname; //res.header('Access-Control-Allow-Origin', protocol+host+':4200');

  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept,Authorization,X-Custom-Header,x-access-token');
  res.header('Access-Control-Allow-Credentials', true);
  next();
});
/* GET home page. */

router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Express'
  });
});
router.get('/users', userOp.getUser);
router.post('/authenticate', userOp.getUser);
var _default = router;
exports["default"] = _default;