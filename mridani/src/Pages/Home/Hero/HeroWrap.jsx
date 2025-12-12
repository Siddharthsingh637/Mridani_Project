import React from "react";
import { useMediaQuery } from "react-responsive";
import Hero from "./Hero";
import HeroMob from "./HeroMob";
import HeroMid from "./HeroMid";

const HeroWrap = () => {
  const isMobile = useMediaQuery({ maxWidth: 444 });
  const isMid = useMediaQuery({ minWidth: 445, maxWidth: 776 });

  return (
    <>
      {isMobile ? <HeroMob /> : isMid ? <HeroMid /> : <Hero />}
    </>
  );
};

export default HeroWrap;
