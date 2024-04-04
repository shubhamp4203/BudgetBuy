const fs = require("fs");
const dataConnect = require("../Connection/Connection");
const {ObjectId}=require("mongodb")
const axios = require("axios");
const multer = require('multer');
const { collection } = require("../../Seller_Signup/Models/Seller_Model");
const {v2: cloudinary} = require('cloudinary');
require('dotenv').config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
})

module.exports.insertProduct_post = async (req, res) => {
  if(!req.file){
    return res.status(400).json({message: "Image not uploaded"})
  } 
    console.log(req.file)
    const newProduct = req.body;
    const seller_id = req.body.seller_id;
    const skuid = req.body.skuid;
    const stock = req.body.stock;
    const collection = await dataConnect();
    try {
    const imageData = fs.readFileSync(req.file.path)
    const exist = await collection.findOne({ seller_id, skuid });
    if (!exist) {
      const result = await collection.insertOne({
        newProduct: newProduct,
        seller_id,
        skuid,
      });
      const image = await cloudinary.uploader.upload(req.file.path, {
        public_id: `product_images/${result.insertedId}`,
      });
      fs.unlinkSync(req.file.path);
      console.log(result);
      const invreq = {
        products: [{ seller_id, skuid, stock, product_id: result.insertedId }],
      };
      const resp = await axios.post(
        process.env.INVENTORY + "addStock/",
        invreq
      );
      if (resp.status == 201) {
        res
          .status(201)
          .json({ message: "Product inserted successfully", newProduct });
      } else {
        res.status(400).json({message: "Something went wrong"});
      }
    } else {
      res.status(400).json({ message: "SKU_ID is already in use" });
    }
  } catch (error) {
    console.log(error.message);
    const product = await collection.findOneAndDelete({seller_id, skuid});
    res.status(500).json({ error: "Failed to insert product" });
  }
};

module.exports.getProduct_post=async (req,res)=>{
  const product_id=req.body.products;
  const collection = await dataConnect();
  try {
    // console.log(product_id);
    const objectIds = product_id.map(id => new ObjectId(id.toString()));
    // console.log(objectIds);
    const query = { _id: { $in: objectIds } };
    const result = await collection.find(query).toArray();
    // console.log(result)
    res.status(200).json({message: "Products fetched successfully", result});
  }
}