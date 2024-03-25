import { Schema, model } from "mongoose";

const productSchema = new Schema({
  productId: { type: String },
  quantity: { type: Number, default: 1 },
});

const userCartSchema = new Schema({
  user: {
    userId: { type: String },
    name: { type: String },
    email: { type: String },
    mobile: { type: String },
  },
  cartProduct: {
    type: [productSchema],
    default: [],
  },
});

const Cart = model("Cart", userCartSchema);
export default Cart;
