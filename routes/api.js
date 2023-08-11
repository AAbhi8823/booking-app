const express=require("express")
const app =express()
//const mongoose=require("mongoose")
const userRoute=require("./user.routes.js")

app.use("/user",userRoute)

module.exports=app