import React from "react";
import { ChevronLeft } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { initiatePayment } from '../../../Service/API/payment';

const Payment = () => {

  const location = useLocation();
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/buynow", {
      state: {
        products: location.state?.products || [],
        address: location.state?.address || {},
      },
    });
  };
  
  const handlePayment = async () => {
    const token = sessionStorage.getItem("authToken");
    if (!token) {
      alert("Please login first.");
      return navigate("/login");
    }
  
    const payload = {
      address,
      products,
    };
  
    try {
      const result = await initiatePayment(payload, token);
      if (result?.payment_url) {
        window.location.href = result.payment_url;
      } else {
        alert("No payment URL received.");
      }
    } catch (err) {
      alert("Payment initiation failed.");
    }
  };
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden border">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-red-600"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Checkout
          </button>
          <h2 className="text-lg font-semibold text-gray-800">Secure Payment</h2>
          <span></span> {/* placeholder */}
        </div>

        {/* Content */}
        <div className="grid md:grid-cols-2 gap-6 p-6">
          {/* Payment Methods */}
          <div>
            <h3 className="font-medium text-gray-700 mb-4">Choose Payment Method</h3>
            <div className="space-y-4 text-sm">
              <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:border-red-600 transition">
                <input type="radio" name="method" className="accent-red-600" />
                UPI (Google Pay, PhonePe, Paytm)
              </label>
              <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:border-red-600 transition">
                <input type="radio" name="method" className="accent-red-600" />
                Debit/Credit Card
              </label>
              <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:border-red-600 transition">
                <input type="radio" name="method" className="accent-red-600" />
                Wallets
              </label>
              <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:border-red-600 transition">
                <input type="radio" name="method" className="accent-red-600" />
                Cash on Delivery (COD)
              </label>
            </div>
          </div>

          {/* Order Summary */}
          <div>
            <h3 className="font-medium text-gray-700 mb-4">Order Summary</h3>
            <div className="text-sm bg-gray-100 p-4 rounded space-y-2">
              <div className="flex justify-between">
                <span>Product:</span>
                <span>Handloom Saree</span>
              </div>
              <div className="flex justify-between">
                <span>Quantity:</span>
                <span>1</span>
              </div>
              <div className="flex justify-between">
                <span>Price:</span>
                <span>₹1,899</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping:</span>
                <span className="text-green-600">Free</span>
              </div>
              <hr />
              <div className="flex justify-between font-semibold text-base">
                <span>Total:</span>
                <span>₹1,899</span>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="p-6 border-t flex justify-end">
          <button
            onClick={handlePayment}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-full text-sm font-medium transition"
          >
            Proceed to Pay ₹1,899
          </button>
        </div>
      </div>
    </div>
  );
};

export default Payment;
