import React from "react";
import { useMediaQuery } from "react-responsive";
import CartPage from "./WebView/Cartpage";
import CartPageMob from "./MobView/CartpageMob";

const CartPageWrap = () => {
  const isMobile = useMediaQuery({ maxWidth: 768 });

  return isMobile ? (
    <CartPageMob />
  ) : (
    <div>
      <CartPage />
    </div>
  );
};

export default CartPageWrap;
