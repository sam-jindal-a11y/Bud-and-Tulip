import express from "express";
import Product from "../models/Product.js";
import data from "../ProductData.js";

const seedRouter = express.Router();

seedRouter.get('/', async(req, res) =>{
    await Product.deleteMany({});
    const createdProducts = await Product.insertMany(data);
    res.send({createdProducts});
    
});

export default seedRouter;
