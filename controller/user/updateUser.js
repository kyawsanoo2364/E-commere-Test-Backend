const userModel = require("../../model/userModel")

const updateUserController = async (req,res)=>{
    try{
        const {userId,role,email,name}=req.body
        const payload = {
            ...(email && {email:email}),
            ...(name && {name:name}),
            ...(role && {role:role})
        } 

        const updatedUser = await userModel.findByIdAndUpdate(userId,payload);
        res.json({message:"Updated User successfully!",success:true,error:false,data:updatedUser})
    }catch(e){
        res.json({
            message:e.message || e,
            succes:false,
            error:true,
            data:[]
        })

    }
}

module.exports = updateUserController