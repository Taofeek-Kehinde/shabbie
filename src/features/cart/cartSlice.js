import { createSlice } from "@reduxjs/toolkit";

const load = () => {
  try {
    const raw = localStorage.getItem("shabbie_cart");
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const persist = (items) => {
  try {
    localStorage.setItem("shabbie_cart", JSON.stringify(items));
  } catch {}
};

const cartSlice = createSlice({
  name: "cart",
  initialState: { items: load() },
  reducers: {
    addToCart: (state, action) => {
      const { id, qty = 1 } = action.payload;
      const existing = state.items.find((i) => i.id === id);
      if (existing) existing.qty += qty;
      else state.items.push({ id, qty });
      persist(state.items);
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((i) => i.id !== action.payload);
      persist(state.items);
    },
    updateQty: (state, action) => {
      const { id, qty } = action.payload;
      const item = state.items.find((i) => i.id === id);
      if (item) item.qty = Math.max(1, qty);
      persist(state.items);
    },
    clearCart: (state) => {
      state.items = [];
      persist(state.items);
    },
  },
});

export const { addToCart, removeFromCart, updateQty, clearCart } =
  cartSlice.actions;

export const selectCartCount = (state) =>
  state.cart.items.reduce((sum, i) => sum + i.qty, 0);

export const selectCartTotal = (state) =>
  state.cart.items.reduce((sum, i) => {
    const p = state.products.items.find((x) => x.id === i.id);
    return sum + (p ? p.price * i.qty : 0);
  }, 0);

export const selectCartDetailed = (state) =>
  state.cart.items
    .map((i) => {
      const p = state.products.items.find((x) => x.id === i.id);
      return p ? { ...p, qty: i.qty, subtotal: p.price * i.qty } : null;
    })
    .filter(Boolean);

export default cartSlice.reducer;