import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div>
          <h3 className="footer-brand"> Shabbie</h3>
          <p className="footer-tag">Luxury fragrances, crafted for the senses.</p>
        </div>
        <div>
          <h4>Shop</h4>
          <ul>
            <li><Link to="/shop">All Perfumes</Link></li>
            <li><Link to="/shop">New Arrivals</Link></li>
            <li><Link to="/shop">Best Sellers</Link></li>
          </ul>
        </div>
        <div>
          <h4>Company</h4>
          <ul>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/cart">Cart</Link></li>
          </ul>
        </div>
        <div>
          <h4>Contact</h4>
          <ul>
            <li> hello@shabbie.com</li>
            <li> +234 800 000 0000</li>
            <li> Lagos, Nigeria</li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        © {new Date().getFullYear()} Shabbie. All rights reserved.
      </div>
    </footer>
  );
}