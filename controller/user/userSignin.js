const userModel = require("../../model/userModel");
const bcrypt = require("bcrypt");
const jwt =require("jsonwebtoken")

const userSigninController =async (req,res)=>{
    try{
        const {email,password} = req.body;
       
        if(!email){
            throw new Error("Invalid email!")
        }
        if(!password){
            throw new Error("Invalid password")
        }

        const user = await userModel.findOne({email:email});
        if(!user){
            throw new Error("User not found. Please sign up first!")
        }
        const checkPassword = await bcrypt.compareSync(password,user.password);

        if(checkPassword){
            const token = await jwt.sign({
                _id:user._id,
                email:user.email
            },process.env.TOKEN_SECRET,{expiresIn:"8h"});

            const tokenOption = {
                secure:true,
                httpOnly:true
            }

            res.cookie("token",token,tokenOption).json({
                message:"Login successfully",
                success:true,
                errro:false,
                data:token
            })

        } else {
            throw new Error("Please check your password")
        }

    } catch(e){
        res.json({
            error:true,
            success:false,
            message:e.message || e
        })
    }
}

module.exports = userSigninController