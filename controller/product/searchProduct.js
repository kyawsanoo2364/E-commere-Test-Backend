const productModel = require("../../model/productModel");

const searchProduct = async (req,res)=>{
    try{
        const query = req.query.q;
        const regex = new RegExp(query,"i","g");
        
        const product = await productModel.find({
            "$or":[
                {productName:regex},
                {category:regex}
            ]
        })
        res.json({message:"Search Product List",success:true,error:false,data:product})
    }catch(e){
        res.json({message:e.message || e,success:false,error:true})
    }
}

module.exports = searchProduct;