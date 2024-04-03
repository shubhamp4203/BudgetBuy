const fs = require("fs");
const dataConnect = require("../Connection/Connection");

module.exports.insertProduct_post = async (req, res) => {
    try {
        const newProduct = req.body;
        const seller_id=req.query.seller_id;
        // const seller_id=req.authdata.seller_id
        const imageBuffer = req.file.buffer;
        const base64Image = Buffer.from(imageBuffer).toString("base64");
        const collection = await dataConnect();
        const exist=await collection.findOne({seller_id,skuid});
        if(!exist){
            const result = await collection.insertOne({ newProduct: newProduct,seller_id,skuid, image: base64Image });
            res.status(201).json({ message: "Product inserted successfully", result});
        }
    } catch (error) {
        console.error("Error while inserting product:", error);
        res.status(500).json({ error: "Failed to insert product" });
    }
};
