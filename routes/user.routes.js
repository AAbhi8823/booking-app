const router = require("express").Router()
const user_controller=require("../controllers/user.controller.js")


//user routes
router.post("/register-user",user_controller.register_user)
router.get("/get-user/:userId",user_controller.get_user)
router.get("/get-all-user",user_controller.get_all_users)
//router.put("/update-user/:userId",user_controller.update_user)

module.exports=router