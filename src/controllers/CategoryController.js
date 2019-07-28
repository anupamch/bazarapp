import Controller from './Controller'
import Sequelize from 'Sequelize'
export default class CategoryController extends Controller{
    
    getAllCategory(req,res){
        const Op = Sequelize.Op;
        super.db.ProductCategory.findAll({
                                              where:{
                                                      status:{
                                                              [Op.ne]:2
                                                            }
                                                    }
                                          }).then(categories=>{
                                                                    

                                                                    res.json({categories:categories,status:200})
                                                            })
                    
    }
    getCategoryById(req,res){
        let id=req.params.id
        super.db.ProductCategory.findOne({
                                              where:{
                                                      id:id
                                                    }
                                          }).then(categories=>{
                                                                    

                                                                    res.json({category:categories,status:200})
                                                            })
                    
    }

    async createCategory(req,res){
        let input=req.body
        
        super.db.ProductCategory.create(input).then(category=>{
                                           
                                            res.send({status:200,category:category});
                                        },err=>{
                                           
                                                res.send({status:500,err:err});
                                        
                                        })
    }

    deleteCtegory(req,res){
       
        let id=req.params.id
        super.db.ProductCategory.update({status:2},{where:{id:id}}).then(result=>{
         
         res.send({status:200,msg:"Deleted"});
        },(err)=>{
          
            res.send({status:500,err:err});
        })
    }

    async categoryCount(req,res){
        const Op = Sequelize.Op;
        let name=req.query.name
        let id=req.query.id
        let count=0
        if(typeof id !='undefined' && id!='')
          count=await super.db.ProductCategory.count({where:{name:name,id:{[Op.ne]:id}}})
        else
          count=await super.db.ProductCategory.count({where:{name:name}})
        res.send({status:200,count:count})
    }

    editCategory(req,res){
        let input=req.body
        
        super.db.ProductCategory.update(input,{where:{id:input.id}}).then(category=>{
                                           
                                            res.send({status:200,msg:"category updated."});
                                        },err=>{
                                           
                                                res.send({status:500,err:err});
                                        
                                        })
    }

}