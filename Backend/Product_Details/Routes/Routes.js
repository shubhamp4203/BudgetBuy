const {Router}=require("express");
const Controller = require("../Controllers/Controllers");
const router=Router();
const multer = require("multer");

const upload = multer({dest: 'uploads/'});

router.post('/insertproduct',upload.single('image'),Controller.insertProduct_post);
router.post('/getproduct',Controller.getProduct_post);
router.get('/getAll',Controller.allproducts_get);
router.post('/wishlist',Controller.wishlist_post);
router.post('/removeWishlist',Controller.removeWishlist_post);

module.exports=router;