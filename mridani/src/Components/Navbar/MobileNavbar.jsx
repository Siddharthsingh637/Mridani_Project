import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiMenu, FiX, FiSearch, FiUser, FiHeart, FiShoppingCart, FiChevronDown } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "../../assets/Mridani_Logo.avif";

const dropdownItems = {
  "WOMEN'S WEAR": [
    { name: "Blouses", route: "/products/blouses" },
    { name: "Clutches", route: "/products/clutches" },
    { name: "Dupatta", route: "/products/dupatta" },
    { name: "Kurti", route: "/products/kurti" },
    { name: "PashminaShawls", route: "/products/pashmina-shawls" },
    { name: "Potli", route: "/products/potli" },
    { name: "Saree", route: "/products/saree" },
    { name: "Stoles", route: "/products/stoles" },
    { name: "Suites", route: "/products/suites" },
  ],
  "MEN'S WEAR": [
    { name: "Kurta", route: "/products/kurta" },
    { name: "PocketSquares", route: "/products/pocket-squares" },
    { name: "Tie", route: "/products/tie" },
  ],
  "HOME DECOR": [
    { name: "CushionCovers", route: "/products/cushion-covers" },
    { name: "MadhubaniBags", route: "/products/madhubani-bags" },
    { name: "Painting", route: "/products/painting" },
    { name: "TableMat", route: "/products/table-mat" },
  ],
  "COLLECTION": [
    { name: "BandhikaMadhubani", route: "/products/bandhikamadhubani" },
    { name: "HastkaariMadhubani", route: "/products/hastkaarimadhubani" },
    { name: "KathrangMAdhubani", route: "/products/kathrangmadhubani" },
    { name: "RangSootsujni", route: "/products/rangsootsujni" },
  ],
};

const MobileNavbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdowns, setDropdowns] = useState({});

  const toggleDropdown = (item) => {
    setDropdowns((prev) => ({ ...prev, [item]: !prev[item] }));
  };

  return (
    <div className="fixed top-0 left-0 w-full z-50 bg-white shadow-md md:hidden">
      {/* Logo */}
      <div className="flex justify-center py-2">
        <Link to="/">
          <img src={Logo} alt="Mridani" className="h-8" />
        </Link>
      </div>

      {/* Navbar Icons */}
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-4">
          <button onClick={() => setMenuOpen(true)}>
            <FiMenu className="text-2xl text-gray-800" />
          </button>
          <FiSearch className="text-xl text-gray-800" />
        </div>

        <div className="flex items-center gap-4">
          <Link to="/login" className="flex items-center gap-1 text-gray-800 text-sm">
            <FiUser className="text-lg" />
            <span>Login</span>
          </Link>

          <Link to="/wishlist" className="relative">
            <FiHeart className="text-xl text-gray-800" />
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">0</span>
          </Link>

          <Link to="/cart" className="flex items-center text-gray-800 text-sm">
            <FiShoppingCart className="text-xl" />
            <span>(0)</span>
          </Link>
        </div>
      </div>

      {/* Slide Menu */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
            />

            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.2 }}
              className="fixed top-0 left-0 w-72 h-full bg-white z-50 p-5 shadow-md overflow-y-auto"
            >
              <div className="flex justify-end mb-6">
                <button onClick={() => setMenuOpen(false)}>
                  <FiX className="text-2xl text-gray-800" />
                </button>
              </div>

              <ul className="space-y-4 text-gray-700 font-medium">
                {[
                  { name: "HOME", route: "/" },
                  { name: "ABOUT", route: "/about" },
                  ...Object.keys(dropdownItems).map((key) => ({ name: key })),
                  { name: "GIFT ITEMS", route: "/products/giftItems" },
                  { name: "CONTACT US", route: "/contact" },
                ].map((item) => (
                  <li key={item.name}>
                    {item.route ? (
                      <Link to={item.route} onClick={() => setMenuOpen(false)}>
                        {item.name}
                      </Link>
                    ) : (
                      <>
                        <div
                          className="flex justify-between items-center cursor-pointer"
                          onClick={() => toggleDropdown(item.name)}
                        >
                          <span>{item.name}</span>
                          <FiChevronDown
                            className={`transition-transform duration-300 ${dropdowns[item.name] ? "rotate-180" : "rotate-0"}`}
                          />
                        </div>

                        <AnimatePresence>
                          {dropdowns[item.name] && (
                            <motion.ul
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="pl-4 mt-2 space-y-2 text-sm text-gray-600"
                            >
                              {dropdownItems[item.name]?.map((subItem) => (
                                <li key={subItem.name}>
                                  <Link to={subItem.route} onClick={() => setMenuOpen(false)}>
                                    {subItem.name}
                                  </Link>
                                </li>
                              ))}
                            </motion.ul>
                          )}
                        </AnimatePresence>
                      </>
                    )}
                  </li>
                ))}
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MobileNavbar;
