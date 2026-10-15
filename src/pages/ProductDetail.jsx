import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectProductById } from "../features/products/productsSlice";
import PerfumeImage from "../components/PerfumeImage";
import ThreeViewer from "../components/ThreeViewer";
import { addToCart } from "../features/cart/cartSlice";
import { showToast } from "../features/ui/uiSlice";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const perfume = useSelector((s) => selectProductById(s, id));
  const [tab, setTab] = useState("image");
  const [qty, setQty] = useState(1);

  if (!perfume) {
    return (
      <div className="page">
        <h1>Perfume not found</h1>
        <button className="btn-primary" onClick={() => navigate("/shop")}>
          Back to shop
        </button>
      </div>
    );
  }

  const handleAdd = () => {
    dispatch(addToCart({ id: perfume.id, qty }));
    dispatch(showToast(`Added ${qty} × ${perfume.name} to cart`));
  };

  return (
    <div className="page detail">
      <Link to="/shop" className="back">← Back to shop</Link>

      <div className="detail-grid">
        <div className="detail-visual">
          <div className="view-toggle">
            <button
              className={tab === "image" ? "active" : ""}
              onClick={() => setTab("image")}
            >
              Image
            </button>
            <button
              className={tab === "3d" ? "active" : ""}
              onClick={() => setTab("3d")}
            >
              3D View
            </button>
          </div>

          {tab === "image" ? (
            <div className="detail-image">
              <PerfumeImage perfume={perfume} size={360} />
            </div>
          ) : (
            <ThreeViewer palette={perfume.palette} />
          )}
        </div>

        <div className="detail-info">
          <span className="family-pill">{perfume.family}</span>
          <h1>{perfume.name}</h1>
          <div className="rating large">
            ⭐ {perfume.rating.toFixed(1)}{" "}
            <span className="reviews">({perfume.reviews} reviews)</span>
          </div>

          <p className="detail-desc">{perfume.description}</p>

          <div className="notes">
            <h4>Fragrance Notes</h4>
            <div className="note-chips">
              {perfume.notes.map((n) => (
                <span key={n} className="chip">{n}</span>
              ))}
            </div>
          </div>

          <div className="meta">
            <div><span>Size:</span> {perfume.size}</div>
            <div>
              <span>Availability:</span>{" "}
              {perfume.available ? (
                <span className="in-stock">In stock ({perfume.stock})</span>
              ) : (
                <span className="out-stock">Out of stock</span>
              )}
            </div>
          </div>

          <div className="buy-row">
            <span className="price big">${perfume.price}</span>
            <div className="qty">
              <button onClick={() => setQty(Math.max(1, qty - 1))}>−</button>
              <span>{qty}</span>
              <button onClick={() => setQty(qty + 1)}>+</button>
            </div>
          </div>

          <div className="detail-actions">
            <button
              className="btn-primary"
              onClick={handleAdd}
              disabled={!perfume.available}
            >
              {perfume.available ? "Add to Cart" : "Out of Stock"}
            </button>
            <Link to="/cart" className="btn-ghost">Go to Cart</Link>
          </div>
        </div>
      </div>
    </div>
  );
}