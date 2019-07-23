import express from 'express';
import upload from '../middleware/imageUpload'
import UserController from '../controllers/UserController';
import ProductController from '../controllers/ProductController';
import CategoryController from '../controllers/CategoryController';
import verifyToken from '../middleware/verify_token'
//import connection from '../bin/db/connection';
var router = express.Router();
const userOp=new UserController();
const productOp=new ProductController();
const categoryOp=new CategoryController();
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
router.get('/*',verifyToken);
router.post('/*',verifyToken);
router.get('/users',userOp.getUser);
router.get('/products',productOp.getProduct);

router.post('/create-product',upload.single('pimage'),productOp.createProduct)
router.get('/skuCount',productOp.skuCount)
router.get('/get-single-product/:id',productOp.getProductById)
router.post('/edit-product',upload.single('pimage'),productOp.editProduct)
router.get('/delete-product/:id',productOp.deleteProduct)

router.get('/get-product-category',categoryOp.getAllCategory)
router.post('/create-category',categoryOp.createCategory)
router.get('/count-category',categoryOp.categoryCount)
export default router;
