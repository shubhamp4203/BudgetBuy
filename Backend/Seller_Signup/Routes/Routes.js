const {Router}=require("express");
const authController = require("../Controllers/Controllers");
const router=Router();

//Route handelling
router.post("/sellersignup",authController.seller_signup_post)
router.post("/sellerlogin",authController.seller_login_post)
router.post("/sellerlogout",authController.seller_logout_post)

module.exports=router