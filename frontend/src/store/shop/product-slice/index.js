import { axiosInstance } from "../../../lib/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  productList: [],
}

export const handleAllFilteredProducts = createAsyncThunk('/shop/products/getProducts', async() => {
  try {
    const response = await axiosInstance.get('/shop/products/getProducts');
    return response.data;
  } catch (error) {
    console.log('Error in handleAllFilteredProducts -> shop_product_slice', error);
    return error.response.data
  }
});


const shoppingProductSlice = createSlice({
  name: 'shop_product_slice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(handleAllFilteredProducts.pending, (state, action) => {
      state.isLoading = true;
    })
    .addCase(handleAllFilteredProducts.fulfilled, (state, action) => {
      console.log('Action Payload', action.payload);
      state.isLoading = false;
      state.productList = action.payload;
    })
    .addCase(handleAllFilteredProducts.rejected, (state, action) => {
      state.isLoading = false;
      state.productList = [];
    })
  }
});

export default shoppingProductSlice.reducer;