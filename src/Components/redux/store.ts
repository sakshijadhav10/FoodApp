import { configureStore } from "@reduxjs/toolkit";

import cartSlice from '../redux/slices/cardSlice'
export const store=configureStore({
    reducer:{
    
        allCart:cartSlice
    }
    
})
