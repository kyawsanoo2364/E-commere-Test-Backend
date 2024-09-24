const addToCartModel = require("../../model/addToCartModel");

const addToCartController = async(req,res)=>{
    try{
        const {productId} = req.body;
        const isAvalibleCart = await addToCartModel.findOne({productId:productId});
        if(isAvalibleCart){
            return res.json({message:"Already exist product cart",error:true,success:false});
        }
        const payload = {
            productId:productId,
            userId:req?.userId,
            quantity:1
        }

        const newProductCart = new addToCartModel(payload);
        const saveProductCart = await newProductCart.save();

        res.json({
            message:"Product added in cart",
            error:false,
            success:true,
            data:saveProductCart
        })
    }catch(e){
        res.json({message:e.message || err,error:true,success:false})
    }
}

module.exports = addToCartController