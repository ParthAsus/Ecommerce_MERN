import { axiosInstance } from "../../../lib/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
  productLists: [],
}

export const handleAddNewProduct = createAsyncThunk('/admin/products/addNewProduct', async(productData) => {
  try {
    const response = await axiosInstance.post('/admin/products/addNewProduct', productData, {headers: {'Content-Type': 'application/json'}});
    return response.data;
  } catch (error) {
    console.log('Error in handleAddNewProduct -> admin_product_slice', error);
    return error.response.data;
  }
});

export const handleEditProduct = createAsyncThunk('/admin/products/editProduct', async({id, updatedProductData}) => {
  try {
    const response = await axiosInstance.put(`/admin/products/editProduct/${id}`, updatedProductData, {headers: {'Content-Type': 'application/json'}});
    return response.data;
  } catch (error) {
    console.log('Error in handleEditProduct -> admin_product_slice', error);
    return error.response.data
  }
});

export const handleDeleteProduct = createAsyncThunk('/admin/products/deleteProduct', async(id) => {
  try {
    const response = await axiosInstance.delete(`/admin/products/deleteProduct/${id}`);
    return response.data;
  } catch (error) {
    console.log('Error in handleDeleteProduct -> admin_product_slice', error);
    return error.response.data
  }
});

export const handleFetchAllProducts = createAsyncThunk('/admin/products/fetchAllProducts', async() => {
  try {
    const response = await axiosInstance.get('/admin/products/fetchAllProducts');
    return response.data;
  } catch (error) {
    console.log('Error in handleFetchAllProducts -> admin_product_slice', error);
    return error.response.data
  }
});

const adminProductSlice = createSlice({
  name: 'admin_product_slice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(handleFetchAllProducts.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(handleFetchAllProducts.fulfilled, (state, action) => {
      // console.log(action.payload);
      state.isLoading = false;
      state.productLists = action.payload;
    })
    .addCase(handleFetchAllProducts.rejected, (state, action) => {
      state.isLoading = false;
      state.productLists = [];
    })
  }
})

export default adminProductSlice.reducer;