import React from "react";
import heroMd from "../../../assets/Home/heroMd.jpg";

const HeroMid = () => {
  return (
    <section className="w-full h-screen mt-20 bg-cover bg-center relative flex items-center justify-center" style={{ backgroundImage: `url(${heroMd})` }}>
      <div className="absolute inset-0 bg-black opacity-40"></div>
      <div className="relative z-10 text-center text-white px-4">
        <h1 className="text-3xl sm:text-4xl font-bold mb-4">Step into Tradition with Style</h1>
        <p className="text-base sm:text-lg mb-6">Explore our curated collection of ethnic wear — elegance with every step.</p>
        <button className="bg-white text-black px-6 py-2 rounded-full font-semibold hover:bg-gray-200 transition">Shop Now</button>
      </div>
    </section>
  );
};

export default HeroMid;
