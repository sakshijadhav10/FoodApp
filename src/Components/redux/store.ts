import { configureStore } from "@reduxjs/toolkit";
// import cartReducer from '../Features/CartSlice'
import cartSlice from '../redux/slices/cardSlice'
export const store=configureStore({
    reducer:{
        // cart:cartReducer
        allCart:cartSlice
    }
    
})
