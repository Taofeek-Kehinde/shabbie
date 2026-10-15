import React from "react";

export default function About() {
  return (
    <div className="page about">
      <h1>About Shabbie</h1>
      <p className="lead">
        Shabbie is a modern fragrance house built on a simple belief — that scent is memory,
        and memory is worth crafting carefully.
      </p>

      <div className="about-grid">
        <div className="about-card">
          <h3>🌿 Crafted Ingredients</h3>
          <p>
            We source raw materials from small growers in Grasse, Mysore and Madagascar —
            ethical, sustainable, and extraordinary.
          </p>
        </div>
        <div className="about-card">
          <h3>💎 Luxury, Accessible</h3>
          <p>
            Premium perfume doesn't need to be priced out of reach. Shabbie keeps the quality
            high and the margins honest.
          </p>
        </div>
        <div className="about-card">
          <h3>🌍 Made with Care</h3>
          <p>
            Cruelty-free, vegan-friendly formulas. Recyclable glass and packaging. Every bottle
            is a small act of respect for the planet.
          </p>
        </div>
        <div className="about-card">
          <h3>✨ 20 Signatures</h3>
          <p>
            From smoky oud to citrus dawn — each of our 20 perfumes tells a story you can wear.
          </p>
        </div>
      </div>
    </div>
  );
}