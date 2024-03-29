const {Router}=require("express");
const authController = require("../controllers/authControllers");
const router=Router();

//Routes handelling
router.post("/signup",authController.signup_post)
router.post("/login",authController.login_post)
router.put("/update",authController.updateUser_put)
router.post("/logout",authController.logout_post)

module.exports=router