import Controller from "./Controller";
import jwt from "jsonwebtoken";
import crypto from "crypto";
var Sequelize = require("sequelize");
export default class UserController extends Controller {
  getUser(req, res) {
    db.User.findAll().then(users => {
      res.send({ users: users.dataValues, response: 200 });
    });
  }

  authenticate(req, res) {
    let shasum = crypto.createHash("sha1");
    shasum.update(req.body.password);
    let password = shasum.digest("hex");
    let username = req.body.username;

    super.db.UserAuth.findOne({
      where: { username: username, password: password },
      include: [{ model: super.db.User }]
    })
    .then(reponse => {
      // console.log(reponse)

      if (reponse) {
        let token = jwt.sign(
          { id: reponse.dataValues.id },
          "78947bhfn%sdfsdfAw@#234",
          {
            expiresIn: Math.floor(Date.now() / 1000) // expires in 24 hour
          }
        );
        res.send({ user: reponse.user.dataValues, token: token, auth: "1" });
      } else {
        res.send({ auth: "0", status: 200 });
      }
    });
  }

  async registration(req, res) {
    let fname = req.body.firstname;
    let lastname = req.body.lastname;
    let phone = req.body.phone;
    let password = req.body.password;
    let cpassword = req.body.cpassword;
    let email = req.body.email;
    let is_valid = true;
    let msg = "";
    if (fname.trim() == "") {
      is_valid = false;
      msg = "First Name is empty";
    }
    if (lastname == "") {
      is_valid = false;
      msg = "Last Name is empty";
    }
    if (phone == "") {
      is_valid = false;
      msg = "Phone number is empty";
    } else if (!/^[0-9]+$/.test(phone)) {
      is_valid = false;
      msg = "Mobile number should all digit";
    } else if (phone.trim().length != 10) {
      is_valid = false;
      msg = "Mobile number should 10 digit";
    }
    if (password == "") {
      is_valid = false;
      msg = "Password is empty";
    } else if (password != cpassword) {
      is_valid = false;
      msg = "Confirm password is not match";
    }
    if (email != "") {
      if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        is_valid = false;
        msg = "Invalid Email";
      }
    }

    let count = await super.db.UserAuth.count({ where: { username: phone } });
    if (count == 0) {
      if (is_valid) {
        let shasum = crypto.createHash("sha1");
        shasum.update(req.body.password);
        let hash_password = shasum.digest("hex");
        let input = {
          first_name: fname,
          last_name: lastname,
          phone: phone,
          email: email
        };

        super.db.db
          .transaction(t => {
            return super.db.User.create(input, { transaction: t }).then(
              user => {
                return super.db.UserAuth.create(
                  {
                    username: phone,
                    password: hash_password,
                    user_id: user.id
                  },
                  { transaction: t }
                );
              }
            );
          })
          .then(result => {
            res.send({ status: "200", result: result });
          })
          .catch(err => {
            res.status(500).send({ status: 500, msg: err });
          });
      } else {
        res.send({ status: 201, msg: msg });
      }
    } else {
      res.send({ status: 201, msg: "Phone number already registered." });
    }
  }
  changeAddress(req, res) {
    let street = req.body.addr_street;
    let landmark = req.body.addr_landmark;
    let area = req.body.addr_city;
    let pincode = req.body.addr_pincode;
    let user_id = req.body.user_id;
    let msg = "";
    let is_valid = true;
    if (street.trim() == "") {
      is_valid = false;
      msg = "Street is empty";
    }
    if (landmark.trim() == "") {
      is_valid = false;
      msg = "Landmark is empty";
    }
    if (area.trim() == "") {
      is_valid = false;
      msg = "Area is empty";
    }
    if (pincode.trim() == "") {
      is_valid = false;
      msg = "Pincode is empty";
    }
    if (user_id.trim() == "") {
      is_valid = false;
      msg = "User id empty";
    }
    if (!is_valid) {
      res.status(400).json({ status: 400, msg: msg });
    }

    let input = {
      address: street,
      landmark: landmark,
      city: area,
      pincode: pincode
    };

    super.db.User.update(input, { where: { id: user_id } })
      .then(data => {
        res.send({ status: 200, msg: "Address change successfully." });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ status: 500, msg: err });
      });
  }
}
