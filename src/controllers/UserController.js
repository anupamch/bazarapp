import Controller from './Controller'
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
export default class UserController extends Controller{

    getUser(req,res){
      
        db.User.findAll().then(users=>{
            res.send({users:users.dataValues,response:200});
       })
       
    }

    authenticate(req,res){
        let shasum = crypto.createHash('sha1');
        shasum.update(req.body.password);
        let password = shasum.digest('hex');
        let username = req.body.username;
        
        super.db.UserAuth.findOne({where:{'username':username,'password':password},include:[{model:super.db.User}]})
                           
                           .then(reponse=>{
                           console.log(reponse)
                           
                           
                            if(reponse){
                                 let token = jwt.sign({id:reponse.dataValues.id}, "78947bhfn%sdfsdfAw@#234", {
                                    expiresIn: Math.floor(Date.now() / 1000)  // expires in 24 hour
                                });
                                    res.send({user:reponse.user.dataValues,token:token,auth:"1"}); 
                                }
                                else{
                                    res.send({auth:"0",status:200});
                                }
                   });
    }
}