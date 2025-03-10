import Product from "../models/product.model.js";
import mongoose from 'mongoose';

export const getProducts = async (req,res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({success: true, data: products});
  } catch (error) {
    console.error("Error in get products: ", error.message);
    return res.status(500).json({success: false, message: "Server error"});
  }
}

export const createProduct =  async (req,res) => {
  const product = req.body;

  if(!product.name || !product.price || !product.image){
    return res.status(400).json({success: false, message: "Please provide all fields"});
  }

  const newProduct = await Product.create(product);

  try {
    await newProduct.save();
    res.status(201).json({success: true, data: newProduct});
  } catch (error) {
    console.error("Error in create product: ", error.message);
    return res.status(500).json({success: false, message: "Server error"});
  }
}

export const updateProduct = async (req,res) => {
  const {id} = req.params;
  console.log("id to update: ",id);

  const product = req.body;
  console.log(product);

  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({success: false, message:"Invalid id"});
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, product, {new: true}); // new: true get the updated product. if not it will get the old one
    res.status(200).json({success: true, data: updatedProduct});
  } catch (error) {
    console.error("Error in update products: ", error.message);
    return res.status(500).json({success: false, message: "Server error"});
  }
}

export const deleteProduct = async (req,res) => {
  const {id} = req.params;
  console.log("id to delete: ", id);

  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({success: false, message:"Invalid id"});
  }

  try {
    await Product.findByIdAndDelete(id);
    res.status(200).json({success: true, message:"Product deleted"});
  } catch (error) {
    console.error("Error in delete product: ", error.message);
    return res.status(500).json({success: false, message: "Server error"});
  }
}