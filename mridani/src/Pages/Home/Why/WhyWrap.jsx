import React, { useState, useEffect } from "react";
import Why from "./Why";
import WhyMob from "./WhyMob";

const WhyWrap = () => {
  const [isMobile, setIsMobile] = useState(false);

  // Detect screen size on mount
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768); // Tailwind md = 768px
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return isMobile ? <WhyMob /> : <Why />;
};

export default WhyWrap;
