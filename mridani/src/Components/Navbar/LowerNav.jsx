import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const LowerNav = () => {
  const location = useLocation();
  const [activeMenu, setActiveMenu] = useState(location.pathname);

  const menuItems = [
    { name: "HOME", route: "/" },
    { name: "ABOUT", route: "/about" },
    {
      name: "WOMEN'S WEAR ▼",
      subItems: [
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
    },
    {
      name: "MEN'S WEAR ▼",
      subItems: [
        { name: "Kurta", route: "/products/kurta" },
        { name: "PocketSquares", route: "/products/pocket-squares" },
        { name: "Tie", route: "/products/tie" },
      ],
    },
    {
      name: "HOME DECOR ▼",
      subItems: [
        { name: "CushionCovers", route: "/products/cushion-covers" },
        { name: "MadhubaniBags", route: "/products/madhubani-bags" },
        { name: "Painting", route: "/products/painting" },
        { name: "TableMat", route: "/products/table-mat" },
      ],
    },
    {
      name: "COLLECTION ▼",
      subItems: [
        { name: "BandhikaMadhubani", route: "/products/bandhika-madhubani" },
        { name: "HastkaariMadhubani", route: "/products/hastkaari-madhubani" },
        { name: "KathrangMAdhubani", route: "/products/kathrang-madhubani" },
        { name: "RangSootsujni", route: "/products/rang-soot-sujni" },
      ],
    },
    { name: "GIFT ITEMS", route: "/products/giftItems" },
    { name: "CONTACT US", route: "/contact" },
  ];

  return (
    <nav className="bg-white shadow-bottom shadow-sm hidden md:block w-full">
      <ul className="flex justify-center gap-10 py-5 text-gray-800 font-medium text-sm">
        {menuItems.map((item) => {
          const hasDropdown = item.subItems?.length;
          const isActive =
            activeMenu === item.route ||
            item.subItems?.some((sub) => sub.route === location.pathname);

          const MenuContent = (
            <>
              <span
                className={`transition-all duration-300 ${isActive
                  ? "text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-600"
                  : "group-hover:bg-clip-text group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-red-600 group-hover:to-red-600"
                  }`}
              >
                {item.name}
              </span>

              <div
                className={`h-[2px] bg-gradient-to-r from-red-600 to-red-600 absolute bottom-0 left-0 transition-all duration-300 ${isActive ? "w-full" : "w-0 group-hover:w-full"
                  }`}
              ></div>

              {hasDropdown && (
                <ul className="absolute left-0 top-full mt-0 w-56 bg-white shadow-md opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-opacity duration-300 z-50">
                  {item.subItems.map((subItem, idx) => (
                    <li key={idx}>
                      <Link
                        to={subItem.route}
                        className="block px-4 py-2 hover:bg-gray-100 text-sm text-gray-700"
                        onClick={() => setActiveMenu(subItem.route)}
                      >
                        {subItem.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </>
          );

          return (
            <li
              key={item.name}
              className="relative group cursor-pointer"
              onClick={() => item.route && setActiveMenu(item.route)}
            >
              {item.route ? (
                <Link to={item.route}>{MenuContent}</Link>
              ) : (
                MenuContent
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default LowerNav;
