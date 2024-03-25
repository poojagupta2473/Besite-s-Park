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
      type: Buffer,
    },
    contentType: {
      type: String,
    },
  },

  about: {
    type: String,
  },
  quantity: {
    type: Number,
  },
});

const Products = model("Products", ProductModel);
export default Products;
