import express from 'express';
import upload from '../middleware/imageUpload'
import slipUpload from '../middleware/bazarSlipUpload'
import categoryImage from '../middleware/categoryImage'
import verifyToken from '../middleware/verify_token'
import UserController from '../controllers/UserController';
import ProductController from '../controllers/ProductController';
import CategoryController from '../controllers/CategoryController';
import OrderController from '../controllers/OrderController';
import AdminSettingController from '../controllers/AdminSettingController';

//import connection from '../bin/db/connection';
var router = express.Router();
const userOp=new UserController();
const productOp=new ProductController();
const categoryOp=new CategoryController();
const orderOp=new OrderController();
const settingOp=new AdminSettingController();
/* GET api listing. */
router.use(function(req, res, next) {
  //cors();
  
  var protocol=req.protocol+"://";
  var host=req.hostname;
  

  //res.header('Access-Control-Allow-Origin', protocol+host+':4200');
  res.header('Access-Control-Allow-Origin', "*");
        
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept,Authorization,X-Custom-Header,x-access-token');
  res.header('Access-Control-Allow-Credentials', true);
  
  next();
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
  
});
router.post('/authenticate',userOp.authenticate);
router.post('/registration',userOp.registration);
router.get('/*',verifyToken);
router.post('/*',verifyToken);
router.get('/users',userOp.getUser);
router.post('/change-address',userOp.changeAddress);
/*********Product********** */
router.get('/products',productOp.getProduct);
router.get('/products-by-category/:cat_id',productOp.getProductByCategory);
router.post('/create-product',upload.single('pimage'),productOp.createProduct)
router.get('/skuCount',productOp.skuCount)
router.get('/get-single-product/:id',productOp.getProductById)
router.post('/edit-product',upload.single('pimage'),productOp.editProduct)
router.get('/delete-product/:id',productOp.deleteProduct)

/*********Product Category********** */
router.get('/get-product-category',categoryOp.getAllCategory)
router.post('/create-category',categoryImage.single('cimage'),categoryOp.createCategory)
router.get('/count-category',categoryOp.categoryCount)
router.get('/get-product-category-by-id/:id',categoryOp.getCategoryById);
router.post('/edit-category',categoryImage.single('cimage'),categoryOp.editCategory)
router.get('/delete-category/:id',categoryOp.deleteCtegory)

router.get('/get-orders',orderOp.getAllOrder)
router.get('/get-bazar-slip',orderOp.getBazarSlip)
router.post('/get-my-bazar-slip',orderOp.getMyBazarSlipList)
router.get('/get-bazar-slip-details/:id',orderOp.getBazarSlipDetails)
router.post('/update-bazar-slip',orderOp.updateBarazSlipDetails)
router.get('/get-order-details/:id',orderOp.getOrderDetails)
router.post('/get-order-details',orderOp.getOrderDetails)
router.post('/save-order',orderOp.saveOrder)
router.post('/upload-bazar-slip',slipUpload.single('upload'),orderOp.uploadBazarSlipImage)
router.post('/change-order-payment-status',orderOp.changePaymentStatus)
router.post('/change-order-delivery-status',orderOp.changeDeliveryStatus)
router.post('/user-order-list',orderOp.myOrders)

router.get('/get-setting',settingOp.getAllSettings);
router.post('/update-setting',settingOp.saveSettings);
router.get('/get-delivery-slot', settingOp.getDeliverySlot);
export default router;
