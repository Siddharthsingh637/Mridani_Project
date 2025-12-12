import React from "react";
import Img from '../../assets/Home/grid.webp'

const Showcasing = () => {
  return (
    <div className="w-full bg-white py-12 px-4 md:px-16 flex flex-col md:flex-row items-center gap-8">
      {/* Left Image */}
      <div className="w-full md:w-1/2">
        <img
          src={Img} // or "/src/assets/grid.webp" if you're importing
          alt="Showcasing Sarees"
          className="w-full h-auto object-cover"
        />
      </div>

      {/* Right Text Content */}
      <div className="w-full md:w-1/2">
        <p className="text-sm text-rose-500 font-semibold tracking-widest uppercase mb-2">
          Mridani: Where Tradition Meets Runway
        </p>
        <h2 className="text-2xl md:text-4xl font-normal mb-4 leading-snug">
          Showcasing The Elegance Of Indian Heritage On Every Stage
        </h2>
        <p className="text-gray-600 text-lg leading-relaxed mb-6">
          Mridani celebrates the grace of Indian culture through exquisite,
          handcrafted fashion showcased on prestigious runways. Each collection
          brings together timeless artistry and modern elegance, from
          Madhubani-inspired sarees to intricate embroidered pieces, presenting
          India’s heritage in style.
        </p>
        <button className="px-6 py-3 border border-black rounded-full font-medium hover:bg-black hover:text-white transition-all">
          DISCOVER NOW
        </button>
      </div>
    </div>
  );
};

export default Showcasing;
