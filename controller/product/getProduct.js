const productModel = require("../../model/productModel")

const getProductController = async (req,res)=>{
    try{
        const allProduct = await productModel.find().sort({createdAt:-1})
        res.status(200).json({
            message:"Get All Product",
            error:false,
            success:true,
            data:allProduct
        })
    }catch(e){
        res.status(400).json({message:e.message || e,error:true,success:false});
    }
}

module.exports = getProductController;