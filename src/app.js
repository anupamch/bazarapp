import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import indexRouter from './routes/index';
import connection from './bin/db/models'
import crypto from 'crypto';
//var indexRouter = require('./routes/index');


var app = express();


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));
connection.db.sync({force:false}).then(function(data){
   

    connection.User.findOne({where:{
        email:'admin@netbazzar.com'
    }}).then(async function(todo){

        if(todo==null || todo=='' || todo=='null')
        {
            
           
             connection.User.create({
                            'first_name': 'Admin',
                            'last_name': 'admin',
                            email: 'admin@netbazzar.com',
                            'address': 'netbazzar',
                            'landmark':'netbazzar',
                            'pincode':'netbazzar',
                            phone: '12345678952',
                            user_status_id:1,
                            user_type_id: '1'

                }).then(function (response) {
                   
                    var shasum = crypto.createHash('sha1');
                    shasum.update('12345678');
                    var password = shasum.digest('hex');
                    connection.UserAuth.create({
                        username:'admin',
                        password: password,
                        user_id:response.dataValues.id
                    }) 
                               
                }, function (data) {
                   // console.log(data)
                })
        }

    })




    console.log('db Sync done')
})
app.use('/', indexRouter);



export default app;
