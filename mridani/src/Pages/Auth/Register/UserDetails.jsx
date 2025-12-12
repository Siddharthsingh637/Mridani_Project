import React, { useState } from "react";

const UserDetails = ({ onNext, updateFormData }) => {
  const [input, setInput] = useState({
    username: "",
    email: "",
    mobile: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Allow only numbers for mobile
    if (name === "mobile" && !/^\d*$/.test(value)) {
      return;
    }

    setInput((prev) => ({ ...prev, [name]: value }));
  };

  const handleContinue = () => {
    if (input.username && input.email && input.mobile) {
      updateFormData(input);
      onNext();
    } else {
      alert("Please fill out all fields");
    }
  };

  return (
    <div className="space-y-6 w-full">
      <h2 className="text-3xl font-bold text-gray-800 text-center">Sign up</h2>

      <div className="space-y-4 mt-6">
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">Username</label>
          <input
            name="username"
            value={input.username}
            onChange={handleChange}
            placeholder="Enter your username"
            className="w-full px-4 py-3 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">Email</label>
          <input
            name="email"
            type="email"
            value={input.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className="w-full px-4 py-3 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">Mobile No.</label>
          <input
            name="mobile"
            type="tel"
            value={input.mobile}
            onChange={handleChange}
            placeholder="Enter your mobile number"
            className="w-full px-4 py-3 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>
      </div>

      <button
        onClick={handleContinue}
        className="w-full mt-4 py-3 text-base font-semibold bg-red-700 text-white rounded-md hover:bg-red-800 transition"
      >
        Continue →
      </button>
    </div>
  );
};

export default UserDetails;
