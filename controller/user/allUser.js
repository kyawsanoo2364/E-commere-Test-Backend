const userModel = require("../../model/userModel")

const allUser = async(req,res)=>{
    try{
        const allUser = await userModel.find()
        res.json({
            message:"All user",
            success:true,
            error:false,
            data:allUser
        })
    }catch(e){
        res.json({message:e.message || e,error:true,success:false})
    }
}

module.exports = allUser