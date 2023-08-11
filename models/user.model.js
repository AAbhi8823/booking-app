//user schema
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var userSchema = new Schema(
  {
    // userId:{
    //     type:String,
    //     required:true,
    //     default:()=>
    // }
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: false,
    },
    phone: {
      type: String,
      required: false,
    },
    user_type: {
      type: String,
      enum: ["admin", "user"],
      required: false,
      default: "user",
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      required: false,
      default: "active",
    },
    address: [
      {
        type: String,
        required: false,
      },
    ],

    profile_pic: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("User", userSchema);
