const mongoose =require("mongoose");

async function connectToDB(){
    try{
        await mongoose.connect(process.env.MONGODB_URI)
        
    } catch(err){
        console.log(err)
        return;
    }
}

module.exports = connectToDB