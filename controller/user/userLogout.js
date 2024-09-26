const userLogoutController = async (req,res)=>{
    try{
        const tokenOption = {
            secure:true,
            httpOnly:true,
            sameSite:"None"
        }
        res.clearCookie("token",tokenOption);

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