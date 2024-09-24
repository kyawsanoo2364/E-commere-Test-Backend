const addToCartModel = require("../../model/addToCartModel");

const deleteCartProduct = async (req,res)=>{
    try {
        const {addToCartId} = req.body;
        const deleteProductCart =await addToCartModel.deleteOne({_id:addToCartId});
        res.json({message:"deleted!",data:deleteProductCart,success:true,error:false});
    } catch (error) {
        res.json({message:error.message || error,success:false,error:true})
    }
}

module.exports = deleteCartProduct