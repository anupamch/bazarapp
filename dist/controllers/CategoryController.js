"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Controller = _interopRequireDefault(require("./Controller"));

var _sequelize = _interopRequireDefault(require("sequelize"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class CategoryController extends _Controller.default {
  getAllCategory(req, res) {
    const Op = _sequelize.default.Op;
    super.db.ProductCategory.findAll({
      where: {
        status: {
          [Op.ne]: 2
        }
      }
    }).then(categories => {
      res.json({
        categories: categories,
        status: 200
      });
    });
  }

  getCategoryById(req, res) {
    let id = req.params.id;
    super.db.ProductCategory.findOne({
      where: {
        id: id
      }
    }).then(categories => {
      res.json({
        category: categories,
        status: 200
      });
    });
  }

  async createCategory(req, res) {
    let input = req.body;
    super.db.ProductCategory.create(input).then(category => {
      res.send({
        status: 200,
        category: category
      });
    }, err => {
      res.send({
        status: 500,
        err: err
      });
    });
  }

  deleteCtegory(req, res) {
    let id = req.params.id;
    let rstring = Math.random().toString(36).substring(7);
    super.db.ProductCategory.update({
      status: 2,
      name: rstring
    }, {
      where: {
        id: id
      }
    }).then(result => {
      res.send({
        status: 200,
        msg: "Deleted"
      });
    }, err => {
      res.send({
        status: 500,
        err: err
      });
    });
  }

  async categoryCount(req, res) {
    const Op = _sequelize.default.Op;
    let name = req.query.name;
    let id = req.query.id;
    let count = 0;
    if (typeof id != 'undefined' && id != '') count = await super.db.ProductCategory.count({
      where: {
        name: name,
        id: {
          [Op.ne]: id
        }
      }
    });else count = await super.db.ProductCategory.count({
      where: {
        name: name
      }
    });
    res.send({
      status: 200,
      count: count
    });
  }

  editCategory(req, res) {
    let input = req.body;
    super.db.ProductCategory.update(input, {
      where: {
        id: input.id
      }
    }).then(category => {
      res.send({
        status: 200,
        msg: "category updated."
      });
    }, err => {
      res.send({
        status: 500,
        err: err
      });
    });
  }

}

exports.default = CategoryController;