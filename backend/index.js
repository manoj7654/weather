
const cors=require("cors")
// importing express for making server
const express=require("express");
const app=express();

// connection importing 
const {connection}=require("./config/db");

// routes 
const {userRouter}=require("./routes/userRouter")
const {weatherRouter}=require("./routes/weather")

// dotenv for catching port no 
require("dotenv").config()


// middleware
app.use(express.json());

app.use(cors())

app.get("/",(req,res)=>{
    res.send("Heloo")
})
app.use("/users",userRouter)

app.use("/weathers",weatherRouter)

app.listen(process.env.port,async()=>{
    try {
        await connection;
        console.log("Connected to DB")
    } catch (error) {
        console.log("Something went wrong")
    }
    console.log(`Server is running on ${process.env.port}`)
})