import React, { useState } from 'react';

const Payment = () => {
  const [showMore, setShowMore] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const accountEmail = 'user@example.com';

  const handleLogout = () => {
    console.log('User logged out');
  };

  const logos = [
    {
      name: 'UPI',
      src: 'https://ik.imagekit.io/siddharth637/outer_asset/buynow/upi.svg?updatedAt=1750229270341',
    },
    {
      name: 'Visa',
      src: 'https://ik.imagekit.io/siddharth637/outer_asset/buynow/visa.svg?updatedAt=1750229270256',
    },
    {
      name: 'MasterCard',
      src: 'https://ik.imagekit.io/siddharth637/outer_asset/buynow/master.svg?updatedAt=1750229270342',
    },
    {
      name: 'RuPay',
      src: 'https://ik.imagekit.io/siddharth637/outer_asset/buynow/rupay.svg?updatedAt=1750229270364',
    },
  ];

  return (
    <div className="p-4 sm:p-6 md:p-8 bg-white shadow-sm">
      {/* Email Dropdown Header */}
      <div className="mb-4 relative">
        <div
          className="flex items-center justify-between px-2 py-1 rounded-full hover:bg-yellow-50 w-fit ml-auto cursor-pointer"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          <p className="text-sm sm:text-md text-gray-800 mb-1">Account</p>
          <svg
            className={`w-4 h-4 text-yellow-500 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>

        {dropdownOpen && (
          <div className="absolute right-0 top-8 bg-white border border-gray-200 shadow-md rounded-md z-20 w-[240px] sm:w-[280px] p-4">
            <p className="text-sm text-black font-medium mb-3">{accountEmail}</p>
            <button
              onClick={handleLogout}
              className="text-yellow-500 text-sm font-semibold hover:underline"
            >
              Log out
            </button>
          </div>
        )}
      </div>

      {/* Payment Section */}
      <h2 className="font-semibold text-md sm:text-lg mb-2">Payment</h2>
      <p className="text-gray-600 text-sm mb-4">All transactions are secure and encrypted.</p>

      {/* Cashfree Header */}
      <div className="border border-yellow-400 rounded-t-md bg-yellow-50 flex flex-col sm:flex-row sm:justify-between sm:items-center px-4 py-3 gap-3">
        <span className="font-medium text-sm text-center sm:text-left">
          Cashfree Payments (UPI, Cards, Wallets, NetBanking)
        </span>

        <div className="flex flex-wrap items-center gap-2 justify-center sm:justify-end">
          {logos.map((logo, index) => (
            <img
              key={index}
              src={logo.src}
              alt={logo.name}
              className="w-10 h-6 object-contain bg-white border rounded p-1"
            />
          ))}

          {/* +10 Hover Block */}
          <div
            className="w-10 h-6 text-white bg-black text-xs flex items-center justify-center rounded cursor-pointer relative"
            onMouseEnter={() => setShowMore(true)}
            onMouseLeave={() => setShowMore(false)}
          >
            +10
            {showMore && (
              <div className="absolute top-8 right-0 z-10 w-[160px] p-2 bg-black rounded shadow-lg">
                <img
                  src="https://ik.imagekit.io/siddharth637/outer_asset/buynow/Screenshot%202025-06-18%20at%2012.03.22%E2%80%AFPM.png?updatedAt=1750229320320"
                  alt="More payment options"
                  className="w-full rounded"
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Description Box */}
      <div className="bg-white px-4 sm:px-6 py-6 rounded-b-md border border-t-0 border-yellow-400 text-center">
        <img
          src="https://ik.imagekit.io/siddharth637/outer_asset/buynow/card.jpeg?updatedAt=1750233914439"
          alt="Cashfree Window"
          className="w-20 sm:w-24 mx-auto mb-4"
        />
        <p className="text-sm text-gray-800 leading-relaxed">
          After clicking <strong>“Pay now”</strong>, you will be redirected to <br />
          <span className="block sm:inline">Cashfree Payments (UPI, Cards, Wallets, NetBanking)</span> <br />
          to complete your purchase securely.
        </p>
      </div>
    </div>
  );
};

export default Payment;
