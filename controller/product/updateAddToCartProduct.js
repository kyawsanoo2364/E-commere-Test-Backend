const addToCartModel = require("../../model/addToCartModel");

const updateAddToCartProduct = async(req,res)=>{
    try{
        const currentUserId = req.userId;
        const {id,quantity} = req.body;
        const updateProduct = await addToCartModel.updateOne({_id:id},{quantity:quantity});
        res.json({message:"Updated!",success:true,error:false,data:updateProduct})
    }catch(e){
        res.json({
            message:e.message || e,
            success:false,
            error:true
        })
    }
}

module.exports = updateAddToCartProduct