const jwt=require("jsonwebtoken");
require("dotenv").config();

const authenticate=(req,res,next)=>{
    const token=req.headers.authorization
  try {
    
    if(token){
        const decode=jwt.verify(token,"masai");
        const userId=decode.userId
        if(decode){
          req.body.userId=userId
            next()
        }else{
            res.josn("Please login")
        }
    }else{
        res.status(404).json("Getting error while fetching token")
    }
       
  } catch (error) {
    res.status(404).json("Something went wrong")
  } 
    
}


module.exports={authenticate}