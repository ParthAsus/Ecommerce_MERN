import { configureStore } from "@reduxjs/toolkit"
import authReducer from './auth-slice/authSlice'
import adminProductReducer from './admin/product-slice/index'

const store = configureStore({
  reducer: {
    auth_slice: authReducer,
    admin_product_slice: adminProductReducer,
  }
});

export default store;