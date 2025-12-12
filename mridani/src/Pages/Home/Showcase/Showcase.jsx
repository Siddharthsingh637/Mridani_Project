import React from "react";
// import imgLeft from "../../../assets/Home/show2.webp";
import imgRight from "../../../assets/Home/show1.webp";

const Showcase = () => {
  return (
    <section className=" flex flex-col lg:flex-row w-full
    bg-white">
      {/* Left Block: Text + Image */}
      <div className="lg:w-1/2 flex flex-col justify-center px-6 lg:px-16 py-10">
        <div className="max-w-md">
          <p className="text-sm uppercase font-semibold tracking-widest text-red-600 mb-2">
            Mridani: Where Tradition Meets Runway
          </p>
          <h1 className="text-3xl md:text-4xl font-semibold mb-4 leading-snug">
            Showcasing The Elegance Of Indian Heritage On Every Stage
            Elegance
          </h1>
          <p className="text-gray-600 mb-4 text-sm md:text-base">
            Each collection brings together timeless artistry and modern elegance, from Madhubani-inspired sarees to intricate embroidered pieces, presenting India's heritage in style.
          </p>
          <button className="bg-white text-black border border-black px-5 py-3 rounded-4xl text-sm uppercase tracking-wide hover:bg-black hover:text-white transition">
            Discover Now
          </button>
        </div>

        <img
          src="https://ik.imagekit.io/siddharth637/outer_asset/tinified/home3.jpg?updatedAt=1751535656296"
          loading="lazy"
          alt="Traditional Wear Left"
          className="mt-10 w-full shadow-lg object-cover"
        />
      </div>

      {/* Right Image */}
      <div className="lg:w-1/2 flex items-center justify-center mr-4">
        <img
          src={imgRight}
          alt="Runway Fashion"
          loading="lazy"
          className="w-full h-[1242px] object-cover shadow-md"
        />
      </div>
    </section>
  );
};

export default Showcase;
