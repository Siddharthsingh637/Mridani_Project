import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import List from "../Webview/List";
import Payment from "../Webview/Payment";
import Address from "../Webview/Address";
import { placeOrder } from "../../../../Service/API/orders";

const BuynowMob = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { products = [] } = location.state || {};
  const [address, setAddress] = useState({});

  useEffect(() => {
    if (products.length === 0) {
      alert("No product selected. Please add something to your cart.");
      navigate("/cart");
    }
  }, [products, navigate]);

  const handlePlaceOrder = async () => {
    const token = sessionStorage.getItem("authToken");

    if (!token) {
      alert("Please log in to place the order.");
      return navigate("/login");
    }

    const payload = {
      products: products.map((p) => ({
        product_id: p.id,
        quantity: p.quantity,
      })),
      ...address,
    };

    try {
      await placeOrder(payload, token);
      alert("Order placed successfully!");
      navigate("/orders");
    } catch (err) {
      console.error("Error placing order:", err);
      alert("Failed to place order.");
    }
  };

  return (
    <div className="block lg:hidden px-4 pb-8">
      {/* Product List */}
      <div className="pt-6">
        <List products={products} />
      </div>

      {/* Payment Options */}
      <div className="pt-6">
        <Payment />
      </div>

      {/* Address Form */}
      <div className="pt-6">
        <Address onAddressChange={setAddress} />
      </div>

      {/* Proceed Button */}
      <div className="pt-6">
        <button
          onClick={handlePlaceOrder}
          className="w-full bg-red-600 text-white py-3 rounded hover:bg-red-700 transition"
        >
          Proceed to Payment
        </button>
      </div>

      {/* Policy Links */}
      <div className="pt-6 border-t mt-6">
        <div className="flex flex-wrap gap-4 text-yellow-500 text-sm mt-3">
          <a href="/refund-policy" className="hover:underline">
            Refund Policy
          </a>
          <a href="/shipping-policy" className="hover:underline">
            Shipping Policy
          </a>
          <a href="/privacy-policy" className="hover:underline">
            Privacy Policy
          </a>
          <a href="/terms-of-service" className="hover:underline">
            Terms of Service
          </a>
        </div>
      </div>
    </div>
  );
};

export default BuynowMob;
