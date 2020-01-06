import Controller from "./Controller";
import jimp from "jimp";
import path from "path";
var fs = require("fs");
var Sequelize = require("sequelize");

class ProductController extends Controller {
  constructor() {
    super();
  }

  getProduct(req, res) {
    let Op = Sequelize.Op;
    super.db.Product.findAll({
      where: { status: { [Op.ne]: 2 } },
      include: [{ model: super.db.ProductCategory }]
    })
    .then(product => {
      res.json({ products: product, status: 200 });
    });
  }

  getProductByCategory(req, res) {
    let Op = Sequelize.Op;
    let cat_id = req.params.cat_id;
    super.db.Product.findAll({
      where: { status: { [Op.ne]: 2 }, category_id: cat_id },
      include: [{ model: super.db.ProductCategory }]
    })
    .then(product => {
      res.json({ products: product, status: 200 });
    });
  }

  async createProduct(req, res) {
    var filename = "";

    var ProductObj = super.db.Product;

    const imagePath = path.join(__dirname, "../../public/uploads/pimages");

    if (!req.file) {
      res.status(401).json({ error: "Please provide an image" });
    }
    var filename = Date.now() + "-" + req.file.originalname;

    jimp.read(req.file.path, function(err, lenna) {
      if (err) throw err;
      lenna
        .resize(200, 200) // resize
        .quality(60) // set JPEG quality
        .write(imagePath + "/" + filename); // save
      fs.unlink(req.file.path, function() {});
    });
    let input = JSON.parse(req.body.fields);
    input.image = filename;
    if (input.is_service == 0) {
      input.service_name = "";
      input.service_cost = 0;
    }
    let product = new ProductObj(input);
    product.save().then(
      product => {
        res.json({ status: 200, product: product });
      },
      err => {
        if (err) console.error(err);
        res.json({ status: 500, err: err });
      }
    );
  }
  async skuCount(req, res) {
    let Op = Sequelize.Op;
    let sku = req.query.sku;
    let id = req.query.id;
    let count = 0;
    if (typeof id != "undefined" && id != "")
      count = await super.db.Product.count({
        where: { sku: sku, id: { [Op.ne]: id } }
      });
    else count = await super.db.Product.count({ where: { sku: sku } });
    res.json({ status: 200, count: count });
  }

  async getProductById(req, res) {
    try {
      let id = req.params.id;
      if (id == "" || typeof id === undefined) {
        res.json({ status: 500, msg: "Invalid product" });
      }

      let product = await super.db.Product.findOne({ where: { id: id } });
      res.json({ status: 200, product: product.dataValues });
    } catch (err) {
      res.json({ status: 500, msg: err });
    }
  }

  async editProduct(req, res) {
    var filename = "";

    var ProductObj = super.db.Product;
    let input = JSON.parse(req.body.fields);

    //console.log(req.file)
    var ProductObj = super.db.Product;

    var filename = "";
    if (req.file && typeof req.file != "undefined") {
      const imagePath = path.join(__dirname, "../../public/uploads/pimages");
      const old_file_name = input.image;
      filename = Date.now() + "-" + req.file.originalname;
      input.image = filename;

      jimp.read(req.file.path, function(err, lenna) {
        if (err) throw err;
        lenna
          .resize(200, 200) // resize
          .quality(60) // set JPEG quality
          .write(imagePath + "/" + filename); // save
        fs.unlink(req.file.path, function() {});
        fs.unlink(imagePath + "/" + old_file_name, function() {});
      });
    }

    let id = input.id;
    delete input.id;
    if (input.is_service == 0) {
      input.service_name = "";
      input.service_cost = 0;
    }
    //console.log(input)
    let product = ProductObj.update(input, { where: { id: id } }).then(
      product => {
        res.json({ status: 200, product: product });
      },
      err => {
        console.error(err);
        res.json({ status: 500, err: err });
      }
    );
  }

  deleteProduct(req, res) {
    let id = req.params.id;
    super.db.Product.update({ status: 2 }, { where: { id: id } }).then(
      result => {
        res.json({ status: 200, msg: "Deleted" });
      },
      err => {
        console.error(err);
        res.json({ status: 500, err: err });
      }
    );
  }
}

export default ProductController;
