import express from 'express';
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
router.get('/get-product-category',categoryOp.getAllCategory)
router.post('/create-product',productOp.createProduct)

export default router;
