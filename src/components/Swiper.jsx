import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectCoverflow } from "swiper/modules";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import PerfumeImage from "./PerfumeImage";
import { addToCart } from "../features/cart/cartSlice";
import { showToast } from "../features/ui/uiSlice";

export default function HeroSwiper() {
  const perfumes = useSelector((s) => s.products.items).slice(0, 10);
  const dispatch = useDispatch();

  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay, EffectCoverflow]}
      effect="coverflow"
      grabCursor
      centeredSlides
      slidesPerView={1.2}
      breakpoints={{
        640: { slidesPerView: 2.2 },
        900: { slidesPerView: 3.2 },
        1200: { slidesPerView: 4 },
      }}
      coverflowEffect={{ rotate: 20, stretch: 0, depth: 100, modifier: 1, slideShadows: false }}
      autoplay={{ delay: 2800, disableOnInteraction: false }}
      pagination={{ clickable: true }}
      navigation
      loop
      className="hero-swiper"
    >
      {perfumes.map((p) => (
        <SwiperSlide key={p.id}>
          <div className="slide-card">
            <Link to={`/product/${p.id}`}>
              <PerfumeImage perfume={p} size={220} />
            </Link>
            <h3>{p.name}</h3>
            <p className="slide-family">{p.family} · {p.size}</p>
            <div className="slide-bottom">
              <span className="slide-price">${p.price}</span>
              <button
                className="btn-primary small"
                onClick={() => {
                  if (!p.available) return;
                  dispatch(addToCart({ id: p.id }));
                  dispatch(showToast(`Added ${p.name} to cart`));
                }}
                disabled={!p.available}
              >
                {p.available ? "Add to Cart" : "Sold Out"}
              </button>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}