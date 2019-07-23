import Controller from './Controller'

import Resize from './Resize'
import path from 'path'
var fs = require('fs');
import sharp from 'sharp'
class ProductController extends Controller{
   
    constructor(){
        super()
        
    }
   
    
    
   getProduct(req,res){
    
      super.db().Product
                 .find({status:{$ne:2}})
                 .populate('category')
                 .exec(function(err, product){
                                                console.log(product)    
                                                res.send({products:product,status:200});
                                            });
   }


    async createProduct(req,res){
      
    var filename="";   
    
    var ProductObj=super.db().Product;
    
    
   //console.log(req.file)
    var ProductObj=super.db().Product;
    const imagePath = path.join(__dirname, '/public/uploads/pimages');
    //const fileUpload = new Resize(imagePath);
    if (!req.file) {
        res.status(401).json({error: 'Please provide an image'});
      }
    var filename=Date.now() + '-' + req.file.originalname 
    sharp(req.file.path).resize(200, 200).toFile(req.file.destination+"/"+filename,function(err, info) {
        if (err) console.log(err)
        fs.unlink(req.file.path,function(){})
        
      })
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
       
   }
   async skuCount(req,res){
       let sku=req.query.sku
       let id=req.query.id
       let count=0
       if(typeof id !='undefined' && id!='')
         count=await super.db().Product.find({sku:sku,_id:{$ne:id}}).count() 
       else
         count=await super.db().Product.find({sku:sku}).count()
       res.send({status:200,count:count})
   }

   async getProductById(req,res){
       try{
            let id=req.params.id
            if(id=="" || typeof id === undefined){
                res.send({status:500,msg:"Invalid product"})
            }

            let product=await super.db().Product.find({_id:id})
            res.send({status:200,product:product})
      }catch(err){
            res.send({status:500,msg:err})
      }
   }

   async editProduct(req,res){
   
    var filename="";   
    
    var ProductObj=super.db().Product;
    let input=JSON.parse(req.body.fields)
    
   //console.log(req.file)
    var ProductObj=super.db().Product;
    
    var filename=""
    if (req.file && typeof req.file != 'undefined') {
        //const imagePath = path.join(__dirname, '/public/uploads/pimages');
        const old_file_name=input.image
        filename=Date.now() + '-' + req.file.originalname
        input.image=filename 
        
        sharp(req.file.path).resize(200, 200).toFile(req.file.destination+"/"+filename,function(err, info) {
            if (err) console.log(err)
            fs.unlink(req.file.path,function(){})
            fs.unlink(req.file.destination+"/"+old_file_name,function(){})

            
        })
    }
    
    
    
    let id=input._id;
    delete input.id;
    
        
    let product=ProductObj.findOneAndUpdate({_id:id},input,(err,product)=>{
        if(err){
            console.error(err); 
            res.send({status:500,err:err});
        }
        res.send({status:200,product:product});
    })
    
       
   }

    deleteProduct(req,res){
       
       let id=req.params.id
       super.db().Product.findOneAndUpdate({_id:id},{status:2},(err,result)=>{
        if(err){
            console.error(err); 
            res.send({status:500,err:err});
        }
        res.send({status:200,msg:"Deleted"});
       })
   }

}

export default ProductController;