import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const StickyCartMob = ({ product }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed bottom-0 left-0 right-0 bg-[#222] text-white flex flex-wrap items-center justify-between px-4 py-3 z-50 gap-3 sm:gap-0"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          {/* Close / Remove button */}
          <button className="rounded-full bg-gray-600 w-8 h-8 flex items-center justify-center text-lg sm:mr-4">
            ×
          </button>

          {/* Product Image and Title */}
          <div className="flex items-center flex-1 min-w-0">
            <img
              src={product.image_field?.[0]}
              alt={product.product_title}
              className="w-10 h-10 object-contain mr-3"
            />
            <div className="text-sm font-medium text-ellipsis line-clamp-1 whitespace-nowrap overflow-hidden">
              {product.product_title}
            </div>
          </div>

          {/* Price */}
          <div className="text-sm font-semibold whitespace-nowrap px-2">
            ₹{Number(product.price).toLocaleString()}
          </div>

          {/* Add to Cart */}
          <button className="bg-white text-black text-xs font-bold px-4 py-2 rounded-full hover:bg-gray-200 transition">
            ADD TO CART
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default StickyCartMob;
