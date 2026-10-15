import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  selectCartDetailed,
  selectCartTotal,
  removeFromCart,
  updateQty,
  clearCart,
} from "../features/cart/cartSlice";
import { showToast } from "../features/ui/uiSlice";
import PerfumeImage from "../components/PerfumeImage";

export default function Cart() {
  const dispatch = useDispatch();
  const items = useSelector(selectCartDetailed);
  const total = useSelector(selectCartTotal);

  const checkout = () => {
    if (!items.length) return;
    dispatch(showToast("Order placed! We'll contact you shortly."));
    dispatch(clearCart());
  };

  return (
    <div className="page">
      <header className="page-head">
        <h1>Your Cart</h1>
        <p>{items.length} item{items.length !== 1 ? "s" : ""}</p>
      </header>

      {items.length === 0 ? (
        <div className="empty-cart">
          <p>Your cart is empty.</p>
          <Link to="/shop" className="btn-primary">Shop Perfumes</Link>
        </div>
      ) : (
        <div className="cart-layout">
          <div className="cart-items">
            {items.map((item) => (
              <div className="cart-item" key={item.id}>
                <div className="cart-img">
                  <PerfumeImage perfume={item} size={110} />
                </div>
                <div className="cart-info">
                  <h3>{item.name}</h3>
                  <p className="cart-family">{item.family} · {item.size}</p>
                  <p className="cart-price">${item.price}</p>
                </div>
                <div className="cart-controls">
                  <div className="qty">
                    <button onClick={() => dispatch(updateQty({ id: item.id, qty: item.qty - 1 }))}>−</button>
                    <span>{item.qty}</span>
                    <button onClick={() => dispatch(updateQty({ id: item.id, qty: item.qty + 1 }))}>+</button>
                  </div>
                  <p className="subtotal">${item.subtotal}</p>
                  <button
                    className="btn-remove"
                    onClick={() => dispatch(removeFromCart(item.id))}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <aside className="cart-summary">
            <h3>Order Summary</h3>
            <div className="sum-row"><span>Subtotal</span><span>${total}</span></div>
            <div className="sum-row"><span>Shipping</span><span>Free</span></div>
            <div className="sum-row total"><span>Total</span><span>${total}</span></div>
            <button className="btn-primary full" onClick={checkout}>
              Place Order
            </button>
            <button
              className="btn-ghost full"
              onClick={() => dispatch(clearCart())}
            >
              Clear Cart
            </button>
          </aside>
        </div>
      )}
    </div>
  );
}