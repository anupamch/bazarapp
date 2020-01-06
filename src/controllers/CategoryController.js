import Controller from "./Controller";
import Sequelize from "sequelize";
import path from "path";
import jimp from "jimp";
var fs = require("fs");
export default class CategoryController extends Controller {
  getAllCategory(req, res) {
    const Op = Sequelize.Op;
    super.db.ProductCategory.findAll({
      where: {
        status: {
          [Op.ne]: 2
        }
      }
    }).then(categories => {
      res.json({ categories: categories, status: 200 });
    });
  }
  getCategoryById(req, res) {
    let id = req.params.id;
    super.db.ProductCategory.findOne({
      where: {
        id: id
      }
    }).then(categories => {
      res.json({ category: categories, status: 200 });
    });
  }

  async createCategory(req, res) {
    let input = JSON.parse(req.body.fields);
    const imagePath = path.join(
      __dirname,
      "../../public/uploads/category_image"
    );

    if (!req.file) {
      res.status(401).json({ error: "Please provide an image" });
    }

    super.db.ProductCategory.create(input).then(
      category => {
        let filename = category.id + ".jpg";

        jimp.read(req.file.path, function(err, lenna) {
          if (err) throw err;
          lenna
            .resize(200, 200) // resize
            .quality(60) // set JPEG quality
            .write(imagePath + "/" + filename); // save
          fs.unlink(req.file.path, function() {});
        });

        res.send({ status: 200, category: category });
      },
      err => {
        res.send({ status: 500, err: err });
      }
    );
  }

  deleteCtegory(req, res) {
    let id = req.params.id;
    let rstring = Math.random()
      .toString(36)
      .substring(7);
    super.db.ProductCategory.update(
      { status: 2, name: rstring },
      { where: { id: id } }
    ).then(
      result => {
        res.send({ status: 200, msg: "Deleted" });
      },
      err => {
        res.send({ status: 500, err: err });
      }
    );
  }

  async categoryCount(req, res) {
    const Op = Sequelize.Op;
    let name = req.query.name;
    let id = req.query.id;
    let count = 0;
    if (typeof id != "undefined" && id != "")
      count = await super.db.ProductCategory.count({
        where: { name: name, id: { [Op.ne]: id } }
      });
    else
      count = await super.db.ProductCategory.count({ where: { name: name } });
    res.send({ status: 200, count: count });
  }

  editCategory(req, res) {
    let input = JSON.parse(req.body.fields);
    const imagePath = path.join(
      __dirname,
      "../../public/uploads/category_image"
    );
    let filename = input.id + ".jpg";

    jimp.read(req.file.path, function(err, lenna) {
      if (err) throw err;
      lenna
        .resize(200, 200) // resize
        .quality(60) // set JPEG quality
        .write(imagePath + "/" + filename); // save
      fs.unlink(req.file.path, function() {});
    });
    super.db.ProductCategory.update(input, { where: { id: input.id } }).then(
      category => {
        res.send({ status: 200, msg: "category updated." });
      },
      err => {
        res.send({ status: 500, err: err });
      }
    );
  }
}
