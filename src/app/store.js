import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "../features/products/productsSlice";
import cartReducer from "../features/cart/cartSlice";
import uiReducer from "../features/ui/uiSlice";

export const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
    ui: uiReducer,
  },
});