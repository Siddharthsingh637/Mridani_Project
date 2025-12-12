import React from "react";
import { useMediaQuery } from "react-responsive";
import Buynow from "./Webview/Buynow";
import BuynowMob from "./Mobview/BuynowMob";

const BuynowWrap = () => {
  const isMobile = useMediaQuery({ maxWidth: 768 });

  return isMobile ? (
    <BuynowMob />
  ) : (
    <div className="fixed top-[120px] left-0 right-0 bottom-0 overflow-hidden">
      <Buynow />
    </div>
  );
};

export default BuynowWrap;
