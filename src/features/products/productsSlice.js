import { createSlice } from "@reduxjs/toolkit";
import { perfumes } from "../../data/perfumes";

const initialState = {
  items: perfumes,
  selectedId: null,
  filter: "all",
  search: "",
  sort: "default",
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    selectProduct: (state, action) => {
      state.selectedId = action.payload;
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    setSearch: (state, action) => {
      state.search = action.payload;
    },
    setSort: (state, action) => {
      state.sort = action.payload;
    },
  },
});

export const { selectProduct, setFilter, setSearch, setSort } =
  productsSlice.actions;

export const selectFilteredProducts = (state) => {
  const { items, filter, search, sort } = state.products;
  let list = [...items];

  if (filter !== "all") {
    list = list.filter((p) => p.family.toLowerCase() === filter.toLowerCase());
  }

  if (search.trim()) {
    const q = search.toLowerCase();
    list = list.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.family.toLowerCase().includes(q) ||
        p.notes.some((n) => n.toLowerCase().includes(q))
    );
  }

  if (sort === "price-low") list.sort((a, b) => a.price - b.price);
  if (sort === "price-high") list.sort((a, b) => b.price - a.price);
  if (sort === "rating") list.sort((a, b) => b.rating - a.rating);
  if (sort === "name") list.sort((a, b) => a.name.localeCompare(b.name));

  return list;
};

export const selectProductById = (state, id) =>
  state.products.items.find((p) => p.id === id);

export default productsSlice.reducer;