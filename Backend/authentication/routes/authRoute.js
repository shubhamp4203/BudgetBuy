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
router.post("/forgotpassword", authController.forgotPassword);
router.post("/resetpassword", authController.resetPassword);
router.get("/getCart", auth, authController.getCart);
router.post("/addCart", auth, authController.addcart);
router.post("/addaddress", auth, authController.insertAddress);
router.post("/addcard", auth, authController.insertCard);
router.get("/getuser", auth, authController.getUser);
router.post("/getUserOrder", auth, authController.getUserOrder);
router.post("/wishlist", auth, authController.wishlist_post);
router.post("/removeWishlist", auth, authController.removeWishlist_post);
router.post("/chat", auth, authController.chat_post);
router.get("/chatgroup", auth, authController.chatgroup_get);
router
  .route("/authenticate")
  .get(auth, authController.authenticate)
  .post(auth, authController.authenticate);

module.exports = router;
