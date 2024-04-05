const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv"); 
const cors = require("cors");

const helmet = require("helmet");
const xss = require("xss-clean");
const hpp = require("hpp");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const mongoSanitize = require("express-mongo-sanitize");

const authRoute = require("./routes/auth");
const ProductRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
// import booksRoute from './routes/booksRoute.js';
// import cors from 'cors';
const config = require("./config/config");
const app = express();

const errorHandler = require("./middleware/error");

// Middleware for parsing request body
app.use(express.json());
app.use(cookieParser());

app.use(mongoSanitize());
app.use(helmet());
app.use(xss());


app.use(hpp());
app.use(cors());
// Middleware for handling CORS POLICY
// Option 1: Allow All Origins with Default of cors(*)
// app.use(cors());
// Option 2: Allow Custom Origins
// app.use(
//   cors({
//     origin: 'http://localhost:3000',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type'],
//   })
// );


// app.get('/', (request, response) => {
//   console.log(request);
//   return response.status(234).send('Welcome To MERN Stack Tutorial');
// });


app.use("/api/v1/auth", authRoute);
app.use('/api/v1/products', ProductRoute);
app.use('/api/v1/cart', cartRoute);
app.use('/api/v1/order', orderRoute);
app.use(errorHandler);

mongoose
  .connect(config.mongoDBURL)
  .then(() => {
    console.log('App connected to database');
    app.listen(config.PORT, () => {
      console.log(`App is listening to port: ${config.PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });