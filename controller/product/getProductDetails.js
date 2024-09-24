const productModel = require("../../model/productModel");

const getProductDetails = async (req,res)=>{
    try{
        const {productId} = req.params;
        const product = await productModel.findById(productId);
        res.json({
            data:product,
            message:"OK",
            error:false,
            success:true
        })
    }catch(e){
        res.json({
            message:e.message ||  e,
            error:true,
            success:false
        })
    }
}

module.exports = getProductDetails