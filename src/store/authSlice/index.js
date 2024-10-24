import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isAuthenticated: false,
  isLoading: false,
  user: null,
  error: null,
  status: null
};


export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post("http://localhost:5000/api/auth/register", formData);
      console.log("response of register auth slice => ", response);
      return response;
    } catch (error) {
      console.error("Error in registerUser:", error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", formData);
      console.log("response of login auth slice => ", response);
      return response;
    } catch (error) {
      console.error("Error in loginUser:", error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const authSliceReducer = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setUser: (state, action) => {},
  },

  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state) => {
      state.isLoading = true;
      state.status = "pending";
    }),
      builder.addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false; // it will be true after login success
        state.user = null; // We will addd the details after login success
        state.error = null;
        state.status = "fulfilled";
      }),
      builder.addCase(registerUser.rejected, (state,action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.error = action.message;
        state.status = "rejected";
      });
  },
});

export const { setUser } = authSliceReducer.actions;
export default authSliceReducer.reducer;
