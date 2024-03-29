const {Router}=require("express");
const Controller = require("../Controllers/Controllers");
const router=Router();
const multer = require("multer");

const upload = multer({
    storage: multer.memoryStorage()
});

router.post('/insertproduct',upload.single('image'),Controller.insertProduct_post)

module.exports=router;