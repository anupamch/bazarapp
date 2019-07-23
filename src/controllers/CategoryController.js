import Controller from './Controller'
export default class CategoryController extends Controller{
    
    getAllCategory(req,res){
        super.db().ProductCategory.find({status:{$ne:2}}).exec(function(err,categories){
                   res.send({categories:categories,status:200})
        })
                    
    }


    async createCategory(req,res){
        let input=req.body
        
        super.db().ProductCategory.create(input,(err,category)=>{
                                            if(err){
                                                if (err) console.error(err); 
                                                res.send({status:500,err:err});
                                            }
                                            res.send({status:200,category:category});
                                        })
    }

    deleteProduct(req,res){
       
        let id=req.params.id
        super.db().ProductCategory.findOneAndUpdate({_id:id},{status:2},(err,result)=>{
         if(err){
             console.error(err); 
             res.send({status:500,err:err});
         }
         res.send({status:200,msg:"Deleted"});
        })
    }

    async categoryCount(req,res){
        let name=req.query.name
        let id=req.query.id
        let count=0
        if(typeof id !='undefined' && id!='')
          count=await super.db().ProductCategory.find({name:name,_id:{$ne:id}}).count() 
        else
          count=await super.db().ProductCategory.find({name:name}).count()
        res.send({status:200,count:count})
    }
}