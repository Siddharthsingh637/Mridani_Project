import React, { useState } from "react";
import { motion } from "framer-motion";
import model from "../../assets/Contact/con1.webp";
import product1 from "../../assets/Contact/slide1.webp"; 
import product2 from  "../../assets/Contact/slide2.webp"; 
import product3 from "../../assets/Contact/slide3.webp";
const products = [
  {
    id: 1,
    name: "Hand-embroidered Hand-painted Murshidabad Silk Saree",
    price: "₹ 23,750.00",
    image: product1,
  },
  {
    id: 2,
    name: "Hand-Painted Madhubani Mayur Saree",
    price: "₹ 4,299.00",
    image: product2,
  },
  {
    id: 3,
    name: "Madhubani on Murshidabad Silk Saree",
    price: "₹ 6,150.00",
    image: product3,
  },
];

const GetInfo = () => {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((current - 1 + products.length) % products.length);
  const next = () => setCurrent((current + 1) % products.length);

  return (
<div className="w-full bg-white py-20 px-6 md:px-12 flex flex-col md:flex-row items-start justify-between gap-8 min-h-[700px]">
  {/* Left Column */}
  <div className="w-full md:w-[45%] space-y-8 h-full flex flex-col justify-start">
    {/* Header */}
    <motion.div
      initial={{ opacity: 0, x: -40 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
    >
      <p className="text-sm font-semibold text-red-600 tracking-widest text-center uppercase mb-2">
        Mridani
      </p>
      <h1 className="text-4xl md:text-5xl text-gray-800 text-center leading-tight mb-4">
        Get in Touch with Us
      </h1>
      <p className="text-base md:text-lg text-gray-600 leading-relaxed">
        Whether you have a question about our products, your order, or want to share your thoughts — we’d love to hear from you.
      </p>
    </motion.div>

    {/* Product Slider */}
    <motion.div
      className="relative w-full mt-4"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="overflow-hidden">
        <img
          src={products[current].image}
          alt={products[current].name}
          className="w-full object-cover h-[700px]"
        />
        <div className="p-4 text-center">
          <h2 className="text-4xl font-thin text-gray-800">
            {products[current].name}
          </h2>
          <p className="text-gray-700 text-md mt-2">{products[current].price}</p>
        </div>
      </div>

      {/* Controls */}
      <button
        onClick={prev}
        className="absolute top-1/2 left-[-2rem] transform -translate-y-1/2 bg-white shadow-md w-12 h-12 rounded-full flex items-center justify-center text-xl hover:bg-gray-100"
      >
        ᐸ
      </button>
      <button
        onClick={next}
        className="absolute top-1/2 right-[-2rem] transform -translate-y-1/2 bg-white shadow-md w-12 h-12 rounded-full flex items-center justify-center text-xl hover:bg-gray-100"
      >
        ᐳ
      </button>
    </motion.div>
  </div>

  {/* Right Image */}
  <motion.div
    className="w-full md:w-[55%] flex justify-center"
    initial={{ opacity: 0, x: 40 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.8 }}
  >
    <img
      src={model}
      alt="Traditional model"
      loading="lazy"
      className="w-full h-[1100px] object-cover shadow-2xl"
    />
  </motion.div>
</div>


  );
};

export default GetInfo;
