const jwt = require('jsonwebtoken');
const asyncHandler = require('./async');
const ErrorResponse = require('../utils/errorResponse');
const User = require('../models/userModel');

//Protect routes

exports.protect = asyncHandler(async(req,res,next)=>{
    let token

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer') ){
        token = req.headers.authorization.split(' ')[1];
    }
    // Using Cookies

    else if (req.cookies.token){
        token = req.cookies.token
    }

    if(!token){
        return next(new ErrorResponse('Not authorized to access this route',401));
        
    }

    try{
        const decoded = jwt.verify(token, "MySecret");
            console.log(decoded);
            req.user = await User.findById(decoded.id)
        //     .populate( {
        //       path: 'createdPlaylists',
        //       select : 'name'
        //   });
            next();
    }
    catch(err){
        return next(new ErrorResponse('Not authorized to access this route',401));
    }
});

// Grant access to specific roles
exports.authorize = (...roles) => {
    return (req, res, next) => {
      if (!roles.includes(req.user.userType)) {
        return next(
          new ErrorResponse(
            `User role '${req.user.userType}' is not authorized to access this route`,
            403
          )
        );
      }
      next();
    };
  };