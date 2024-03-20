import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import authReducer from "./authSlice";
//import productReducer from "./productSlice";

const appStore = configureStore({
    reducer: {
        cart: cartReducer,
        auth: authReducer
        //product: productReducer
    },
})

export default appStore;