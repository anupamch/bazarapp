import Controller from './Controller'
export default class CategoryController extends Controller{
    
    getAllCategory(req,res){
        super.db().Category.find({}).exec(function(err,categories){
                   res.send({categories:categories,status:200})
        })
                    
    }
}