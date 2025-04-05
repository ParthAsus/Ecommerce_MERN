import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {axiosInstance} from '../../lib/axios';
const initialState = {
  isAuthenticated: false,
  isLoading: true,
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

export const logoutUser = createAsyncThunk('auth/logout', async() => {
  try {
    const response = await axiosInstance.post('/auth/logout', {}, {
      withCredentials: true
    });
    return response.data; 
  } catch (error) {
    return error.response.data
  }
});



export const checkAuth = createAsyncThunk('auth/check-auth', async() => {
  try {
    const response = await axiosInstance.get('/auth/check-auth', {}, {
      headers: {
        'Cache-Control' : 'no-store, no-cache, must-revalidate, proxy-revalidate'
      }
    });
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

     // for login
    builder.addCase(loginUser.pending, (state) => {
      state.isLoading = true;
    }).addCase(loginUser.fulfilled, (state, action) => {
      state.isLoading = false;
      if (action.payload.success) {
        state.user = action.payload.user;
        state.isAuthenticated = true;
      } else {
        state.user = null;
        state.isAuthenticated = false;
      }
    }).addCase(loginUser.rejected, (state) => {
      state.isLoading = false;
    });


  // for check-auth
    builder.addCase(checkAuth.pending, (state) => {
      state.isLoading = true;
    })
    builder.addCase(checkAuth.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload.success ? action.payload.user : null;
      state.isAuthenticated = action.payload.success;
    })
    builder.addCase(checkAuth.rejected, (state, action) => {
      state.isLoading = false;
      state.user = null;
      state.isAuthenticated = false;
    });

    // for logout
    builder.addCase(logoutUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = null;
      state.isAuthenticated = false;
    });
  },


});

export const {setUser} = authSlice.actions;
export default authSlice.reducer; 