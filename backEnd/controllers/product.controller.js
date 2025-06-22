import mongoose from "mongoose";

import Product from "../models/product.model.js";

export const getProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json({success: true, data: products});
    } catch (error) {
        res.status(500).json({success: false, message: "Server Error"});
    }
}

export const createProducts = async (req, res) => {
    const product = req.body; // user send this body data

    if(!product.name || !product.price || !product.image){
        return res.status(400).json({success: false, message: "Please provide all fields"});
    }

    // if have all of the required fields above, then create new Product
    const newProduct = new Product(product);

    try {
        await newProduct.save();
        res.status(201).json({success: true, data: newProduct});
    } catch (error) {
        res.status(500).json({success: false, message: "Server Error"});
    }
}

export const updateProduct = async (req, res) => {
    const {id} = req.params;
    const product = req.body;

    // to handle when user enters invalid product id
    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(404).json({success: false, message: "Invalid Product ID"});
    }
    
    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, product, {new:true});
        res.status(200).json({success: true, data: updatedProduct});
    } catch (error) {
        res.status(500).json({success: false, message: "Server Error"});
    }
}

export const deleteProduct = async (req, res) => {
    const {id} = req.params;
    
        // to handle when user enters invalid product id
    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(404).json({success: false, message: "Invalid Product ID"});
    }
    
    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({success: true, message: "Product deleted"});
    } catch (error) {
        res.status(500).json({success: false, message: "Server Error"});
    }
}