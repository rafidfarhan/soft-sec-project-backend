const User = require("../models/userModel");
const path = require('path');
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");

exports.register = asyncHandler(async (req,res,next) =>{
    const {username, email,password} = req.body;
    const user = await User.create({
        username,
        email,
        password,
    });

    sendTokenResponse(user,200,res);

});

exports.login = asyncHandler(async (req,res,next) =>{
  const {email,password} = req.body;

  if(!email || !password){
      return next(new ErrorResponse('Please add email and password',400))
  }

  const user = await User.findOne({ email:email}).select('+password');

  if(!user){
      return next(new ErrorResponse('Invalid Credentials',401))
  }

  const isMatch = await user.matchPassword(password);

  if(!isMatch){
      return next(new ErrorResponse('Invalid Credentials',401))
  }
 
  sendTokenResponse(user,200,res);

});


exports.getMe = asyncHandler(async (req, res, next) => {
  // user is already available in req due to the protect middleware
  const user = req.user;

  res.status(200).json({
    success: true,
    data: user,
  });
});


exports.logout = asyncHandler(async (req, res, next) => {
  res.cookie('token', 'none', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    data: {},
  });
});

exports.updatePassword = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id).select('+password');

  // Check current password
  if (!(await user.matchPassword(req.body.currentPassword))) {
    return next(new ErrorResponse('Incorrect password', 401));
  }

  user.password = req.body.newPassword;
  await user.save();

  sendTokenResponse(user, 200, res);
});





//Get token from model and create cookie, send response
const sendTokenResponse = (user, statusCode,res) =>{
    const token =user.getSignedJwtToken();

    const options = {
        expires : new Date(Date.now()+ 30 *24*60*60*1000),
        httpOnly : true
    };
    res.status(statusCode).cookie('token',token,options).json({
        success: true,
        token
           
    });
}