const express = require("express");
const userSignupController = require("../controller/user/userSignup");
const userSigninController = require("../controller/user/userSignin");
const userDetailsController = require("../controller/user/userDetails");
const authToken = require("../middleware/authToken");
const userLogoutController = require("../controller/user/userLogout");
const allUser = require("../controller/user/allUser");
const updateUserController = require("../controller/user/updateUser");
const UploadProuductController = require("../controller/product/UploadProduct");
const getProductController = require("../controller/product/getProduct");
const updateProductController = require("../controller/product/updateProduct");
const getCategoryProduct = require("../controller/product/getCategoryProduct");
const getCategoryWiseProduct = require("../controller/product/getCategoryWiseProduct");
const getProductDetails = require("../controller/product/getProductDetails");
const addToCartController = require("../controller/product/addToCartController");
const addToCartProductCount = require("../controller/product/addToCartProductCount");
const addToCartProductView = require("../controller/product/addToCartProductView");
const updateAddToCartProduct = require("../controller/product/updateAddToCartProduct");
const deleteCartProduct = require("../controller/product/deleteCartProduct");
const searchProduct = require("../controller/product/searchProduct");
const filterProduct = require("../controller/product/filterProduct");

const router = express.Router();


router.get("/",(req,res)=>{
    res.send("Hello Welcome")
})
router.post("/signup",userSignupController)
router.post("/signin",userSigninController)
router.get("/user-details",authToken,userDetailsController)
router.get("/logout",authToken,userLogoutController)
//admin
router.get("/all-user",authToken,allUser)
router.post("/update-user",authToken,updateUserController);
//upload product
router.post("/upload-product",authToken,UploadProuductController)
router.get("/get-product",getProductController)
router.post("/update-product",authToken,updateProductController)

router.get("/get-categoryProduct",getCategoryProduct);
router.post("/category-products",getCategoryWiseProduct);
router.get("/product/:productId",getProductDetails);
router.post("/addToCart",authToken,addToCartController);
router.get("/addToCart-count",authToken,addToCartProductCount);
router.get("/product-cart-view",authToken,addToCartProductView)
router.post("/update-productCart",authToken,updateAddToCartProduct);
router.post("/delete-cart-product",authToken,deleteCartProduct);
router.get("/search",searchProduct)
router.post("/filter-product",filterProduct)

module.exports  =router;