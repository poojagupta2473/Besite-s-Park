import express from "express";
import bodyParser from "body-parser";
import { connect } from "mongoose";
import cors from "cors";
import Razorpay from "razorpay";

import adminRouter from "./routes/adminRoute.js";
import userRouter from "./routes/userRoute.js";
import productRoute from "./routes/productRoute.js";
import paymentouter from "./routes/paymentRoute.js";
import { config } from "dotenv";
config();

const app = express();
app.use(cors());

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Port and Database Connection String
const PORT = process.env.PORT || 8000;
const DbUrl = process.env.DBURL;

export const instance = new Razorpay({
  key_id: process.env.KEY_ID,
  key_secret: process.env.KEY_SECRET,
});

connect(DbUrl)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server started at PORT ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });

app.use(adminRouter);
app.use(userRouter);
app.use(productRoute);
app.use(paymentouter);
