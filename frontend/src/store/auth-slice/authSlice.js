import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {axiosInstance} from '../../lib/axios';
const initialState = {
  isAuthenticated: false,
  isLoading: false,
  user: null
}

export const registerUser = createAsyncThunk('auth/signup', async(formData) => {
  try {
    const response = await axiosInstance.post('/auth/signup', formData);
    return response.data; 
  } catch (error) {
    return error.response.data
  }
});

export const loginUser = createAsyncThunk('auth/login', async(formData) => {
  try {
    const response = await axiosInstance.post('/auth/login', formData);
    return response.data; 
  } catch (error) {
    return error.response.data
  }
});

const authSlice = createSlice({
  name: "auth_slice",
  initialState,
  reducers: {
    setUser: (state, action) => {},
  },

  // for signUp
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state) => {
      state.isLoading = true;
    }).addCase(registerUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = false;
    }).addCase(registerUser.rejected, (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = false;
    });
  },

  // for login
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.isLoading = true;
    }).addCase(loginUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload.success ? action.payload.user : null;
      state.isAuthenticated = action.payload.success ? true : null;
    }).addCase(loginUser.rejected, (state) => {
      state.isLoading = false;
    });
  },

});

export const {setUser} = authSlice.actions;
export default authSlice.reducer; 