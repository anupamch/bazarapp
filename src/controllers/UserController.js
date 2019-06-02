import Controller from './Controller'
import jwt from 'jsonwebtoken';
export default class UserController extends Controller{

    getUser(req,res){
      
        super.db().User.find({},function(err,users){
            res.send({users:users,response:200});
       })
       
    }

    authenticate(req,res){
        let shasum = crypto.createHash('sha1');
        shasum.update(req.body.password);
        let password = shasum.digest('hex');
        let username = req.body.name;
        super.db().UserAuth.find({'username':username,'password':password})
                           .populate('user')
                           .exec(function (err, docs) {
                           
                            if(err) throw err
                            
                            //console.log(docs)
                            if(docs.length>0){
                                let token = jwt.sign({id:docs.user}, "78947bhfn%sdfsdfAw@#234", {
                                    expiresIn: Math.floor(Date.now() / 1000)  // expires in 24 hour
                                });
                                    res.send({user:docs[0].user,token:token,auth:"1"});
                                }
                                else{
                                    res.send({auth:"0"});
                                }
                   });
    }
}