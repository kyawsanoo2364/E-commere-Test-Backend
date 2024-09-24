const addToCartModel = require("../../model/addToCartModel");

const addToCartProductCount = async (req,res)=>{
    try{
        const userId =req.userId;
        const count = await addToCartModel.countDocuments({userId:userId});
        res.status(200).json({message:"ok",data:{count:count},error:false,success:true});
    }catch(e){
        res.status(400).json({message:e.message || e,success:false,error:true})
    }
}

module.exports = addToCartProductCount