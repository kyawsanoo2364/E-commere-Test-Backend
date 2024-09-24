const jwt =require("jsonwebtoken")

const authToken = async (req,res,next)=>{
    try{
        const token = req.cookies?.token;
        if(!token){
            return res.status(200).json({
                message:"Please login!",
                error:true,
                success:false
            })
        }
        jwt.verify(token,process.env.TOKEN_SECRET,(err,decoded)=>{
         
            req.user_id = decoded?._id;
            next()
        })
    }catch(e){
        res.status(400).json({
            message:e.message || e,
            success:false,
            error:true
        })
    }
}

module.exports = authToken