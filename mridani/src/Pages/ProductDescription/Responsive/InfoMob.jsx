import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ChevronDown,
  ChevronUp,
  Lock,
  CheckCircle,
  Heart,
} from "lucide-react";
import {
  addCart,
  deleteCart,
  getCart,
} from "../../../Service/API/Cart";
import {
  addWishlist,
  deleteWishlist,
  getWishlist,
} from "../../../Service/API/Wishlist";

const InfoMob = ({ title, price, productId, image_field }) => {
  const [quantity, setQuantity] = useState(1);
  const [showShipping, setShowShipping] = useState(false);
  const [showCare, setShowCare] = useState(false);
  const [isInCart, setIsInCart] = useState(false);
  const [isInWishlist, setIsInWishlist] = useState(false);

  const navigate = useNavigate();
  const token = sessionStorage.getItem("authToken");

  useEffect(() => {
    if (token) {
      checkCartStatus();
      checkWishlistStatus();
    }
  }, [productId, token]);

  const checkCartStatus = async () => {
    try {
      const cartItems = await getCart(token);
      const exists = cartItems.some((item) => item.product.id === productId);
      setIsInCart(exists);
    } catch (err) {
      console.error("Error checking cart:", err);
    }
  };

  const checkWishlistStatus = async () => {
    try {
      const wishlistItems = await getWishlist(token);
      const exists = wishlistItems.some(
        (item) => item.product_detail.id === productId
      );
      setIsInWishlist(exists);
    } catch (err) {
      console.error("Error checking wishlist:", err);
    }
  };

  const handleCartToggle = async () => {
    if (!token) {
      alert("Please login to manage cart!");
      navigate("/login");
      return;
    }
    try {
      const cartItems = await getCart(token);
      const cartItem = cartItems.find(
        (item) => item.product.id === productId
      );

      if (isInCart && cartItem) {
        await deleteCart(cartItem.id, token);
        setIsInCart(false);
        alert("Removed from cart.");
      } else {
        await addCart({ product: productId, quantity }, token);
        setIsInCart(true);
        alert("Added to cart!");
      }
    } catch (err) {
      console.error("Cart action error:", err);
      alert("Cart action failed.");
    }
  };

  const handleBuyNow = () => {
    navigate("/buynow", {
      state: {
        products: [
          {
            id: productId,
            name: title,
            price,
            quantity,
            image_field: image_field?.[0] || "/placeholder.jpg",
            variant: "",
          },
        ],
      },
    });
  };

  return (
    <div className="w-full px-4 py-6 space-y-6 text-gray-800">
      {/* Title */}
      <h1 className="text-2xl font-medium text-gray-900">{title}</h1>

      {/* Price */}
      <p className="text-xl font-semibold text-gray-900">₹{price}</p>

      {/* Quantity Selector */}
      <div className="flex items-center gap-3 pt-1">
        <span className="text-base font-medium">Quantity:</span>
        <input
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value))}
          className="w-20 px-2 py-1 border rounded-md text-center text-base"
        />
      </div>

      {/* Buttons */}
      <div className="flex gap-4 pt-2">
        <button
          onClick={handleCartToggle}
          className={`flex-1 px-6 py-3 text-lg font-semibold rounded-md transition ${
            isInCart
              ? "bg-gray-300 text-black hover:bg-gray-400"
              : "bg-red-700 text-white hover:bg-red-800"
          }`}
        >
          {isInCart ? "Remove from Cart" : "Add to Cart"}
        </button>
        <button
          onClick={handleBuyNow}
          className="flex-1 px-6 py-3 bg-red-800 text-white text-lg font-semibold rounded-md hover:bg-red-700 transition"
        >
          Buy Now
        </button>
      </div>

      {/* Wishlist Button */}
      <button
        onClick={async () => {
          if (!token) {
            alert("Please login to manage wishlist!");
            navigate("/login");
            return;
          }

          try {
            const wishlistItems = await getWishlist(token);
            const wishlistItem = wishlistItems.find(
              (item) => item.product_detail.id === productId
            );

            if (isInWishlist && wishlistItem) {
              await deleteWishlist(wishlistItem.id, token);
              setIsInWishlist(false);
              alert("Removed from wishlist.");
            } else {
              await addWishlist({ product: productId }, token);
              setIsInWishlist(true);
              alert("Added to wishlist!");
            }
          } catch (err) {
            console.error("Wishlist action error:", err);
            alert("Wishlist action failed.");
          }
        }}
        className={`w-full flex justify-center items-center gap-2 text-base font-semibold py-3 border rounded-md ${
          isInWishlist
            ? "border-gray-400 text-black hover:bg-gray-200"
            : "border-red-800 text-red-600 hover:bg-red-700 hover:text-white"
        }`}
      >
        <Heart size={18} />
        {isInWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
      </button>

      {/* Info Section */}
      <div className="pt-4 border-t space-y-2 text-sm">
        <p className="flex items-center gap-2 text-green-700 font-medium">
          <Lock size={16} /> Secure Payment
        </p>
        <p className="flex items-center gap-2 text-green-700 font-medium">
          <CheckCircle size={16} /> Guarantee safe checkout.
        </p>
        <p className="text-gray-700">
          Spend <span className="font-semibold text-gray-900">₹1,000.00</span> for{" "}
          <span className="text-pink-600 font-semibold">Free Shipping</span>.
        </p>
      </div>

      {/* Description Dropdowns */}
      <div className="border-t pt-4 space-y-4">
        <div>
          <button
            onClick={() => setShowShipping(!showShipping)}
            className="flex items-center justify-between w-full text-left text-base font-semibold"
          >
            Shipping Info {showShipping ? <ChevronUp /> : <ChevronDown />}
          </button>
          {showShipping && (
            <p className="text-sm text-gray-700 mt-2 leading-relaxed">
              We offer standard and express delivery. Delivery times vary based on location.
            </p>
          )}
        </div>

        <div>
          <button
            onClick={() => setShowCare(!showCare)}
            className="flex items-center justify-between w-full text-left text-base font-semibold"
          >
            Care Guide {showCare ? <ChevronUp /> : <ChevronDown />}
          </button>
          {showCare && (
            <p className="text-sm text-gray-700 mt-2 leading-relaxed">
              Hand wash separately in cold water. Do not bleach. Dry in shade.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default InfoMob;
