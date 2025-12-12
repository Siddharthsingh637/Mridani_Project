import React, { useEffect, useState } from "react";
import {
  Heart,
  ChevronDown,
  ChevronUp,
  Lock,
  CheckCircle,
} from "lucide-react";
import {
  addCart,
  getCart,
  deleteCart,
} from "../../Service/API/Cart";
import {
  addWishlist,
  getWishlist,
  deleteWishlist,
} from "../../Service/API/Wishlist";
import { useNavigate } from "react-router-dom";
import { useNotification } from "../../Components/NotificationBar"; // adjust path if needed


const ProductInfo = ({ title, price, description, productId, image_field }) => {
  const { showNotification } = useNotification();
  const [quantity, setQuantity] = useState(1);
  const [isInCart, setIsInCart] = useState(false);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [showDescription, setShowDescription] = useState(false);
  const [showShipping, setShowShipping] = useState(false);
  const [showCare, setShowCare] = useState(false);

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
      const exists = cartItems.some(item => item.product.id === productId);
      setIsInCart(exists);
    } catch (err) {
      console.error("Error checking cart:", err);
    }
  };

  const checkWishlistStatus = async () => {
    try {
      const wishlistItems = await getWishlist(token);
      const exists = wishlistItems.some(item => item.product_detail.id === productId);
      setIsInWishlist(exists);
    } catch (err) {
      console.error("Error checking wishlist:", err);
    }
  };

  const handleCartToggle = async () => {
    if (!token) {
      showNotification("Please login to manage cart!");
      navigate("/login");
      return;
    }
    try {
      const cartItems = await getCart(token);
      const cartItem = cartItems.find(item => item.product.id === productId);

      if (isInCart && cartItem) {
        await deleteCart(cartItem.id, token);
        setIsInCart(false);
        showNotification("Removed from cart.");
      } else {
        await addCart({ product: productId, quantity }, token);
        setIsInCart(true);
        showNotification("Added to cart!");
      }
    } catch (err) {
      console.error("Cart action error:", err);
      showNotification("Cart action failed.");
    }
  };

  const handleWishlistToggle = async () => {
    if (!token) {
      showNotification("Please login to manage wishlist!");
      navigate("/login");
      return;
    }
    try {
      const wishlistItems = await getWishlist(token);
      const wishlistItem = wishlistItems.find(item => item.product_detail.id === productId);

      if (isInWishlist && wishlistItem) {
        await deleteWishlist(wishlistItem.id, token);
        setIsInWishlist(false);
        showNotification("Removed from wishlist.");
      } else {
        await addWishlist({ product: productId }, token);
        setIsInWishlist(true);
        showNotification("Added to wishlist!");
      }
    } catch (err) {
      console.error("Wishlist action error:", err);
      showNotification("Wishlist action failed.");
    }
  };

  return (
    <div className="max-w-4xl h-[800px] overflow-y-auto p-6 space-y-8 text-gray-800 rounded-md relative">
      {/* Title */}
      <h1 className="text-4xl font-normal text-gray-900">{title}</h1>

      {/* Price */}
      <p className="text-3xl font-semibold text-gray-900">₹{price}</p>

      {/* Buttons */}
      <div className="flex flex-wrap gap-4 pt-2">
        <button
          onClick={handleCartToggle}
          className={`px-8 py-4 ${isInCart ? 'bg-gray-300 text-black' : 'bg-red-700 text-white'} text-lg font-semibold rounded-md hover:bg-red-800 transition`}
        >
          {isInCart ? "Remove from Cart" : "Add to Cart"}
        </button>

        <button
          onClick={handleWishlistToggle}
          className={`px-8 py-4 border text-lg font-semibold rounded-md transition flex items-center gap-3 ${isInWishlist
            ? 'border-gray-400 text-black hover:bg-gray-200'
            : 'border-red-800 text-red-600 hover:bg-red-700 hover:text-white'
            }`}
        >
          <Heart size={22} />
          {isInWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
        </button>
      </div>

      {/* Description Sections */}
      <div className="border-t pt-6 space-y-6">
        {/* Product Description */}
        <div>
          <button
            onClick={() => setShowDescription(!showDescription)}
            className="flex items-center justify-between w-full text-left text-lg font-semibold"
          >
            Product Description {showDescription ? <ChevronUp /> : <ChevronDown />}
          </button>
          {showDescription && (
            <p className="text-base text-gray-700 mt-3 whitespace-pre-line leading-relaxed">
              {description}
            </p>
          )}
        </div>

        {/* Shipping Info */}
        <div>
          <button
            onClick={() => setShowShipping(!showShipping)}
            className="flex items-center justify-between w-full text-left text-lg font-semibold"
          >
            Shipping Info {showShipping ? <ChevronUp /> : <ChevronDown />}
          </button>
          {showShipping && (
            <p className="text-base text-gray-700 mt-3 leading-relaxed">
              We offer standard and express delivery. Delivery times vary based on location.
            </p>
          )}
        </div>

        {/* Care Guide */}
        <div>
          <button
            onClick={() => setShowCare(!showCare)}
            className="flex items-center justify-between w-full text-left text-lg font-semibold"
          >
            Care Guide {showCare ? <ChevronUp /> : <ChevronDown />}
          </button>
          {showCare && (
            <p className="text-base text-gray-700 mt-3 leading-relaxed">
              Hand wash separately in cold water. Do not bleach. Dry in shade.
            </p>
          )}
        </div>
      </div>

      {/* Info Section */}
      <div className="pt-6 border-t text-base space-y-3">
        <p className="flex items-center gap-2 text-green-700 font-medium">
          <Lock size={18} /> Secure Payment
        </p>
        <p className="flex items-center gap-2 text-green-700 font-medium">
          <CheckCircle size={18} /> Guarantee safe checkout.
        </p>
        <p className="text-gray-700">
          Spend <span className="font-semibold text-gray-900">₹1,000.00</span> for{" "}
          <span className="text-pink-600 font-semibold">Free Shipping</span>.
        </p>
      </div>

      {/* Quantity & Buy Now */}
      <div className="flex items-center gap-6 pt-6 border-t">
        <div className="flex items-center gap-3">
          <span className="text-lg font-semibold">Quantity:</span>
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
            className="w-20 px-3 py-2 border rounded-md text-center text-lg"
          />
        </div>
        <button
          className="flex-1 px-8 py-4 bg-red-800 text-white text-lg font-semibold rounded-md hover:bg-red-700 transition"
          onClick={() =>
            navigate("/buynow", {
              state: {
                products: [
                  {
                    id: productId,
                    name: title,
                    variant: "",
                    price,
                    quantity,
                    image_field: image_field?.[0] || "/placeholder.jpg",
                  },
                ],
              },
            })
          }
        >
          Buy Now
        </button>
      </div>

      
    </div>
  );
};

export default ProductInfo;
