const userLogoutController = async (req,res)=>{
    try{
        res.clearCookie("token");

        res.json({
            message:"Logged out succefully!",
            error:false,
            success:true
        })
    }catch(e){
        res.json({
            message:e.message || e,
            error:true,
            success:false
        })
    }
}

module.exports = userLogoutController;