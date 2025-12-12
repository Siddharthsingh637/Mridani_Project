import React, { useState, useEffect, useRef } from 'react';
import Logo from '../../assets/Mridani_logo.avif';
import { FiUser, FiSearch, FiHeart, FiShoppingCart } from 'react-icons/fi';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { getWishlist } from "../../Service/API/Wishlist";

const UpperNav = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = sessionStorage.getItem('authToken');
    setIsLoggedIn(!!token);
    if (token) fetchWishlistCount(token);
  }, [location.pathname]);

  const fetchWishlistCount = async (token) => {
    try {
      const data = await getWishlist(token);
      setWishlistCount(data.length);
    } catch (err) {
      console.error("Error fetching wishlist:", err);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleProfileClick = () => {
    setShowDropdown(!showDropdown);
  };

  const handleMenuClick = (path) => {
    navigate(path);
    setShowDropdown(false);
  };

  return (
    <>
      <div className="w-full bg-white px-4 md:px-8 flex flex-col md:flex-row justify-between items-center gap-4 py-4">
        {/* Search */}
        <div className="w-full md:w-1/3 flex justify-center md:justify-start">
          <div className="relative w-full max-w-sm">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 opacity-70" />
            <input
              type="text"
              placeholder="Search"
              className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none shadow-sm text-sm"
            />
          </div>
        </div>

        {/* Logo */}
        <div className="w-full md:w-1/3 text-center">
  <Link to="/">
    <img src={Logo} alt="Mridani Logo" className="h-16 mx-auto cursor-pointer" />
  </Link>
</div>


        {/* Icons */}
        <div className="w-full md:w-1/3 flex justify-center md:justify-end items-center gap-4 text-gray-700 text-xl relative">
          {isLoggedIn ? (
            <div className="relative" ref={dropdownRef}>
              <button onClick={handleProfileClick} className="flex items-center gap-1 px-2 py-1 rounded-full text-gray-600 hover:bg-red-50 transition-all">
                <div className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center">
                  <FiUser className="text-base" />
                </div>
                {showDropdown ? <ChevronUp className="w-4 h-4 text-gray-600" /> : <ChevronDown className="w-4 h-4 text-gray-600" />}
              </button>

              <div className={`absolute z-50 right-0 mt-2 w-56 bg-white border border-gray-200 rounded-md shadow-xl transform origin-top-right transition-all duration-300 ease-out ${showDropdown ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'}`}>
                <button onClick={() => handleMenuClick('/orders')} className="block w-full text-left px-6 py-4 hover:bg-gray-100 text-sm">🧾 Orders</button>
                <button onClick={() => handleMenuClick('/profile')} className="block w-full text-left px-6 py-4 hover:bg-gray-100 text-sm">👤 Profile</button>
              </div>
            </div>
          ) : (
            <Link to="/login">
              <button className="flex items-center gap-2 px-4 py-1 rounded-full text-gray-600 hover:bg-red-50 transition-all text-lg">
                <FiUser className="text-base" />
                <span className="hidden sm:inline">Login</span>
              </button>
            </Link>
          )}

          {/* Wishlist */}
          <div className="relative">
            <Link to="/wishlist">
              <FiHeart className="hover:text-red-700 cursor-pointer" />
            </Link>
            {wishlistCount > 0 && (
              <span className="absolute -top-2 -right-2 text-xs bg-red-500 text-white rounded-full px-1">
                {wishlistCount}
              </span>
            )}
          </div>

          {/* Cart */}
          <div className="relative">
            <Link to="/cart">
              <FiShoppingCart className="hover:text-red-700 cursor-pointer" />
            </Link>
            <span className="absolute -top-2 -right-2 text-xs bg-red-500 text-white rounded-full px-1">
              2
            </span>
          </div>
        </div>
      </div>

      <div className="border-t border-dotted border-gray-300 mx-4 md:mx-8 mt-4"></div>
    </>
  );
};

export default UpperNav;
