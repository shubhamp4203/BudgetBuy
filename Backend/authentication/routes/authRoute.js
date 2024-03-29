const {Router}=require("express");
const authController = require("../controllers/authControllers");
const router=Router();
const auth=require("../Middlewares/auth")

//Routes handelling
router.post("/signup",authController.signup_post)
router.post("/login",authController.login_post)
router.put("/update",auth,authController.updateUser_put)
router.post("/logout",authController.logout_post)

module.exports=router