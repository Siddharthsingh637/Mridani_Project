// InstaWrap.jsx
import React from "react";
import Insta from "./Insta";
import InstaMob from "./InstaMob";
import { useMediaQuery } from "react-responsive";

const InstaWrap = () => {
  const isMobile = useMediaQuery({ maxWidth: 767 });

  return isMobile ? <InstaMob /> : <Insta />;
};

export default InstaWrap;
