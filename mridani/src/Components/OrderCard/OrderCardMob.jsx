import React from 'react';
import { useNavigate } from 'react-router-dom';

const OrderCardMob = ({ order }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white shadow-sm rounded-md p-4 mb-6 border border-gray-200">
      {/* Order Header */}
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-sm font-semibold text-gray-800">
          Order #{order.order_id}
        </h2>
        <p className="text-xs text-gray-500">
          {new Date(order.placed_at).toLocaleDateString()}
        </p>
      </div>

      {/* Product List */}
      <div className="space-y-3">
        {order.products.map((product, idx) => (
          <div
            key={idx}
            onClick={() => navigate(`/product/${product.id}`)}
            className="flex gap-3 items-start cursor-pointer"
          >
            {/* Reduced Image Size */}
            <div className="w-20 h-20 rounded-md overflow-hidden">
              <img
                src={product?.image_field?.[0] || '/placeholder.jpg'}
                alt={product?.product_title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Product Info */}
            <div className="flex-1">
              <h3 className="text-sm font-medium text-gray-800">
                {product?.product_title || 'Untitled'}
              </h3>
              <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                {product?.product_description || 'No description'}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Total & Status Button */}
      <div className="flex justify-between items-center mt-4 pt-3 border-t">
        <p className="text-sm font-semibold text-gray-800">
          Total: ₹{order.total_amount}
        </p>
        <button
          onClick={() => alert(`Status: ${order.status || 'Pending'}`)}
          className="text-xs font-medium text-black border border-black px-3 py-1 rounded-full hover:bg-black hover:text-white transition"
        >
          View Status
        </button>
      </div>
    </div>
  );
};

export default OrderCardMob;
