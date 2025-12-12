import React from "react";
import { useMediaQuery } from "react-responsive";
import Showcase from "./Showcase"; // Desktop view
import ShowcaseMob from "./ShowcaseMob"; // Mobile view

const ShowcaseWrap = () => {
  const isMobile = useMediaQuery({ maxWidth: 1023 }); // tailwind lg breakpoint

  return isMobile ? <ShowcaseMob /> : <Showcase />;
};

export default ShowcaseWrap;
