import React from 'react';
import { useLocation } from 'react-router-dom';

import UpperNav from './UpperNav';
import LowerNav from './LowerNav';
import MobileNavbar from './MobileNavbar';

const Navbar = () => {
  const { pathname } = useLocation();

  const hideBothNav = pathname === "/signup" || pathname === "/payment";
  const hideLowerNav = pathname === "/profile" || pathname === "/orders" || pathname ==="/buynow";

  return (
    <>
      {/* Desktop View */}
      {!hideBothNav && (
        <div className="fixed top-0 left-0 w-full z-50 hidden md:block bg-white shadow-md">
          <div className="bg-white">
            <UpperNav />
            {!hideLowerNav && <LowerNav />}
          </div>
        </div>
      )}

      {/* Mobile View */}
      {!hideBothNav && (
        <div className="md:hidden">
          <MobileNavbar />
        </div>
      )}
    </>
  );
};

export default Navbar;
