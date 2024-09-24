const { uploadPermission } = require("../../helper/permission")
const productModel = require("../../model/productModel")

const updateProductController =async (req,res)=>{
    try{
        const data = req.body;
        if(!uploadPermission(req.userId)){
            throw new Error("Update Product Permission Denied!")
        } 

        const updatedProduct = await productModel.findByIdAndUpdate(data._id,data);
        res.status(200).json({
            data:updatedProduct,
            message:"Successfully updated product!",
            error:false,
            success:true
        })

    } catch(err){
        res.status(400).json({
            message:err.message || err,
            error:true,
            success:false
        })
    }
}

module.exports = updateProductController