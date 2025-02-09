import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import adminProductSlice from "./admin/productSlice";
import shoppingProductSlice from "./shop/index";

const store = configureStore({
    reducer: {
        auth: authSlice,
        adminProducts: adminProductSlice,
        shoppingProducts: shoppingProductSlice
    },
});

export default store