import { axiosInstance } from "../../../lib/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  productList: [],
}

function createSearchParamsHelper(filter){
  const queryParams = [];
  for(const [key, value] of Object.entries(filter)){
    const paramValue = value.join(',');
    queryParams.push(`${key}=${encodeURIComponent(paramValue)}`);
  };

  return queryParams.join('&');
}

export const handleAllFilteredProducts = createAsyncThunk('/shop/products/getProducts', async({filterParams, sortParams}) => {
  try {
    const filterQuery = createSearchParamsHelper(filterParams);
    const query = `${filterQuery}&sortBy=${sortParams}`;
    const response = await axiosInstance.get(`/shop/products/getProducts?${query}`);
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
      console.log('Action Payload', action.payload.data);
      state.isLoading = false;
      state.productList = action.payload.data;
    })
    .addCase(handleAllFilteredProducts.rejected, (state, action) => {
      state.isLoading = false;
      state.productList = [];
    })
  }
});

export default shoppingProductSlice.reducer;