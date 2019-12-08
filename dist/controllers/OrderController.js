"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Controller = _interopRequireDefault(require("./Controller"));

var _sequelize = _interopRequireDefault(require("sequelize"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class OrderController extends _Controller.default {
  getAllOrder(req, res) {
    super.db.Order.findAll().then(data => {
      res.send({
        orders: data.dataValues,
        status: 200
      });
    });
  }

  getOrderDetails(req, res) {
    let id = req.params.id;
    super.db.Order.findAll({
      where: {
        id: id
      },
      include: [{
        model: super.db.OrderDetails,
        include: [{
          model: super.db.Product,
          include: [{
            model: super.db.ProductCategory
          }]
        }]
      }]
    }).then(data => {
      res.send({
        orders: data.dataValues,
        status: 200
      });
    });
  }

}

exports.default = OrderController;