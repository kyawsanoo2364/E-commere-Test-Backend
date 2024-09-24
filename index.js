const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db")
require("dotenv").config()
const router = require("./routes/index");
const cookieParser = require("cookie-parser");

const app = express();
app.use(cookieParser())
app.use(cors({
    origin:process.env.FRONTEND_URL,
    credentials:true,
   
}));
app.use(express.json())
app.use("/api",router);

app.get("/",(req,res)=>{
    res.send("Hello")
})

const PORT = process.env.PORT;

connectDB().then(()=>{ 
    app.listen(PORT,()=>{
        console.log("Connected to DB...")
        console.log(`Server is listening on port ${PORT}`)
    })
}).catch((err)=>{
    console.log(err)
})

