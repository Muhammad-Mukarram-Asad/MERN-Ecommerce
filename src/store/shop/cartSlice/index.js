import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isLoading: false,
    cartItems: [],
};

export const fetchAllCartItems = createAsyncThunk(
    "/cart/fetchAllCartItems",
    async (userId) => {
        const result = await axios.get(
            "http://localhost:5000/api/shop/carts/fetchAllCartItems/" + userId
        );
        return result?.data;
    }
);

export const addToCart = createAsyncThunk(
    "/cart/addToCart",
    async ({ userId, productId, quantity }) => {
        const result = await axios.post(
            "http://localhost:5000/api/shop/carts/addToCart",
            { userId, productId, quantity },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        return result?.data;
    }
);

export const deleteCartItem = createAsyncThunk(
    "cart/deleteCartItem",
    async ({ userId, productId }) => {
      const response = await axios.delete(
        `http://localhost:5000/api/shop/carts/deleteCartItem/${userId}/${productId}`
      );
  
      return response.data;
    }
  );
  
  export const updateCartQuantity = createAsyncThunk(
    "cart/updateCartQuantity",
    async ({ userId, productId, quantity }) => {
      const response = await axios.put(
        `http://localhost:5000/api/shop/carts/updateCartItem`,
        {
          userId,
          productId,
          quantity,
        }
      );
  
      return response.data;
    }
  );

const shoppingCartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {},

    extraReducers: (builder) => {
        builder
          .addCase(addToCart.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(addToCart.fulfilled, (state, action) => {
            state.isLoading = false;
            state.cartItems = action.payload.data;
          })
          .addCase(addToCart.rejected, (state) => {
            state.isLoading = false;
            state.cartItems = [];
          })
          .addCase(fetchAllCartItems.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(fetchAllCartItems.fulfilled, (state, action) => {
            state.isLoading = false;
            state.cartItems = action.payload.data;
          })
          .addCase(fetchAllCartItems.rejected, (state) => {
            state.isLoading = false;
            state.cartItems = [];
          })
          .addCase(updateCartQuantity.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(updateCartQuantity.fulfilled, (state, action) => {
            state.isLoading = false;
            state.cartItems = action.payload.data;
          })
          .addCase(updateCartQuantity.rejected, (state) => {
            state.isLoading = false;
            state.cartItems = [];
          })
          .addCase(deleteCartItem.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(deleteCartItem.fulfilled, (state, action) => {
            state.isLoading = false;
            state.cartItems = action.payload.data;
          })
          .addCase(deleteCartItem.rejected, (state) => {
            state.isLoading = false;
            state.cartItems = [];
          });
      },
   
});

export default shoppingCartSlice.reducer ;
