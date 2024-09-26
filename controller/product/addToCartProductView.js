const addToCartModel = require("../../model/addToCartModel");


const addToCartProductView = async (req,res)=>{
    try{
        const userId = req.user_id;
        const allProduct =await addToCartModel.find({userId:userId}).populate("productId")
        res.json({message:"ok",success:true,error:false,data:allProduct})
    }catch(e){
        res.json({message:e.message || e,success:false,error:true})
    }
}

module.exports = addToCartProductView