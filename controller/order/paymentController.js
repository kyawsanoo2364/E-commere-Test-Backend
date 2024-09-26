const stripe = require("../../config/stripe");
const userModel = require("../../model/userModel");


const paymentController = async(req,res)=>{
    try{
        
        const {cartItems} = req.body;
        const user = await userModel.findById(req.user_id);
        
        const params = {
            submit_type:"pay",
            mode:"payment",
            payment_method_types:['card'],
            billing_address_collection:"auto",
            shipping_options:[
                {
                    shipping_rate:"shr_1Q2UfcIZoWrFz7tBTPsr78gE"
                }
            ],
            customer_email:user.email,
            metadata:{
                userId:req.user_id
            },
            line_items:cartItems.map((item,index)=>{
                return {
                    price_data:{
                        currency:"mmk",
                        product_data:{
                            name:item.productId.productName,
                            images:item.productId.productImage,
                            metadata:{
                                productId:item.productId._id
                            }
                        },
                        unit_amount:item.productId.sellingPrice *100
                    },
                    adjustable_quantity:{
                        enabled:true,
                        minimum:1
                    },
                    quantity:item.quantity
                }
            }),
            success_url: `${process.env.FRONTEND_URL}/success`,
            cancel_url: `${process.env.FRONTEND_URL}/cancel`,
        }
        const session = await stripe.checkout.sessions.create(params);
        res.status(303).json(session);
    }catch(e){
        res.json({message:e.message || e, error:true,success:false})
    }
}

module.exports = paymentController;