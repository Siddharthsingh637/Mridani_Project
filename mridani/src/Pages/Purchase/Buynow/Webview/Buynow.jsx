import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import List from './List';
import Address from './Address';
import Payment from './Payment';

const Buynow = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { products = [], address: initialAddress = {} } = location.state || {};

  const [address, setAddress] = React.useState(initialAddress);

  // Redirect if user directly visits /buynow with no product
  React.useEffect(() => {
    if (products.length === 0) {
      alert("No product selected. Please add something to your cart.");
      navigate("/cart");
    }
  }, [products, navigate]);

  const handleProceedToPayment = () => {
    if (!sessionStorage.getItem("authToken")) {
      alert("Please log in to proceed.");
      return navigate("/login");
    }

    // Optionally validate address fields
    // if (!address || !address.full_name || !address.pincode) {
    //   return alert("Please fill in your address before continuing.");
    // }

    navigate("/payment", {
      state: {
        products,
        address,
      },
    });
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 px-6 h-full overflow-hidden">
      {/* Left Section */}
      <div className="flex flex-col w-full lg:w-1/2 space-y-6 overflow-y-auto pr-2 pb-8 min-h-0">
        <Payment />
        <Address onAddressChange={setAddress} initialData={initialAddress} />
        <button
          onClick={handleProceedToPayment}
          className="bg-red-600 w-full text-white py-3 px-6 rounded hover:bg-red-700 transition duration-200 self-start"
        >
          Proceed to Payment
        </button>
        <div className="pt-6 border-t mt-4">
          <div className="flex flex-wrap gap-4 text-yellow-500 text-sm mt-3">
            <a href="/refund-policy" className="hover:underline">Refund Policy</a>
            <a href="/shipping-policy" className="hover:underline">Shipping Policy</a>
            <a href="/privacy-policy" className="hover:underline">Privacy Policy</a>
            <a href="/terms-of-service" className="hover:underline">Terms of Service</a>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-full lg:w-1/2 bg-gray-50 overflow-hidden">
        <div className="sticky top-0">
          <List products={products} />
        </div>
      </div>
    </div>
  );
};

export default Buynow;
