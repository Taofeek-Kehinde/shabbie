import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import PerfumeImage from "./PerfumeImage";
import { addToCart } from "../features/cart/cartSlice";
import { showToast } from "../features/ui/uiSlice";

export default function PerfumeCard({ perfume }) {
  const dispatch = useDispatch();

  const handleAdd = (e) => {
    e.preventDefault();
    if (!perfume.available) return;
    dispatch(addToCart({ id: perfume.id }));
    dispatch(showToast(`Added ${perfume.name} to cart`));
  };

  return (
    <Link to={`/product/${perfume.id}`} className="card">
      <div className="card-img">
        <PerfumeImage perfume={perfume} size={200} />
        {!perfume.available && <span className="badge out">Out of Stock</span>}
        {perfume.available && perfume.stock < 10 && (
          <span className="badge low">Only {perfume.stock} left</span>
        )}
      </div>
      <div className="card-body">
        <div className="card-top">
          <h3>{perfume.name}</h3>
          <span className="family">{perfume.family}</span>
        </div>
        <div className="rating">
          ⭐ {perfume.rating.toFixed(1)}{" "}
          <span className="reviews">({perfume.reviews})</span>
        </div>
        <div className="card-bottom">
          <span className="price">${perfume.price}</span>
          <button
            className="btn-add"
            onClick={handleAdd}
            disabled={!perfume.available}
          >
            {perfume.available ? "Add" : "Sold"}
          </button>
        </div>
      </div>
    </Link>
  );
}