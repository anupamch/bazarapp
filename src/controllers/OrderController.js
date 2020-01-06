import Controller from "./Controller";
import jimp from "jimp";
import path from "path";
var fs = require("fs");
export default class OrderController extends Controller {
  getAllOrder(req, res) {
    super.db.Order.findAll({
      include: [
        {
          model: super.db.User
        }
      ],
      order: [["id", "DESC"]]
    }).then(data => {
      // console.log(data[0].dataValues)
      res.send({ orders: data, status: 200 });
    });
  }

  getOrderDetails(req, res) {
    let id = req.method == "POST" ? req.body.id : req.params.id;
    super.db.Order.findOne({
      where: { id: id },
      include: [
        {
          model: super.db.OrderDetails,
          include: [
            {
              model: super.db.Product,
              include: [{ model: super.db.ProductCategory }]
            }
          ]
        },
        {
          model: super.db.User
        },
        {
          model: super.db.DeliverySlot
        }
      ]
    }).then(data => {
      //console.log(data.dataValues)
      res.send({ order: data.dataValues, status: "200" });
    });
  }

  saveOrder(req, res) {
    let order_id = Math.floor(100000 + Math.random() * 900000);
    let order_input = {
      order_id: order_id,
      user_id: req.body.user_id,
      item_number: req.body.item_number,
      total_cost: req.body.total_cost,
      payable_cost: req.body.payable_cost,
      delivery_charge: req.body.delivery_charge,
      delivery_date: req.body.delivery_date,
      delivery_slot_id: req.body.delivery_slot_id,
      address: req.body.address
    };

    let orderdetails = JSON.parse(req.body.orderdetails);

    super.db.db
      .transaction(t => {
        return super.db.Order.create(order_input, { transaction: t }).then(
          order => {
            for (let i = 0; i < orderdetails.length; i++) {
              orderdetails[i]["order_id"] = order.id;
            }
            return super.db.OrderDetails.bulkCreate(orderdetails, {
              transaction: t
            });
          }
        );
      })
      .then(result => {
        res.send({ status: "200", result: result });
      })
      .catch(err => {
        res.status(500).send({ status: 500, msg: "Internal error" });
      });
  }

  deleteOrder(req, res) {
    let id = req.params.order_id;
  }

  changePaymentStatus(req, res) {
    const order_id = req.body.order_id;
    const payment_status = req.body.payment_status;
    // console.log(order_id,payment_status)
    let input = { payment_status: payment_status };
    super.db.Order.update(input, { where: { id: order_id } })
      .then(data => {
        super.db.OrderDetails.update(
          { delivery_status: payment_status },
          { where: { order_id: order_id } }
        ).then(data => {
          res.send({ status: 200, msg: "Payment status has changed" });
        });
      })
      .catch(err => {
        res.status(500).send({ status: 500, msg: "Internal error" });
      });
  }

  async changeDeliveryStatus(req, res) {
    let id = req.body.id;
    let order_id = req.body.order_id;
    let delivery_status = req.body.delivery_status === "false" ? false : true;
    let product_price = req.body.product_price;
    let total_price = req.body.total_price;
    let input = { delivery_status: delivery_status };

    super.db.db
      .transaction(t => {
        return super.db.OrderDetails.update(
          input,
          { where: { id: id } },
          { transaction: t }
        ).then(data => {
          let new_payment = 0;
          if (!delivery_status) {
            new_payment = parseFloat(total_price) - parseFloat(product_price);
          } else {
            new_payment = parseFloat(total_price) + parseFloat(product_price);
          }

          let order_input = { payable_cost: new_payment };
          return super.db.Order.update(
            order_input,
            { where: { id: order_id } },
            {
              transaction: t
            }
          );
        });
      })
      .then(result => {
        res.send({ status: "200", result: result });
      })
      .catch(err => {
        res.status(500).send({ status: 500, msg: "Internal error" });
      });
  }

  myOrders(req, res) {
    let user_id = req.body.user_id;
    super.db.Order.findAll({
      where: { user_id: user_id },
      order:[['id','DESC']],
      include: [
        {
          model: super.db.DeliverySlot
        }
      ]
    })
      .then(data => {
        //console.log(data);
        res.send({ status: "200", result: data });
      })
      .catch(err => {
        res.status(500).send({ status: 500, msg: "Internal error" });
      });
  }

  uploadBazarSlipImage(req, res) {
    const imagePath = path.join(__dirname, "../../public/uploads/bazar_slip");

    if (!req.file) {
      res.status(401).json({ error: "Please provide an image" });
    }
    let user_id = req.body.id;
    let blist = req.body.blist;
    let address = req.body.address;
    let ddate = req.body.ddate;
    let slot_id = req.body.slot_id;
    let parts = ddate.split("/");
    let mydate = new Date(parts[2], parseInt(parts[1]) - 1, parts[0]);
    let m = mydate.getMonth();
    let d = mydate.getDate();
    m = parseInt(m) + 1;
    if (parseInt(m) < 10) m = "0" + m;
    if (parseInt(d) < 10) d = "0" + d;
    let delivery_date = mydate.getFullYear() + "-" + m + "-" + d;
    let input = {
      user_id: user_id,
      address: address,
      delivery_date: delivery_date,
      slip_image: req.file.filename,
      delivery_slot_id: slot_id,
      slip_text: blist
    };

    super.db.BazarSlip.create(input)
      .then(result => {
        res.status(200).json({
          status: "200",
          filename: req.filename,
          msg: "File uploaded successfully"
        });
      })
      .catch(err => {
        res.status(500).send({ status: 500, msg: "Internal error" });
      });
  }

  getBazarSlip(req, res) {
    super.db.BazarSlip.findAll({
      include: [
        {
          model: super.db.User
        }
      ],
      order: [["id", "DESC"]]
    }).then(data => {
      res.send({ orders: data, status: 200 });
    });
  }

  getMyBazarSlipList(req, res) {
    let user_id = req.body.user_id
    super.db.BazarSlip.findAll({
      where:{user_id:user_id},
      include: [
        {
          model: super.db.DeliverySlot
        }
      ],
      order: [["id", "DESC"]]
    }).then(data => {
      res.send({ orders: data, status: 200 });
    });
  }

  getBazarSlipDetails(req, res) {
    let id = req.method == "POST" ? req.body.id : req.params.id;
    super.db.BazarSlip.findOne({
      where: { id: id },
      include: [
        {
          model: super.db.User
        },
        {
          model: super.db.DeliverySlot
        }
      ]
    }).then(data => {
      res.send({ order: data.dataValues, status: "200" });
    });
  }
  updateBarazSlipDetails(req,res){
   
     let id=req.body.id
     let input = req.body
    
    
     super.db.BazarSlip.update(input,{where:{id:id}})
                    .then(result=>{
                         res.send({status:200,msg:'Update successfull'})
                    }).catch(err=>{
                          console.log(err)
                    }) 
  }


}
