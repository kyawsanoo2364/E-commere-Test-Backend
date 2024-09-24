const userModel = require("../model/userModel");

const uploadPermission = async (userID)=>{
    const user = await userModel.findById(userID);
    if(user?.role !== "ADMIN"){
        return false;
    }

    return true;
}

module.exports = {uploadPermission}