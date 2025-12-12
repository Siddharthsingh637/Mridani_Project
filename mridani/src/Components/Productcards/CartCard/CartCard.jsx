import React from "react";
import { updateCartQuantity } from "../../../Service/API/Cart";

const CartCard = ({ cartItem, onRemove, onQuantityChange, token }) => {
  const { product_detail, quantity, id } = cartItem;

  const handleQuantityUpdate = async (newQty) => {
    if (newQty < 1) return;
    try {
      await updateCartQuantity(id, newQty, token);
      onQuantityChange(); // Refresh cart data
    } catch (err) {
      console.error("Failed to update quantity:", err);
    }
  };

  return (
    <div className="flex p-4 shadow-md bg-white">
      {/* Product Image + Quantity */}
      <div className="flex flex-col items-center w-32">
        <div className="w-28 h-28 overflow-hidden">
          <img
            src={product_detail.image_field?.[0] || "/placeholder.jpg"}
            alt={product_detail.product_title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Quantity Display */}
        <div className="flex items-center mt-3">
          <button
            className="px-3 py-1 border border-gray-300 rounded-l text-gray-700 hover:bg-gray-100"
            onClick={() => handleQuantityUpdate(quantity - 1)}
          >
            −
          </button>
          <span className="px-4 py-1 border-t border-b border-gray-300 text-gray-800">
            {quantity}
          </span>
          <button
            className="px-3 py-1 border border-gray-300 rounded-r text-gray-700 hover:bg-gray-100"
            onClick={() => handleQuantityUpdate(quantity + 1)}
          >
            +
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="flex flex-col justify-between flex-1 ml-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">{product_detail.product_title}</h3>
          <p className="text-md text-gray-600 mt-1">₹{product_detail.price}</p>
        </div>

        {/* Remove Button */}
        <div className="text-right">
          <button
            onClick={() => onRemove(id)} // Pass cartId to parent
            className="text-sm text-red-600 hover:underline mt-4"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartCard;
