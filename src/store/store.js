import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import adminProductSlice from "./admin/productSlice";
import shoppingProductSlice from "./shop/productSlice/index";
import shoppingCartSlice from "./shop/cartSlice/index"

const store = configureStore({
    reducer: {
        auth: authSlice,
        adminProducts: adminProductSlice,
        shoppingProducts: shoppingProductSlice,
        shoppingCart: shoppingCartSlice
    },
});

export default store