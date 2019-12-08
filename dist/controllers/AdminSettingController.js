"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Controller = _interopRequireDefault(require("./Controller"));

var _sequelize = _interopRequireDefault(require("sequelize"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class CategoryController extends _Controller.default {
  getAllSettings(req, res) {
    super.db.AdminSetting.findOne({
      where: {
        id: 1
      }
    }).then(data => {
      res.send({
        settings: data.dataValues,
        status: 200
      });
    });
  }

  saveSettings(req, res) {
    let input = req.body;
    super.db.AdminSetting.update(input, {
      where: {
        id: 1
      }
    }).then(data => {
      res.send({
        settings: data.dataValues,
        status: 200
      });
    });
  }

 

}

exports.default = CategoryController;