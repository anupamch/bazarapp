"use strict";
var crypto = require('crypto');
var mongoose = require('mongoose');
const models=require('./models');

var connection={};
mongoose.connect('mongodb://localhost:27017/netbazzar', { useNewUrlParser: true });
connection.dbConnection=mongoose.connection

connection.dbConnection.once('open', function () {

    console.log("DB Connected");
    connection.User= models['user'](mongoose);
    connection.UserAuth = models['user_auth'](mongoose);
    connection.ProductCategory  = models['product_category'](mongoose);
    connection.Product  = models['product'](mongoose);
    connection.Order  = models['order'](mongoose);
    connection.OrderDetails  = models['order_details'](mongoose);
    connection.Offer  = models['offer'](mongoose);
    
    /// Check and create all collection ///
    getCollectionList(connection);
    
    

    connection.UserAuth.countDocuments({'username':'admin@admin.com'}, function(err, count){
        if(err) throw err;
        console.log( "Number of users:", count );
        //readCSV()
        if(count==0){
            var shasum = crypto.createHash('sha1');
            shasum.update('12345678');
            var password = shasum.digest('hex');
            new connection.User({firstName: "Admin",lastName: "admin"})
                          .save(function (err, results) {
                            if(err) throw err;
                          
                            new connection.UserAuth({username:'admin@admin.com',password:password,user:results._id})
                                          .save(function(err, results){
                                               if(err) throw err;
                                                console.log("Admin Created");
                                            });
                })

        }
    })
    
                       
}); 

async function getCollectionList(connection){
   let list=await connection.dbConnection.db.listCollections().toArray()
   let keys=Object.keys(connection);
   
   
   for(let key of keys){
  
       let found=false;
       let cname=connection[key].collection.collectionName;
       if(cname!=null){
            for(let v of list)
            {
                // console.log(connection[key].collection.collectionName)
                if(cname==v.name){
                    found=true;
                    break;
                }
                
            }
            if(!found ){
                
                connection.dbConnection.db.createCollection(cname,function(err){
                    console.log(err)
                })
            }
    }
   }
}

var readCSV=function(){
    var fs = require('fs'); 
    var parse = require('csv-parse');
    
    var csvData=[];
    fs.createReadStream('public/plist.csv')
        .pipe(parse({delimiter: ':'}))
        .on('data', function(csvrow) {
            console.log(csvrow);
            //do something with csvrow
            csvData.push(csvrow);        
        })
        .on('end',function() {
          //do something wiht csvData
          console.log(csvData);
        });
}
export default connection;