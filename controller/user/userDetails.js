const userModel = require("../../model/userModel")

const userDetailsController = async (req,res)=>{
    try{
       const user = await userModel.findById(req.user_id);
       res.status(200).json({data:user,error:false,success:true,message:"User details"})
    }catch(e){
        res.status(400).json({
            message:e.message || e,
            error:true,
            success:false
        })
    }
}

module.exports = userDetailsController