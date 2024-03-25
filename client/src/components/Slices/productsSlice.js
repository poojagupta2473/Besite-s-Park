import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../Utils/axiosInstance";

const initialState = {
  name: "products",
  isLoading: false,
  data: null,
  isError: false,
};

export const fetchProducts = createAsyncThunk("fetchProducts", async () => {
  const response = await axiosInstance.get("/products");
  return response.data;
});

export const selectProductById = (state, productId) => {
  return state.products.data.find((product) => product._id === productId);
};

export const selectProductByBrand = (state, brand) => {
  if (!state.products.data) {
    return [];
  }
  return state.products.data.filter((product) => product.brand === brand);
};

export const selectAllProduct = (state) => {
  return state.products;
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      // console.log(action.payload);
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.isError = true;
      state.isLoading = false;
      // console.log("Error", action.payload);
    });
  },
});

export default productsSlice.reducer;
