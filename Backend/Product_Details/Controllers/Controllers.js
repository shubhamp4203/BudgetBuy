const fs = require("fs");
const dataConnect = require("../Connection/Connection");
const {ObjectId}=require("mongodb")
const axios = require("axios");
const multer = require('multer');

const {v2: cloudinary} = require('cloudinary');
require("dotenv").config({path: '../.env'});

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
        process.env.INVENTORY + "/addStock/",
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
    const objectIds = product_id.map(id => new ObjectId(id.toString()));
    const query = { _id: { $in: objectIds } };
    const result = await collection.find(query).toArray();
    res.status(200).json({message: "Products fetched successfully", result});
  } catch(err) {
    res.status(400).json({error: "Failed to fetch products"});
  } 
}
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
}

module.exports.allproducts_get = async (req,res) => {
  const collection = await dataConnect();
  try {
    const result = await collection.find().toArray();
    shuffleArray(result);
    res.status(200).json({message: "All products fetched successfully", result});
  } catch(err) {
    res.status(500).json({error: "Failed to fetch products"});
  }
}

// module.exports.getlike = async (req,res) => {
//   const collection = await dataConnect();
//   const product_id = req.query.product_id;
//   try {
//     const result = await collection.findOne({ _id: ObjectId(product_id) });
//     res.status(200).json({message: "Product fetched successfully", result: result.newProduct.likes});
//   } catch(err) {
//     res.status(400).json({error: "Failed to fetch product"}); 
//   }
// }

module.exports.wishlist_post = async (req,res) => {
  const collection = await dataConnect();
  const {user_id,product_id} = req.body;
  try {
    const result = await collection.findOne({ _id: ObjectId(product_id) });
    if(result){
      const updateResult = await collection.updateOne(
        { _id: ObjectId(product_id) },
        { $push: { wishlist: ObjectId(user_id) } }
      );
      if(updateResult.modifiedCount > 0){
        res.status(200).json({ message: "User added to product's wishlist" });
      } else {
        res.status(500).json({ message: "Failed to add user to product's wishlist" });
      }
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch(err){
    console.log(err);
    res.status(500).json({ message: "An error occurred" });
  }}

  module.exports.removeWishlist_post = async (req, res) => {
    const collection = await dataConnect();
    const { user_id, product_id } = req.body;
    try {
      const result = await collection.findOne({ _id: ObjectId(product_id) });
      if (result) {
        const updateResult = await collection.updateOne(
          { _id: ObjectId(product_id) },
          { $pull: { wishlist: ObjectId(user_id) } }
        );
        if (updateResult.modifiedCount > 0) {
          res.status(200).json({ message: "User removed from product's wishlist" });
        } else {
          res.status(500).json({ message: "Failed to remove user from product's wishlist" });
        }
      } else {
        res.status(404).json({ message: "Product not found" });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "An error occurred" });
    }
  };