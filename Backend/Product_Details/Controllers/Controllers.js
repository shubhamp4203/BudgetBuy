const fs = require("fs");
const dataConnect = require("../Connection/Connection");

module.exports.insertProduct_post = async (req, res) => {
    try {
        const newProduct = req.body;
        const imageBuffer = req.file.buffer;
        const base64Image = Buffer.from(imageBuffer).toString("base64");

        const collection = await dataConnect();
        const result = await collection.insertOne({ newProduct: newProduct, image: base64Image });
        
        res.status(201).json({ message: "Product inserted successfully", product_id: result.insertedId });
    } catch (error) {
        console.error("Error while inserting product:", error);
        res.status(500).json({ error: "Failed to insert product" });
    }
};
