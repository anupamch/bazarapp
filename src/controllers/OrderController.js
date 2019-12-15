import Controller from './Controller'
import Sequelize from 'sequelize'
export default class OrderController extends Controller{

    getAllOrder(req,res){
        super.db.Order.findAll().then(data=>{
            res.send({orders:data.dataValues,status:200})
        })
    }

    getOrderDetails(req,res){
        let id = req.params.id
        super.db.Order.findAll({
                                where:{id:id},
                                include:[
                                          {
                                            model:super.db.OrderDetails,
                                            include:[{model:super.db.Product,
                                                      include:[{model:super.db.ProductCategory}]
                                                    }]
                                          },
                                         
                                        ]
                             })
                      .then(data=>{
                          res.send({orders:data.dataValues,status:200})
                      })
    }

    saveOrder(req,res){
        let order_input={
            user_id : req.body.user_id,
            item_number : req.body.item_number,
            total_cost : req.body.total_cost,
            delivery_charge : req.body.delivery_charge,
            delivery_date : req.body.delivery_date,
            delivery_slot_id : req.body.delivery_slot_id,
            address : req.body.address,
           
        }
        //console.log(req.params) 
        var orderdetails = JSON.parse(req.body.orderdetails)
        

        super.db.db.transaction(t=>{
            return super.db.Order.create(order_input,{transaction: t}).then(order=>{
               for(let i=0;i<orderdetails.length;i++){
                  orderdetails[i]['order_id']=order.id
               }
               return super.db.OrderDetails.bulkCreate(orderdetails,{transaction: t})
            })
       }).then(result=>{
           res.send({status:'200',result:result})
       }).catch(err=>{
           console.log(err)
       })
    }

    deleteOrder(req,res){
       let id = req.params.order_id
        
    }
}