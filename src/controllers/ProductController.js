import Controller from './Controller'
import multer from 'multer'
import Resize from './Resize'
import path from 'path'
class ProductController extends Controller{
   
    constructor(){
        super()
        
    }
   
    
    
   getProduct(req,res){
    
      super.db().Product
                 .find({})
                 .populate('product_category')
                 .exec(function(err, product){
                                                res.send({products:product,status:200});
                                            });
   }


    createProduct(req,res){
       console.log(req.body.fields)
    var filename="";   
    let storage = multer.diskStorage({

        destination: (req, file, cb) => {
    
            cb(null, 'public/uploads/pimages')
    
        },
    
        filename: (req, file, cb) => {
            filename=Date.now() + '-' + file.originalname
            cb(null, filename)
    
        }
    
    }); 
    let upload = multer({

        storage
    
    }).array('pimage',1)  
    var ProductObj=super.db().Product;
    upload(req, res, function(err) {

        if (err) {

            console.log("Unable to upload file")

        }
        let input=JSON.parse(req.body.fields)
        input.image=filename
        
        let product=new ProductObj(input)
        product.save((err,product)=>{
            if(err){
                if (err) console.error(err); 
                res.send({status:500,err:err});
            }
            res.send({status:200,product:product});
       })

    });
    /*console.log(req.files)
    var ProductObj=super.db().Product;
    const imagePath = path.join(__dirname, '/public/uploads/pimages');
    const fileUpload = new Resize(imagePath);
    filename = await fileUpload.save(req.files['pimage']);
    let input=JSON.parse(req.body.fields)
    input.image=filename
        
    let product=new ProductObj(input)
    product.save((err,product)=>{
    if(err){
                if (err) console.error(err); 
                res.send({status:500,err:err});
            }
            res.send({status:200,product:product});
    })*/
       
   }
}

export default ProductController;