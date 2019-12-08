"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _imageUpload = _interopRequireDefault(require("../middleware/imageUpload"));

var _verify_token = _interopRequireDefault(require("../middleware/verify_token"));

var _UserController = _interopRequireDefault(require("../controllers/UserController"));

var _ProductController = _interopRequireDefault(require("../controllers/ProductController"));

var _CategoryController = _interopRequireDefault(require("../controllers/CategoryController"));

var _OrderController = _interopRequireDefault(require("../controllers/OrderController"));

var _AdminSettingController = _interopRequireDefault(require("../controllers/AdminSettingController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//import connection from '../bin/db/connection';
var router = _express.default.Router();

const userOp = new _UserController.default();
const productOp = new _ProductController.default();
const categoryOp = new _CategoryController.default();
const orderOp = new _OrderController.default();
const settingOp = new _AdminSettingController.default();
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
router.post('/authenticate', userOp.authenticate);
router.post('/registration', userOp.registration);
router.get('/*', _verify_token.default);
router.post('/*', _verify_token.default);
router.get('/users', userOp.getUser);
router.get('/products', productOp.getProduct);
router.get('/products-by-category/:cat_id', productOp.getProductByCategory);
router.post('/create-product', _imageUpload.default.single('pimage'), productOp.createProduct);
router.get('/skuCount', productOp.skuCount);
router.get('/get-single-product/:id', productOp.getProductById);
router.post('/edit-product', _imageUpload.default.single('pimage'), productOp.editProduct);
router.get('/delete-product/:id', productOp.deleteProduct);
router.get('/get-product-category', categoryOp.getAllCategory);
router.post('/create-category', categoryOp.createCategory);
router.get('/count-category', categoryOp.categoryCount);
router.get('/get-product-category-by-id/:id', categoryOp.getCategoryById);
router.post('/edit-category', categoryOp.editCategory);
router.get('/delete-category/:id', categoryOp.deleteCtegory);
router.get('/get-orders', orderOp.getAllOrder);
router.get('/get-order-details/:id', orderOp.getOrderDetails);
router.get('/get-setting', settingOp.getAllSettings);
router.get('/get-delivery-slot', settingOp.getDeliverySlot);
router.post('/update-setting', settingOp.saveSettings);
var _default = router;
exports.default = _default;