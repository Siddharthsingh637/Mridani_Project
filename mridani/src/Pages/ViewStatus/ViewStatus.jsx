import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ViewStatus = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [isCancelled, setIsCancelled] = useState(false);

  // Map status to steps: 0-Placed, 1-Packed, 2-Shipped, 3-Delivered
  const statusSteps = ["Placed", "Packed", "Shipped", "Delivered"];
  const getStepFromStatus = (status) => {
    return statusSteps.indexOf(status) >= 0 ? statusSteps.indexOf(status) : 0;
  };

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await axios.get(`/api/orders/${orderId}/`);
        setOrder(response.data);
        if (response.data.status === "Cancelled") setIsCancelled(true);
      } catch (err) {
        console.error("Failed to fetch order:", err);
      }
    };

    fetchOrder();
  }, [orderId]);

  const handleCancelOrder = async () => {
    if (!window.confirm("Are you sure you want to cancel this order?")) return;

    try {
      await axios.post(`/api/orders/${orderId}/cancel/`);
      setIsCancelled(true);
    } catch (err) {
      console.error("Cancellation failed:", err);
    }
  };

  if (!order) return <p className="p-4">Loading...</p>;

  const progressStatus = getStepFromStatus(order.status || "Placed");

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 text-gray-800">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b pb-4 gap-2">
        <div>
          <h2 className="text-3xl font-bold">Order #{order.id}</h2>
          <p className="text-sm text-gray-500 mt-1">Placed on {new Date(order.created_at).toLocaleString()}</p>
        </div>
        <button className="text-blue-600 underline text-sm">Print Invoice</button>
      </div>

      {/* Progress Tracker */}
      <div className="relative w-full mt-12 mb-16">
        <div className="absolute top-5 left-0 w-full h-1 bg-gray-200 z-0 rounded-full" />
        <div
          className="absolute top-5 left-0 h-1 bg-green-600 z-10 rounded-full transition-all duration-500"
          style={{ width: `${(progressStatus / 3) * 100}%` }}
        />
        <div className="flex justify-between relative z-20">
          {statusSteps.map((label, i) => {
            const isDone = i < progressStatus;
            const isCurrent = i === progressStatus;
            return (
              <div key={i} className="flex flex-col items-center flex-1">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 font-bold text-white ${
                    isDone || isCurrent ? "bg-green-600" : "bg-gray-300"
                  }`}
                >
                  {isDone ? "✓" : i + 1}
                </div>
                <span className={`text-xs ${isDone || isCurrent ? "text-gray-900" : "text-gray-400"}`}>{label}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Addresses */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
        <div>
          <h4 className="font-semibold text-lg mb-2">Billing Address</h4>
          <p>{order.billing_address?.name}</p>
          <p>{order.billing_address?.email}</p>
          <p>{order.billing_address?.phone}</p>
          <p>{order.billing_address?.address_line1}</p>
          <p>{order.billing_address?.city}</p>
          <p>{order.billing_address?.state}</p>
        </div>
        <div>
          <h4 className="font-semibold text-lg mb-2">Shipping Address</h4>
          <p>{order.shipping_address?.name}</p>
          <p>{order.shipping_address?.phone}</p>
          <p>{order.shipping_address?.address_line1}</p>
          <p>{order.shipping_address?.city}</p>
          <p>{order.shipping_address?.state}</p>
        </div>
      </div>

      {/* Product Table */}
      <div className="mb-10">
        <h4 className="font-semibold text-lg mb-2">Products Ordered</h4>
        <div className="border rounded-md overflow-hidden">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="px-4 py-3">Product</th>
                <th className="px-4 py-3">Price</th>
                <th className="px-4 py-3">Quantity</th>
                <th className="px-4 py-3">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {order.items.map((item) => (
                <tr key={item.id} className="border-t">
                  <td className="px-4 py-3">
                    {item.product_title}
                    <br />
                    <span className="text-gray-500 text-xs">CODE: {item.product_code}</span>
                  </td>
                  <td className="px-4 py-3">₹{item.price}</td>
                  <td className="px-4 py-3">{item.quantity}</td>
                  <td className="px-4 py-3">₹{item.price * item.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary & Cancel */}
      <div className="flex flex-wrap justify-between items-start gap-4">
        <div className="bg-gray-50 p-5 rounded-md shadow w-full sm:w-1/3">
          <h4 className="font-semibold text-lg mb-2">Order Summary</h4>
          <div className="flex justify-between py-1">
            <span>Subtotal:</span>
            <span>₹{order.total_amount}</span>
          </div>
          <div className="flex justify-between font-semibold py-1">
            <span>Total:</span>
            <span>₹{order.total_amount}</span>
          </div>
          <div className="flex justify-between text-sm mt-1 text-gray-500">
            <span>Points:</span>
            <span>10 pts</span>
          </div>
        </div>

        {/* Cancel Button */}
        <div className="sm:mt-0 mt-6">
          {progressStatus >= 2 || isCancelled ? (
            <p className="text-sm text-gray-500 italic">
              {isCancelled ? "Order has been cancelled." : "Order cannot be cancelled now."}
            </p>
          ) : (
            <button
              onClick={handleCancelOrder}
              className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-md text-sm shadow"
            >
              Cancel Order
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewStatus;
