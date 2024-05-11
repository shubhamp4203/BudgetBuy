const fs = require("fs");
const dataConnect = require("../Connection/Connection");
const { ObjectId } = require("mongodb");
const axios = require("axios");
const multer = require("multer");
const { v2: cloudinary } = require("cloudinary");

require("dotenv").config({ path: "../.env" });

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

module.exports.insertProduct_post = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "Image not uploaded" });
  }
  const newProduct = req.body;
  const seller_id = req.body.seller_id;
  const skuid = req.body.skuId;
  const stock = req.body.stock;
  newProduct.likes = 0;
  newProduct.likeUsers = [];
  const collection = await dataConnect();
  try {
    const exist = await collection.findOne({
      "newProduct.skuId": skuid,
      "newProduct.seller_id": seller_id,
    });
    if (!exist) {
      const result = await collection.insertOne({
        newProduct: newProduct,
      });
      const image = await cloudinary.uploader.upload(req.file.path, {
        public_id: `product_images/${result.insertedId}`,
      });
      fs.unlinkSync(req.file.path);
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
        res.status(400).json({ message: "Something went wrong" });
      }
    } else {
      res.status(401).json({ message: "SKU_ID is already in use" });
    }
  } catch (error) {
    console.log(error);
    const product = await collection.findOneAndDelete({
      "newProduct.skuId": skuid,
      "newProduct.seller_id": seller_id,
    });
    if (!res.headersSent) {
      res.status(500).json({ message: "Internal server error" });
    }
  }
};

module.exports.getProduct_post = async (req, res) => {
  const product_id = req.body.products;
  const collection = await dataConnect();
  try {
    console.log("start");
    const objectIds = product_id.map((id) => new ObjectId(id.toString()));
    console.log("objectIds", objectIds);
    if (req.body.type == "productDetail") {
      console.log("inside");
      const result = await collection
        .aggregate([
          { $match: { _id: { $in: objectIds } } },
          {
            $lookup: {
              from: process.env.PRODUCT_COLLECTION,
              localField: "newProduct.seller_id",
              foreignField: "newProduct.seller_id",
              as: "sellerData",
            },
          },
          {
            $lookup: {
              from: process.env.PRODUCT_COLLECTION,
              localField: "newProduct.tags",
              foreignField: "newProduct.tags",
              as: "tagData",
            },
          },
        ])
        .toArray();
      console.log(result);
      const seller_id = result[0].newProduct.seller_id;
      const sellerinfo = await axios.post(
        process.env.SELLER + "/getSellerData/",
        { seller_id }
      );
      console.log(sellerinfo.status);
      if (sellerinfo.status == 200) {
        console.log(sellerinfo.data);
        const finalResult = {
          result: result[0],
          sellerinfo: sellerinfo.data,
        };
        res
          .status(200)
          .json({ message: "Products fetched successfully", finalResult });
      }
    } else {
      const query = { _id: { $in: objectIds } };
      const result = await collection.find(query).toArray();
      res
        .status(200)
        .json({ message: "Products fetched successfully", result });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

module.exports.allproducts_get = async (req, res) => {
  const collection = await dataConnect();
  try {
    const result = await collection.find().toArray();
    shuffleArray(result);
    res
      .status(200)
      .json({ message: "All products fetched successfully", result });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
};

module.exports.getSellerProduct_post = async (req, res) => {
  const collection = await dataConnect();
  const seller_id = req.body.seller_id;
  try {
    const result = await collection
      .find({ "newProduct.seller_id": seller_id })
      .toArray();
    res.status(200).json({ message: "Products fetched successfully", result });
  } catch (err) {
    res.status(400).json({ error: "Failed to fetch products" });
  }
};

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

module.exports.wishlist_post = async (req, res) => {
  const collection = await dataConnect();
  const { user_id, product_id } = req.body;
  try {
    const result = await collection.findOne({ _id: new ObjectId(product_id) });
    if (result) {
      const updateResult = await collection.updateOne(
        { _id: new ObjectId(product_id) },
        { $push: { wishlist: new ObjectId(user_id) } }
      );
      if (updateResult.modifiedCount > 0) {
        res.status(200).json({ message: "User added to product's wishlist" });
      } else {
        res
          .status(500)
          .json({ message: "Failed to add user to product's wishlist" });
      }
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "An error occurred" });
  }
};

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
        res
          .status(200)
          .json({ message: "User removed from product's wishlist" });
      } else {
        res
          .status(500)
          .json({ message: "Failed to remove user from product's wishlist" });
      }
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "An error occurred" });
  }
};

module.exports.updateStock = async (req, res) => {
  const { products } = req.body;
  const collection = await dataConnect();
  try {
    for (let i = 0; i < products.length; i++) {
      const product = await collection.findOne({
        _id: new ObjectId(products[i].product_id),
      });
      const newamt = parseInt(product.newProduct.stock) - products[i].amount;
      const result = await collection.updateOne(
        { _id: new ObjectId(products[i].product_id) },
        { $set: { "newProduct.stock": newamt } }
      );
    }
  } catch (err) {
    console.log(err.message);
    res.status(400).json({ message: "Failed to update stock" });
  }
  res.status(200).json({ message: "Order Placed" });
};

module.exports.like_put = async (req, res) => {
  const collection = await dataConnect();
  const { product_id, userId, like } = req.body;
  console.log("pro:", product_id);
  console.log("userid:", userId);
  try {
    console.log("enter likes");
    const result = await collection.findOne({ _id: new ObjectId(product_id) });
    if (result) {
      const newLikes = parseInt(result.newProduct.likes) + like;
      let newLikeUsers;

      if (like == 1) {
        newLikeUsers = [...result.newProduct.likeUsers, userId];
      } else {
        const index = result.newProduct.likeUsers.indexOf(userId);
        newLikeUsers = [...result.newProduct.likeUsers];
        newLikeUsers.splice(index, 1);
      }
      const updateResult = await collection.updateOne(
        { _id: new ObjectId(product_id) },
        {
          $set: {
            "newProduct.likes": newLikes,
            "newProduct.likeUsers": newLikeUsers,
          },
        }
      );
      if (updateResult.modifiedCount > 0) {
        res.status(200).json({ message: "Product liked" });
      } else {
        res.status(500).json({ message: "Failed to like product" });
      }
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "An error occurred" });
  }
};
