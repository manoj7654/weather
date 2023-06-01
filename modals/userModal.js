// importing mongoose for creating schema and model
const mongoose=require("mongoose");

const userSchema=mongoose.Schema({
    name:String,
    age:Number,
    email:String,
    password:String
},{
    versionKey:false
})

const UserModal=mongoose.model("users",userSchema)


module.exports={UserModal}