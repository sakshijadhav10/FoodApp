import { configureStore } from "@reduxjs/toolkit";

import cartSlice from "./slices/cardSlice";
export const store = configureStore({
  reducer: {
    allCart: cartSlice,
  },
});
