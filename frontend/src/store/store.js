import { configureStore } from "@reduxjs/toolkit"
import authReducer from './auth-slice/authSlice'
import adminProductReducer from './admin/product-slice/index'
import shopProductReducer from './shop/product-slice/index'

const store = configureStore({
  reducer: {
    auth_slice: authReducer,
    admin_product_slice: adminProductReducer,
    shop_product_slice: shopProductReducer,
  }
});

export default store;