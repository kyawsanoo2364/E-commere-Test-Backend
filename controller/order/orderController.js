const orderModel = require("../../model/orderModel")

const orderController= async(req,res)=>{
    try{
        const order= await orderModel.find({userId:req.user_id}).sort({createdAt:-1});
        res.json({
            data:order,
            message:"Order List",
            error:false,
            success:true
        })
    } catch(err){
        res.status(500).json({message:err.mesage || err,error:true,success:true})
    }
}

module.exports = orderController