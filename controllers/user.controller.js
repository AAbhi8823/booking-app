const user_model = require("../models/user.model.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const { validationResult } = require("express-validator");

//register user
exports.register_user = [
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ status: false, message: errors.array() });
      }
      //validate email format by regex
      const email_regex = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
      if (!email_regex.test(req.body.email)) {
        return res
          .status(400)
          .json({ status: false, message: "Invalid Email Format" });
      }

      const {
        name,
        email,
        password,
        user_type,
        status,
        address,
        phone,
        profile_pic,
      } = req.body;
      const user = await user_model.findOne({ email: email });
      if (user) {
        return res
          .status(400)
          .json({ status: false, message: "Email Already Exist" });
      }
      const hash_password = await bcrypt.hash(password, 10);
      const new_user = new user_model({
        name: name,
        email: email,
        password: hash_password,
        user_type: user_type,
        status: status,
        address: address,
        phone: phone,
        profile_pic: profile_pic,
      });
      let user_created = await new_user.save();
      return res
        .status(200)
        .json({
          status: true,
          message: "User Register Successfully",
          data: user_created,
        });
    } catch (err) {
      return res
        .status(500)
        .json({
          status: false,
          message: "User regitration failed!ssamjha",
          err: err.message,
        });
    }
  },
];

//get user by id
exports.get_user = [
  async (req, res) => {
    try {
      const user = await user_model.findById(req.params.userId);
      if (!user) {
        return res
          .status(400)
          .json({ status: false, message: "User Not Found" });
      }
      return res
        .status(200)
        .json({ status: true, message: "User Found", data: user });
    } catch (err) {
      return res.status(500).json({ status: false, message: err.message });
    }
  },
];

//get all users
exports.get_all_users = [
  async (req, res) => {
    try {
      const users = await user_model.find();
      if (!users) {
        return res
          .status(400)
          .json({ status: false, message: "Users Not Found" });
      }
      return res
        .status(200)
        .json({ status: true, message: "Users Found", data: users });
    } catch (err) {
      return res
        .status(500)
        .json({
          status: false,
          message: "Fetch all users failed",
          err: err.message,
        });
    }
  },
];
