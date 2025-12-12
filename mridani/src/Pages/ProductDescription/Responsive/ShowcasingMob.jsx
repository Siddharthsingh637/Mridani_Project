import React from "react";
import Img from "../../assets/Home/grid.webp";

const ShowcasingMob = () => {
  return (
    <div className="w-full bg-white py-10 px-4 flex flex-col items-center gap-8 text-center">
      {/* Text Content First */}
      <div className="w-full max-w-2xl">
        <p className="text-xs text-rose-500 font-semibold tracking-widest uppercase mb-2">
          Mridani: Where Tradition Meets Runway
        </p>
        <h2 className="text-2xl sm:text-3xl font-semibold mb-4 leading-snug">
          Showcasing The Elegance Of Indian Heritage On Every Stage
        </h2>
        <p className="text-gray-600 text-base leading-relaxed mb-6">
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

      {/* Image Below */}
      <div className="w-full max-w-3xl">
        <img
          src={Img}
          alt="Showcasing Sarees"
          className="w-full h-auto object-cover rounded-md shadow"
        />
      </div>
    </div>
  );
};

export default ShowcasingMob;
