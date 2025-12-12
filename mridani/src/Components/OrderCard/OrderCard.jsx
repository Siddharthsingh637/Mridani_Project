import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const OrderCard = ({ order }) => {
  const navigate = useNavigate();

  const handleViewStatus = () => {
    navigate(`/viewstatus/${order.order_id}`);
  };

  const goToProduct = (productId) => {
    navigate(`/product/${productId}`);
  };

  return (
    <div className="bg-white border border-gray-200 shadow-md rounded-sm mb-6 p-6 w-full transition hover:shadow-lg">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-lg font-bold text-gray-900">
            Order ID: #{order.order_id}
          </h2>
          <p className="text-sm text-gray-500">
            Placed on {new Date(order.placed_at).toLocaleDateString()}
          </p>
        </div>

        <button
          onClick={handleViewStatus}
          className="flex items-center gap-2 text-sm font-medium text-black border border-black px-4 py-1.5 rounded-full hover:bg-black hover:text-white transition"
        >
          View Status <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Products */}
      <div className="space-y-6">
        {order.products.map((product, idx) => (
          <div
            key={idx}
            className="flex flex-col md:flex-row gap-4 cursor-pointer group"
            onClick={() => goToProduct(product.id)}
          >
            {/* Image */}
            <div className="w-full md:w-32 h-32 overflow-hidden flex items-center justify-center">
              <img
                src={product?.image_field?.[0] || '/placeholder.jpg'}
                alt={product?.product_title || 'Product'}
                className="object-contain w-full h-full transition-transform group-hover:scale-100"
              />
            </div>

            {/* Details */}
            <div className="flex-1">
              <h3 className="text-md font-semibold text-gray-800">
                {product?.product_title || 'Untitled Product'}
              </h3>
              <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                {product?.product_description || 'No description available.'}
              </p>

              {/* Features */}
              <div className="mt-2 text-xs text-gray-500 space-y-1">
                {product?.product_features ? (
                  <>
                    <p>Fabric: {product.product_features.fabric_by_style}</p>
                    <p>Color: {product.product_features.color}</p>
                    <p>Blouse: {product.product_features.blouse}</p>
                  </>
                ) : (
                  <p className="italic text-gray-400">Product details unavailable</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Order Summary */}
      <div className="mt-6 border-t pt-4 text-right">
        <p className="text-base font-semibold text-gray-900">
          Total Amount: ₹{order.total_amount}
        </p>
      </div>
    </div>
  );
};

export default OrderCard;
