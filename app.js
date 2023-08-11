const express=require("express")
const app =express()
const mongoose=require("mongoose")
const cors=require("cors")
//const route=require("./routes/user.routes.js")
const route=require("./routes/api.js")

const bodyParser=require("body-parser")
const dotenv=require("dotenv")
dotenv.config()

const cpu=require("os-utils")
console.log(cpu.cpuCount())


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

mongoose.connect(process.env.MONGODB_URL,{
    useNewUrlParser:false,
    useUnifiedTopology:false
}).then(()=>{
    console.log("MongoDB is Connected!")
}).catch((err)=>{
    console.log(err)
})

app.use(cors())

app.use("/api/",route)
app.all("*",(req,res)=>{
    res.status(404).json({status:false,message:"API Not Found"})
})
app.listen(process.env.PORT||3000,()=>{
    console.log(`Server is Runnning On on Port ${process.env.PORT||3000}`)
})