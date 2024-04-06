const { Router } = require("express");
const authController = require("../controllers/authControllers");
const router = Router();
const auth = require("../Middlewares/auth");

//Routes handelling
router.post("/signup", authController.signup_post);
router.post("/login", authController.login_post);
router.put("/update", auth, authController.updateUser_put);
router.post("/logout", authController.logout_post);
router.get("/auth/google/callback", authController.callback);
router.post("/forgotPassword", authController.forgotPassword_post);
router.get("/getCart", auth, authController.getCart);
router.post("/addCart", auth, authController.addcart);

module.exports = router;
