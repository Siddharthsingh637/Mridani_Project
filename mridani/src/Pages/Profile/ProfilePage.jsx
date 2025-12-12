import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import { Heart, ShoppingCart, PackageCheck } from 'lucide-react';

const ProfilePage = () => {
  const username = sessionStorage.getItem("username");
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem("authToken");
    sessionStorage.removeItem("username");
    navigate("/login");
  };

  const handleShopNow = () => navigate("/");
  const goTo = (path) => navigate(path);

  return (
    <div className="min-h-screen pt-[12px] bg-gray-50">
      <Header />

      <div className="max-w-4xl mx-auto text-center px-4 mt-10">
        <h2 className="text-3xl font-bold text-gray-800">Welcome 🎉</h2>
        <p className="text-lg text-gray-600 mt-2">You're now logged in to your account.</p>

        <div className="flex flex-wrap justify-center gap-6 mt-10">
          {/* Wishlist */}
          <div
            onClick={() => goTo("/wishlist")}
            className="cursor-pointer w-64 bg-white shadow-md rounded-xl p-6 hover:shadow-xl transition-all duration-300"
          >
            <Heart className="w-8 h-8 text-red-500 mx-auto" />
            <h3 className="mt-4 text-lg font-semibold text-gray-800">Wishlist</h3>
            <p className="text-sm text-gray-500">View your saved items.</p>
          </div>

          {/* Cart */}
          <div
            onClick={() => goTo("/cart")}
            className="cursor-pointer w-64 bg-white shadow-md rounded-xl p-6 hover:shadow-xl transition-all duration-300"
          >
            <ShoppingCart className="w-8 h-8 text-blue-500 mx-auto" />
            <h3 className="mt-4 text-lg font-semibold text-gray-800">Cart</h3>
            <p className="text-sm text-gray-500">Items waiting for checkout.</p>
          </div>

          {/* Orders */}
          <div
            onClick={() => goTo("/orders")}
            className="cursor-pointer w-64 bg-white shadow-md rounded-xl p-6 hover:shadow-xl transition-all duration-300"
          >
            <PackageCheck className="w-8 h-8 text-green-500 mx-auto" />
            <h3 className="mt-4 text-lg font-semibold text-gray-800">Orders</h3>
            <p className="text-sm text-gray-500">Track your past orders.</p>
          </div>
        </div>

        <div className="mt-10">
          <button
            onClick={handleShopNow}
            className="bg-red-600 text-white px-6 py-2 rounded-full text-sm hover:bg-red-700 transition"
          >
            Shop Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
