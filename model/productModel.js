const mongoose = require("mongoose");

const productSchema =new mongoose.Schema({
    productName:String,
    brandName:String,
    productImage:Array,
    category:String,
    description:String,
    price:Number,
    sellingPrice:Number
},{
    timestamps:true
})

const productModel = mongoose.model("product",productSchema);

module.exports = productModel;