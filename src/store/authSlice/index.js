import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isAuthenticated: false,
  isLoading: false,
  user: null,
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
      console.error("Error in registerUser:", error?.response?.data?.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", formData, {
        withCredentials: true // it is used to send cookies
      })
      console.log("response of login auth slice => ", response);
      return response;
    } catch (error) {
      console.error("Error in loginUser:", error.response?.data);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  // for removing token after logging out, we should have to send an empty data like this {}
  async () => {
      const response = await axios.post("http://localhost:5000/api/auth/logout", {}, {
        withCredentials: true
      });
      console.log("response of logout auth slice => ", response);
      return response;
  }
);


export const checkAuth = createAsyncThunk("auth/checkAuth", async (_, {rejectWithValue}) => {
  try {
    const response = await axios.get("http://localhost:5000/api/auth/check-auth",
      {
        withCredentials: true,  // Make sure cookies must be present 
        headers: {
          "cache-control": "no-cache no-store must-revalidate proxy-revalidate",
        },
      }
    );
    
    console.log("response of check auth slice => ", response);  // Log only the actual data
    return response;  // Return the data from the response, not the entire response object
  } catch (error) {
    console.error("Error during check auth request:", error);
    return rejectWithValue(error.response?.data);
  }
});

const authSlice = createSlice({
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
        state.user = null; // We will add the details after login success
        state.status = "fulfilled";
      }),
      builder.addCase(registerUser.rejected, (state,action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.status = "rejected";
      }),

      builder.addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.status = "pending";
      }),

      builder.addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true; 
        state.user = action.payload.data.user; 
        state.status = "fulfilled";
      }),

      builder.addCase(loginUser.rejected, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.status = "rejected";
      }),

      builder.addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
        state.status = "pending";
      }),

      builder.addCase(logoutUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false; 
        state.user = null; 
        state.status = "fulfilled";
      }),

      builder.addCase(logoutUser.rejected, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.status = "rejected";
      }),

      builder.addCase(checkAuth.pending, (state) => {
        state.isLoading = true;
        state.status = "pending";
      }),

      builder.addCase(checkAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true; 
        state.user = action.payload.data.user; 
        state.status = "fulfilled";
      }),

      builder.addCase(checkAuth.rejected, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.status = "rejected";
      })
    }
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
