const productModel = require("../../model/productModel")

const getCategoryProduct = async (req,res)=>{
    try{
        const categories = await productModel.distinct("category");
        const categoryProducts = [];
        if(categories){
            for(const category of categories){
                const categoryProduct = await productModel.findOne({category:category});
                categoryProducts.push(categoryProduct);
            }

            res.status(200).json({
                message:"Get Category Product Successfully...",
                error:false,
                success:true,
                data:categoryProducts
            })
        }
    } catch(e){
        res.status(400).json({
            message:e.message ||  e,
            error:true,
            success:false
        })
    }
}

module.exports = getCategoryProduct