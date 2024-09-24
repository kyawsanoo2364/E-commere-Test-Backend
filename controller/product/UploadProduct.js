const { uploadPermission } = require("../../helper/permission");
const productModel = require("../../model/productModel")

const UploadProuductController = async(req,res)=>{
    try{
        if(!uploadPermission(req.userId)){
            throw new Error("Permission Denied!")
        }
        const uploadProduct = new productModel(req.body);
        const saveProduct = await uploadProduct.save()

        res.json({message:"Successfully! uploaded product",success:true,error:false,data:saveProduct})
    } catch(e){
        res.status(400).json({
            message:e.message || e,
            error:true,
            success:false
        })
    }
}

module.exports = UploadProuductController