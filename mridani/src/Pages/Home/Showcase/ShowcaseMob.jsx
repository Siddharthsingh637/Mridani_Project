import React from "react";
import imgLeft from "../../../assets/Home/show2.webp";
import imgRight from "../../../assets/Home/show1.webp";

const ShowcaseMob = () => {
  return (
    <section className="w-full flex flex-col gap-6 px-4 py-6 bg-white sm:flex-row sm:items-end sm:justify-between">
      {/* Left Section: Text and Image */}
      <div className="flex flex-col items-center sm:items-start sm:w-1/2">
        {/* Text Block */}
        <div className="max-w-md mb-4 text-center sm:text-left">
          <p className="text-sm uppercase font-semibold tracking-widest text-red-600 mb-2">
            Mridani: Where Tradition Meets Runway
          </p>
          <h1 className="text-3xl md:text-4xl font-semibold mb-4 leading-snug">
            Showcasing The Elegance Of Indian Heritage On Every Stage Elegance
          </h1>
          <p className="text-gray-600 mb-4 text-sm md:text-base">
            Each collection brings together timeless artistry and modern elegance, from Madhubani-inspired sarees to intricate embroidered pieces, presenting India's heritage in style.
          </p>
          <button className="bg-white text-black border border-black px-5 py-3 rounded-4xl text-sm uppercase tracking-wide hover:bg-black hover:text-white transition">
            Discover Now
          </button>
        </div>

        {/* Image Below Text */}
        <img
          src={imgLeft}
          alt="Traditional Wear"
          loading="lazy"
          className="w-full max-w-sm object-cover shadow-md"
        />
      </div>

      {/* Right Image */}
      <div className="sm:w-1/2 flex justify-end">
        <img
          src={imgRight}
          loading="lazy"
          alt="Runway Fashion"
          className="w-full max-w-sm object-cover shadow-md sm:h-full sm:object-bottom"
        />
      </div>
    </section>
  );
};

export default ShowcaseMob;
