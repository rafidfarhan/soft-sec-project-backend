const Order = require("../models/orderModel");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");


exports.createOrder = asyncHandler(async (req,res,next) =>{
   
    const order = await Order.create(req.body);
    res.status(201).json({
        success: true,
        message: "Order placed",
        data: order
    });

});


exports.updateOrder = asyncHandler(async (req,res,next) =>{
  
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, {
        new:true,
        runValidators:true
    });

    if (!order){
        next(new ErrorResponse (`Order with id of ${req.params.id} not found`,404));
    }
    else{
        res.status(200).json({success: true,data: order});
    }  

});

exports.deleteOrder = asyncHandler(async (req,res,next) =>{
    
    const order = await Order.findByIdAndDelete(req.params.id);
    
    if (!order){
        next(new ErrorResponse (`Order with id of ${req.params.id} not found`,404));
    }
    else{
        res.status(200).json({success: true,data: {}});

    }      

});


exports.getUserOrders = asyncHandler(async (req,res,next) =>{
    const order = await Order.find({userId:req.params.userid});

    if (!order){
        next(new ErrorResponse (`Order for user with id of ${req.params.userid} not found`,404));
    }
    else{
        res.status(200).json({success: true,data: order});

    }      
});