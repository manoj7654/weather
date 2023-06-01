// for emporting express
const express=require("express");
const weatherRouter=express.Router();

const {saveModal}=require("../modals/saveModal")
// import fetch for fetching data
const fetch=require("isomorphic-fetch");
const { authenticate } = require("../middleware/authenticate");
const api_key="1b62416bd4ac9173b397de5b3ec88f83"

weatherRouter.get("/location",async(req,res)=>{
    try {
        // console.log(req.query.q)
        const query=req.query.q;
        const result=await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${query}&appid=93df0cceea69c13b5dd8789c9c662c61`);
        const loc = await result.json();
        // console.log(loc)
        
        res.send(loc);
   
    } catch (error) {
        res.status(500).json({ error: 'An error occurred' });

    }
})

weatherRouter.post("/save",authenticate,async(req,res)=>{
    const {location,temp,userID}=req.body
    try {
        const result=new saveModal({location,temp,userID});
        await result.save();
        res.status(200).json("History has been saved")
    } catch (error) {
        res.status(404).json("Getting error while saving history")
    }
})
module.exports={weatherRouter}