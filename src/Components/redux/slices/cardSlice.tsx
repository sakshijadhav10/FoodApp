import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import AddtoCart from "../../AddtoCart";
import { NavLink } from "react-router-dom";
import { Dialog } from "@mui/material";

const initialState = {
  carts: [],
};

const cartSlice = createSlice({
  name: "Cart",
  initialState,
  reducers: {
    addToCart: (
      state,
      action: PayloadAction<{ item: any; restaurant: any }>
    ) => {
      const { item, restaurant } = action.payload;

      const existingResta = state.carts.find(
        (cartItem) => cartItem.restaurant.id !== restaurant.id
      );

      if (existingResta) {
        state.carts = [];
      }
      const existingItem = state.carts.find(
        (cartItem) =>
          cartItem.item.id === item.id &&
          cartItem.restaurant.id === restaurant.id
      );
      console.log("item", item);
      console.log("res", restaurant);

      if (restaurant.id !== existingItem) {
        if (existingItem) {
          console.log(existingItem);
          existingItem.qnty += 1;
        } else {
          console.log("hi", existingItem);
          state.carts.push({ item, restaurant, qnty: 1 });
        }
      } else {
        state.carts.pop({ item, restaurant, qnty: 0 });
      }
    },
    removeSingleItems: (state, action: PayloadAction<{ id: number }>) => {
      const { id } = action.payload;
      console.log("Item ID:", id);

      const existingItem = state.carts.find(
        (cartItem) => cartItem.item.id === id
      );

      if (existingItem) {
        if (existingItem.qnty === 1) {
          state.carts = state.carts.filter(
            (cartItem) => cartItem.item.id !== id
          );
        } else {
          existingItem.qnty -= 1;
        }
      } else {
        console.log("Item not found in cart");
      }
    },
    removeCart: (state, action) => {
      state.carts = state.carts.filter(
        (cartItem) => cartItem.item.id !== action.payload
      );
    },
    emptyCarts: (state) => {
      state.carts = [];
    },
  },
});

export const { addToCart, removeCart, removeSingleItems, emptyCarts } =
  cartSlice.actions;
export default cartSlice.reducer;
