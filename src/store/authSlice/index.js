import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    isAuthenticated: false,
    isLoading: false,
    user: null,
}
const authSliceReducer = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
      setUser: (state,action) => {}
    },
});

export const { setUser } = authSliceReducer.actions;

export default authSliceReducer.reducer