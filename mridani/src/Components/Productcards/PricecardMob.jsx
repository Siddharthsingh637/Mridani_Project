// src/components/Productcards/PriceCardMob.jsx

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import {
  addWishlist,
  getWishlist,
  deleteWishlist,
} from "../../Service/API/Wishlist";
import { useNotification } from "../../Components/NotificationBar";

const PriceCardMob = ({ product }) => {
  const [isInWishlist, setIsInWishlist] = useState(false);
  const token = sessionStorage.getItem("authToken");
  const { showNotification } = useNotification();

  useEffect(() => {
    if (token) checkWishlist();
  }, [product.id, token]);

  const checkWishlist = async () => {
    try {
      const data = await getWishlist(token);
      const exists = data.some(item => item.product_detail.id === product.id);
      setIsInWishlist(exists);
    } catch (err) {
      console.error("Error checking wishlist:", err);
    }
  };

  const handleWishlistToggle = async (e) => {
    e.preventDefault(); // prevent <Link> navigation
    if (!token) {
      showNotification("Please login to add items to wishlist!");
      return;
    }

    try {
      if (isInWishlist) {
        const data = await getWishlist(token);
        const wishlistItem = data.find(item => item.product_detail.id === product.id);
        if (wishlistItem) {
          await deleteWishlist(wishlistItem.id, token);
          setIsInWishlist(false);
          showNotification("Removed from wishlist.");
        }
      } else {
        await addWishlist({ product: product.id }, token);
        setIsInWishlist(true);
        showNotification("Added to wishlist.");
      }
    } catch (err) {
      console.error("Error toggling wishlist:", err);
      showNotification("Something went wrong.");
    }
  };

  return (
    <Link
      to={`/product/${product.id}`}
      className="w-full bg-white shadow-md hover:shadow-lg transition duration-300 overflow-hidden"
    >
      <div className="relative h-44 bg-white flex items-center justify-center overflow-hidden group">
        <img
          src={product.image_field?.[0]}
          alt={product.product_title}
          className="max-h-full max-w-full object-contain transition-opacity duration-300 group-hover:opacity-0 absolute"
        />
        {product.image_field?.[1] && (
          <img
            src={product.image_field[1]}
            alt={product.product_title}
            className="max-h-full max-w-full object-contain transition-opacity duration-300 opacity-0 group-hover:opacity-100"
          />
        )}
        <button
          onClick={handleWishlistToggle}
          className="absolute top-2 right-2 bg-white/80 backdrop-blur-md rounded-full p-1"
        >
          <Heart
            className={`w-4 h-4 transition-all ${isInWishlist
              ? "text-red-600 fill-red-600"
              : "text-gray-800 hover:text-pink-500"
              }`}
          />
        </button>
      </div>

      <div className="p-3 flex flex-col items-center text-center">
        <div className="text-[10px] font-semibold uppercase tracking-wider bg-gray-100 px-2 py-1 rounded-2xl text-gray-600 mb-1">
          Mridani
        </div>
        <h3 className="text-xs font-medium text-gray-900 line-clamp-2">
          {product.product_title}
        </h3>
        <div className="pt-2 text-sm text-gray-800 font-semibold">
          ₹{product.price}
        </div>
      </div>
    </Link>
  );
};

export default PriceCardMob;
