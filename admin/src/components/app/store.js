import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../slices/productsSlice";

export const store = configureStore({
  reducer: {
    products: productReducer,
  },
});
