const productModel = require("../../model/productModel");

const getCategoryWiseProduct = async (req,res)=>{
    try{
        const {category} = req?.body || req?.query;
        const products = await productModel.find({category:category})
        res.json({
            data:products,
            error:false,
            success:true
        })
    }catch(e){
        res.status(400).json({message:e.message || e,error:true,success:false});
    }
}

module.exports = getCategoryWiseProduct