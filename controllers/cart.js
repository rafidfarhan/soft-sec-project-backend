const Cart = require("../models/cartModel");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");


exports.createCart = asyncHandler(async (req,res,next) =>{
   
    const cart = await Cart.create(req.body);
    res.status(201).json({
        success: true,
        message: "Cart created",
        data: cart
    });

});


exports.updateCart = asyncHandler(async (req,res,next) =>{
  
    const cart = await Cart.findByIdAndUpdate(req.params.id, req.body, {
        new:true,
        runValidators:true
    });

    if (!cart){
        next(new ErrorResponse (`Cart with id of ${req.params.id} not found`,404));
    }
    else{
        res.status(200).json({success: true,data: cart});
    }  

});

// exports.addToCart = asyncHandler(async (req,res,next) =>{
  
//     const cart = await Cart.findByIdAndUpdate(req.params.id, req.body, {
//         new:true,
//         runValidators:true
//     });

//     if (!cart){
//         next(new ErrorResponse (`Cart with id of ${req.params.id} not found`,404));
//     }
//     else{
//         res.status(200).json({success: true,data: cart});
//     }  

// });

exports.deleteCart = asyncHandler(async (req,res,next) =>{
    
    const cart = await Cart.findByIdAndDelete(req.params.id);
    
    if (!cart){
        next(new ErrorResponse (`Cart with id of ${req.params.id} not found`,404));
    }
    else{
        res.status(200).json({success: true,data: {}});

    }      

});

exports.getUserCart = asyncHandler(async (req,res,next) =>{
    const cart = await Cart.findOne({userId:req.params.id});

    if (!cart){
        next(new ErrorResponse (`Cart for user with id of ${req.params.id} not found`,404));
    }
    else{
        res.status(200).json({success: true,data: cart});

    }      
});