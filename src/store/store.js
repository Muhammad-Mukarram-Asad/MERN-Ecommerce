import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "./authSlice";
import adminProductsSliceReducer from "./admin/productSlice";

const store = configureStore({
    reducer: {
        auth: authSliceReducer
        , adminProducts: adminProductsSliceReducer
    },
});

export default store