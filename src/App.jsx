import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PerfumeLoader from "./components/PerfumeLoader";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import About from "./pages/About";
import Contact from "./pages/Contact";

export default function App() {
  const [introDone, setIntroDone] = useState(false);

  // Optional: skip loader on subsequent visits in the same session
  // const [introDone, setIntroDone] = useState(
  //   () => sessionStorage.getItem("shabbie_intro_shown") === "1"
  // );

  return (
    <>
      {!introDone && (
        <PerfumeLoader
          duration={7500}
          onFinish={() => {
            setIntroDone(true);
            // sessionStorage.setItem("shabbie_intro_shown", "1");
          }}
        />
      )}

      <div
        style={{
          opacity: introDone ? 1 : 0,
          visibility: introDone ? "visible" : "hidden",
          transition: "opacity 0.8s ease, visibility 0.8s ease",
        }}
      >
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </>
  );
}