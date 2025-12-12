import { Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

const WishlistCard = ({ product, onRemove }) => {
  const productData = product.product_detail || {};
  const productId = productData.id;

  return (
    <div className="w-full sm:w-[32%] bg-white shadow-sm hover:shadow-md transition p-8 flex gap-4 items-start">
      {/* Wrap image and details in Link */}
      <Link
        to={`/product/${productId}`}
        className="flex gap-4 items-start flex-grow"
      >
        {/* Product Image */}
        <div className="w-24 h-24 flex-shrink-0 flex items-center justify-center">
          <img
            src={productData.image_field?.[0]}
            alt={productData.product_title || "Product Image"}
            className="max-h-full max-w-full object-contain"
          />
        </div>

        {/* Product Info */}
        <div className="flex flex-col justify-between">
          <h3 className="text-sm font-medium text-gray-900 line-clamp-2">
            {productData.product_title || "Untitled Product"}
          </h3>
          <div className="mt-2 text-lg font-semibold text-gray-900">
            ₹{productData.price || 0}
          </div>
        </div>
      </Link>

      {/* Remove Button */}
      <div className="mt-1 ml-auto">
        <button
          onClick={() => onRemove(product.id)}
          className="text-gray-400 hover:text-red-500 transition"
          title="Remove from Wishlist"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default WishlistCard;
