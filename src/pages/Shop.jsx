import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectFilteredProducts,
  setFilter,
  setSearch,
  setSort,
} from "../features/products/productsSlice";
import PerfumeCard from "../components/PerfumeCard";

export default function Shop() {
  const dispatch = useDispatch();
  const products = useSelector(selectFilteredProducts);
  const { filter, search, sort } = useSelector((s) => s.products);

  const families = ["all", "Floral", "Woody", "Oriental", "Fresh", "Spicy"];

  return (
    <div className="page">
      <header className="page-head">
        <h1>Shop Perfumes</h1>
        <p>{products.length} fragrance{products.length !== 1 ? "s" : ""} available</p>
      </header>

      <div className="filters">
        <input
          type="text"
          placeholder="🔍 Search by name, family or note..."
          value={search}
          onChange={(e) => dispatch(setSearch(e.target.value))}
          className="search"
        />

        <div className="family-tabs">
          {families.map((f) => (
            <button
              key={f}
              className={"tab" + (filter === f ? " active" : "")}
              onClick={() => dispatch(setFilter(f))}
            >
              {f === "all" ? "All" : f}
            </button>
          ))}
        </div>

        <select
          value={sort}
          onChange={(e) => dispatch(setSort(e.target.value))}
          className="sort"
        >
          <option value="default">Sort: Featured</option>
          <option value="price-low">Price: Low → High</option>
          <option value="price-high">Price: High → Low</option>
          <option value="rating">Top Rated</option>
          <option value="name">Name: A → Z</option>
        </select>
      </div>

      {products.length === 0 ? (
        <p className="empty">No perfumes match your search.</p>
      ) : (
        <div className="grid">
          {products.map((p) => (
            <PerfumeCard key={p.id} perfume={p} />
          ))}
        </div>
      )}
    </div>
  );
}