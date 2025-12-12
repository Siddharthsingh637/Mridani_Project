import React from 'react';

const Address = ({ onAddressChange }) => {
  const handleChange = (e) => {
    onAddressChange(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="p-6 bg-white border border-gray-200">
      <h2 className="text-xl font-semibold mb-8 tracking-wide text-gray-800">Billing Address</h2>

      <form className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Full Name</label>
          <input
            type="text"
            name="name"
            onChange={handleChange}
            className="w-full border-b border-gray-300 px-1 py-2 text-sm focus:outline-none focus:border-black"
            placeholder="Enter your full name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Company (optional)</label>
          <input
            type="text"
            name="company"
            onChange={handleChange}
            className="w-full border-b border-gray-300 px-1 py-2 text-sm focus:outline-none focus:border-black"
            placeholder="Your company name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Address</label>
          <input
            type="text"
            name="address"
            onChange={handleChange}
            className="w-full border-b border-gray-300 px-1 py-2 text-sm focus:outline-none focus:border-black"
            placeholder="Street address, locality"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">House / Flat (optional)</label>
          <input
            type="text"
            name="house"
            onChange={handleChange}
            className="w-full border-b border-gray-300 px-1 py-2 text-sm focus:outline-none focus:border-black"
            placeholder="Flat no., building, etc."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">City</label>
          <input
            type="text"
            name="city"
            onChange={handleChange}
            className="w-full border-b border-gray-300 px-1 py-2 text-sm focus:outline-none focus:border-black"
            placeholder="City"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">State</label>
          <input
            type="text"
            name="state"
            onChange={handleChange}
            className="w-full border-b border-gray-300 px-1 py-2 text-sm focus:outline-none focus:border-black"
            placeholder="State"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">PIN Code</label>
          <input
            type="text"
            name="pin_code"
            onChange={handleChange}
            className="w-full border-b border-gray-300 px-1 py-2 text-sm focus:outline-none focus:border-black"
            placeholder="e.g. 800001"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Phone Number</label>
          <input
            type="text"
            name="phone_number"
            onChange={handleChange}
            className="w-full border-b border-gray-300 px-1 py-2 text-sm focus:outline-none focus:border-black"
            placeholder="10-digit mobile number"
          />
        </div>
      </form>
    </div>
  );
};

export default Address;
