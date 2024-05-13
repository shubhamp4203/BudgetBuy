const { Router } = require("express");
const auth = require("../Middlewares/auth");
const authController = require("../Controllers/Controllers");
const router = Router();
const multer = require("multer");

const upload = multer();

//Route handelling
router.get("/chatgroup", auth, authController.chatgroup_get);
router.post("/sellersignup",authController.seller_signup_post)
router.post("/sellerlogin",authController.seller_login_post)
router.post("/sellerlogout",authController.seller_logout_post)
router.put("/sellerupdate",auth,authController.updateSeller_put)
router.post("/forgotpassword", authController.forgotPassword)
router.post("/resetpassword", authController.resetPassword)
router.post("/addproduct", auth, upload.single('image'), authController.addProduct);
router.post("/getSellerData", authController.getSellerData)
router.post("/getSellerProduct", auth, authController.getSellerProduct)
router.get("/authenticate", auth, authController.authenticate)
router.post("/getSellerOrder", auth, authController.getSellerOrder)
router.post("/advertise", auth, authController.advertise)
router.post("/getDashboard", authController.getDashboard)
router.post("/updateDashboard", authController.updateDashboard)


module.exports=router

module.exports = router;
