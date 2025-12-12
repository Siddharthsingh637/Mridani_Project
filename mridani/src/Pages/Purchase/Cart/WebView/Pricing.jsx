import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useNotification } from "../../../../Components/NotificationBar"; // adjust path if needed

const Pricing = ({ cartItems }) => {
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const navigate = useNavigate();
  const { showNotification } = useNotification();


  const totalMRP = cartItems.reduce(
    (sum, item) => sum + item.product_detail.price * item.quantity,
    0
  );
  
  const totalAfterDiscount = totalMRP - discount;

  const handleApplyCoupon = (code) => {
    if (code.toLowerCase() === "december") {
      setDiscount(150);
    } else if (code.toLowerCase() === "lotita") {
      setDiscount(100);
    } else {
      setDiscount(0);
    }
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      showNotification("Your cart is empty!");
      return;
    }
  
    const productsToSend = cartItems.map((item) => {
      const product = item.product_detail || item;
    
      return {
        id: product.id, // ✅ was product_id
        name: product.product_title,
        image_field: product.image_field?.[0] || "/placeholder.jpg",
        price: product.price,
        quantity: item.quantity,
      };
    });
    
    console.log("🛒 Sending to BuyNow:", productsToSend);
  
    navigate("/buynow", { state: { products: productsToSend } });
  };
  

  return (
    <div className="h-full bg-white p-6 flex flex-col justify-between shadow-md">
      <div>
        <h2 className="text-xl font-bold mb-4 border-b pb-2">My Cart</h2>

        <div className="bg-green-100 text-green-800 text-sm font-medium px-4 py-2 rounded mb-4">
          🎉 Yay! You’re eligible for FREE delivery
        </div>

        <div className="text-gray-700 space-y-2 mb-4">
          <p className="flex justify-between">
            <span>Total Products:</span>
            <span>{cartItems.length}</span>
          </p>
          <p className="flex justify-between">
            <span>Total MRP:</span>
            <span>₹{totalMRP}</span>
          </p>
          {discount > 0 && (
            <p className="flex justify-between text-green-600">
              <span>Discount:</span>
              <span>- ₹{discount}</span>
            </p>
          )}
        </div>

        <div className="mb-4">
          <h3 className="text-md font-semibold text-gray-800 mb-1">
            Coupons for you
          </h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>
              <span className="font-medium text-black">december</span> → 20% off 14 collections
            </li>
            <li>
              <span className="font-medium text-black">lotita</span> → 10% off No usage limits
            </li>
          </ul>
        </div>

        <div className="flex gap-2 mb-6">
          <input
            type="text"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            placeholder="Enter coupon code"
            className="flex-1 px-3 py-2 border rounded"
          />
          <button
            onClick={() => handleApplyCoupon(couponCode.trim())}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
          >
            Apply
          </button>
        </div>

        <div className="font-semibold text-lg flex justify-between border-t pt-4">
          <span>Total Payable:</span>
          <span>₹{totalAfterDiscount}</span>
        </div>

        <button
          onClick={handleCheckout}
          className="w-full mt-4 bg-black text-white py-3 rounded hover:bg-gray-800 transition"
        >
          Checkout Now
        </button>

        <div className="text-xs text-gray-500 mt-6 text-center">
          Safe and Secure Payments. Easy returns. 100% Authentic products.
        </div>
      </div>
    </div>
  );
};

export default Pricing;