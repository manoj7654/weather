const mongoose=require("mongoose");

const saveSchema=mongoose.Schema({
    location:String,
    temp:Number,
    humidity:String,
    speed:String,
    userID:String
},{
    versionKey:false
})


const saveModal=mongoose.model("save",saveSchema);

module.exports={saveModal}