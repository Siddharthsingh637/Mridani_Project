import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { addWishlist, getWishlist, deleteWishlist } from "../../Service/API/Wishlist";
import { useNotification } from '../../Components/NotificationBar';

const PriceCard = ({ product }) => {
  const [isInWishlist, setIsInWishlist] = useState(false);
  const token = sessionStorage.getItem("authToken");
  const { showNotification } = useNotification();

  useEffect(() => {
    if (token) {
      checkWishlist();
    }
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

  const handleWishlistToggle = async () => {
    try {
      if (!token) {
        showNotification("Please login to add items to wishlist!");
        return;
      }

      if (isInWishlist) {
        const data = await getWishlist(token);
        const wishlistItem = data.find(item => item.product_detail.id === product.id);
        if (wishlistItem) {
          await deleteWishlist(wishlistItem.id, token);
          setIsInWishlist(false);
        }
      } else {
        await addWishlist({ product: product.id }, token);
        setIsInWishlist(true);
      }
    } catch (err) {
      console.error("Error toggling wishlist:", err);
    }
  };

  return (
    <div className="w-[300px] bg-white shadow-md hover:shadow-lg transition duration-300 overflow-hidden">
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative h-[340px] bg-white flex items-center justify-center overflow-hidden group">

          {/* First image */}
          <img
            src={product.image_field?.[0]}
            alt={product.product_title}
            className="max-h-full max-w-full object-contain transition-opacity duration-300 group-hover:opacity-0 absolute"
          />

          {/* Second image on hover */}
          {product.image_field?.[1] && (
            <img
              src={product.image_field[1]}
              alt={product.product_title}
              className="max-h-full max-w-full object-contain transition-opacity duration-300 opacity-0 group-hover:opacity-100"
            />
          )}

          {/* Wishlist button */}
          <button
            onClick={(e) => {
              e.preventDefault();
              handleWishlistToggle();
            }}
            className={`absolute top-3 right-3 bg-white/80 backdrop-blur-md rounded-full p-1 transition-all ${isInWishlist ? "bg-pink-0" : "border-gray-300"}`}
          >
            <Heart
              className={`w-5 h-5 transition-all ${isInWishlist ? "text-red-600 fill-red-600" : "text-gray-800 hover:text-red-500"}`}
            />
          </button>

          {/* ✅ Trending badge */}
          {product.trending && (
            <div className="absolute bottom-2 right-2 z-10 bg-yellow-500 text-white text-[10px] font-semibold px-2 py-1 rounded-full">
              TRENDING
            </div>
          )}
        </div>

        <div className="p-4 flex flex-col items-center text-center">
          <div className="text-[10px] font-semibold uppercase tracking-wider bg-gray-100 px-2 py-1 rounded-2xl text-gray-600 mb-2">
            Mridani
          </div>
          <h3 className="text-sm font-medium text-gray-900 line-clamp-2">{product.product_title}</h3>
          <div className="flex pt-4 items-center justify-center gap-2 text-sm mb-1 text-gray-800">
            <span className="text-lg">₹{product.price}</span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default PriceCard;
