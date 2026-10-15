import React from "react";
import { NavLink, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectCartCount } from "../features/cart/cartSlice";
import { toggleMenu, closeMenu } from "../features/ui/uiSlice";

export default function Navbar() {
  const dispatch = useDispatch();
  const count = useSelector(selectCartCount);
  const menuOpen = useSelector((s) => s.ui.menuOpen);

  const links = [
    { to: "/", label: "Home" },
    { to: "/shop", label: "Shop" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <nav className="navbar">
      <div className="nav-inner">
        <Link to="/" className="brand" onClick={() => dispatch(closeMenu())}>
          <span className="brand-mark">🌸</span> Shabbie
        </Link>

        <div className={`nav-links ${menuOpen ? "open" : ""}`}>
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}
              onClick={() => dispatch(closeMenu())}
            >
              {l.label}
            </NavLink>
          ))}
        </div>

        <div className="nav-right">
          <Link to="/cart" className="cart-link" onClick={() => dispatch(closeMenu())}>
            🛒 <span className="cart-count">{count}</span>
          </Link>
          <button className="menu-btn" onClick={() => dispatch(toggleMenu())} aria-label="Menu">
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>
    </nav>
  );
}