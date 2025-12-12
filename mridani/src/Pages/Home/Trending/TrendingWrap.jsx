import Trending from "./Trending";
import TrendingMob from "./TrendingMob";
import { useEffect, useState } from "react";

const TrendingWrap = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return isMobile ? <TrendingMob /> : <Trending />;
};

export default TrendingWrap;
