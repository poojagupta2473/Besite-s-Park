import { Schema, model } from "mongoose";

const ProductModel = Schema({
  title: {
    type: String,
  },
  brand: {
    type: String,
  },
  model: {
    type: String,
  },
  price: {
    type: String,
  },
  ram: {
    type: String,
  },
  processor: {
    type: String,
  },
  camera: {
    type: String,
  },
  screen: {
    type: String,
  },
  storage: {
    type: String,
  },
  color: {
    type: String,
  },
  image: {
    data: {
      Data: Buffer,
    },
    contentType: {
      type: String,
    },
  },

  about: {
    type: String,
  },
});

const Product = model("Product", ProductModel);
export default Product;
