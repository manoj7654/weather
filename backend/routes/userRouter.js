
 // importing express for making router
const express=require("express");
const userRouter=express.Router();

// importing usermodal 
const {UserModal}=require("../modals/userModal")

// bcrypt for hashing password
const bcrypt=require("bcrypt")

//jsonwebtoken for creating new token
const jwt=require("jsonwebtoken")

userRouter.get("/",(req,res)=>{
    console.log("hii")
    res.send("hello from users")
})

userRouter.post("/register",async(req,res)=>{
    const {name,age,email,password}=req.body;
    const user=await UserModal.find({email});
    if(user.length>=1){
        res.status(200).json("User already registered");
        return
    }
        try {
            bcrypt.hash(password,5,async(err,secure_password)=>{
             if(err){
                res.status(404).json("While hashing password something wrong")
             }else{
                const result=new UserModal({name,age,email,password:secure_password});
                await result.save();
                res.status(200).json("User Register Successfull")
             }
            })
            
        } catch (error) {
           res.status(404).json("Something went wrong")
        }
   
})

userRouter.post("/login",async(req,res)=>{
    const {email,password}=req.body;
    try {
        const user=await UserModal.find({email});
        if(user.length>0){
            bcrypt.compare(password,user[0].password,async(err,result)=>{
                if(result){
                    const token=jwt.sign({userID:user[0]._id},"masai");
                    res.status(200).json({"message":"Login successfull","token":token})
                }else{
                 res.status(404).json("Wrong credential")
                }
            })
        } else{
            res.status(404).json("something went wrong")
        }
    } catch (error) {
        
    }
})

module.exports={userRouter}