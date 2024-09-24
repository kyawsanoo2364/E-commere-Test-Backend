const userModel = require("../../model/userModel");
const bcrypt = require("bcrypt")

const ErrorHandle = (object=[])=>{
    object.map((o)=>{
        if(!o){
            throw new Error(`Please provide ${object}.`);
        }
    })
   
}

const userSignupController = async (req,res)=>{
    try{
        const {name,email,password} = req.body;
        if(!name) throw new Error("Please provide name");
        if(!email) throw new Error("Please provide email");
        if(!password) throw new Error("Please provide password")

        const user = await userModel.findOne({email:email});

        if(user){
            throw new Error("Already user exist.")
           
        }

        const hashPassword = await bcrypt.hashSync(password,10);

        if(!hashPassword) {
            throw new Error("Something went wrong!");
        }

        const payload = {...req.body,role:"GENERAL",password:hashPassword};

        const userData = new userModel(payload);
        const saveUser = await userData.save();

        res.status(201).json({data:saveUser,message:"User has created scussfully!",error:false,success:true});

    } catch(e){
        res.json({message:e.message || e,error:true,success:false})
    }
}

module.exports = userSignupController;