const {Router}=require("express");
const authController = require("../controllers/authcontrollers");
const router=Router();

router.post("/signup",authController.signup_post)
router.post("/login",authController.login_post)

// router.get("/logout",()=>{

// })
module.exports=router