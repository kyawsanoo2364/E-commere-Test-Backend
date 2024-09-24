const productModel = require("../../model/productModel");

const filterProduct = async (req,res)=>{
    try{
        const {category} = req.body;
        const product = await productModel.find({category:{"$in":category}});
        res.json({message:"Category Lists",data:product,success:true,error:false})
    } catch(err){
        res.json({message:err.message || err,error:true,success:false})
    }
}

module.exports = filterProduct