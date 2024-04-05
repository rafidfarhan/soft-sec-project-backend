const Product = require("../models/ProductModel");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");


exports.createProduct = asyncHandler(async (req,res,next) =>{
   
    const product = await Product.create(req.body);
    res.status(201).json({
        success: true,
        message: "Product created",
        data: product
    });

});

exports.getProduct = asyncHandler(async (req,res,next) =>{
    
    try {
        const product = await Product.findById(req.params.id);
        res.status(200).json(product);
      } catch (err) {
        res.status(500).json(err);
      }
});

exports.getProducts = asyncHandler(async (req,res,next) =>{
    let query;

    if(req.params.albumId){
        query = Product.find({album: req.params.albumId});
    }
    else{
        query = Product.find();
    }
    
        const products = await query;
        res.status(200).json({success: true,count : products.length ,data: products});
});
