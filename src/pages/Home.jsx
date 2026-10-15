import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import HeroSwiper from "../components/Swiper";
import PerfumeCard from "../components/PerfumeCard";

export default function Home() {
  const perfumes = useSelector((s) => s.products.items);
  const featured = perfumes.slice(0, 8);

  return (
    <div className="page home">
      <section className="hero">
        <div className="hero-content">
          <p className="eyebrow">Luxury Fragrance House</p>
          <h1>
            Scent Your <span className="accent">Signature</span> Moment
          </h1>
          <p className="hero-sub">
            20 hand-crafted perfumes. Explore, experience in 3D, and order your favorites.
          </p>
          <div className="hero-actions">
            <Link to="/shop" className="btn-primary">Shop Collection</Link>
            <Link to="/about" className="btn-ghost">Our Story</Link>
          </div>
        </div>
        <div className="hero-glow" />
      </section>

      <section className="section">
        <header className="section-head">
          <h2>Featured</h2>
          <Link to="/shop" className="link-more">View all →</Link>
        </header>
        <HeroSwiper />
      </section>

      <section className="section">
        <header className="section-head">
          <h2>Trending Now</h2>
          <Link to="/shop" className="link-more">Browse shop →</Link>
        </header>
        <div className="grid">
          {featured.map((p) => (
            <PerfumeCard key={p.id} perfume={p} />
          ))}
        </div>
      </section>
    </div>
  );
}