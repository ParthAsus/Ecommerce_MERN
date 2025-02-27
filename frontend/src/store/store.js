import { configureStore } from "@reduxjs/toolkit"
import authReducer from './auth-slice/authSlice'


const store = configureStore({
  reducer: {
    auth_slice: authReducer
  }
});

export default store;