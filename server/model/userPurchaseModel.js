import { Schema, model } from "mongoose";

const productSchema = new Schema({
  productId: {
    type: Schema.Types.ObjectId,
  },
  quantity: { type: Number, default: 1, min: 1 },
  totalCost: { type: Number, min: 0 },
});

const orderSchema = new Schema(
  {
    orderId: { type: String },
    paymentId: { type: String },
    cartProducts: {
      type: [productSchema],
      default: [],
    },
    allProductCost: { type: Number },
  },
  { timestamps: true }
);

const addressSchema = new Schema({
  name: { type: String },
  email: { type: String },
  mobile: { type: String, default: 9999999999 },
  city: { type: String },
  district: { type: String },
  pincode: { type: Number },
  state: { type: String },
  street: { type: String },
  type: { type: String },
});

const purchaseSchema = new Schema(
  {
    userId: { type: String },
    orders: { type: [orderSchema], default: [] },
    address: { type: addressSchema },
  },
  {
    timestamps: true,
  }
);

const Purchase = model("Purchase", purchaseSchema);
export default Purchase;
