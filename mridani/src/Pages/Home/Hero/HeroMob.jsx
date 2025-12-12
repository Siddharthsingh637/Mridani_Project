import { useEffect, useState } from "react";
import Img2 from "../../../assets/Home/home3.webp";
import Img3 from "../../../assets/Home/home4.webp";

const images = [Img2, Img3];

const HeroMob = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[80vh] overflow-hidden">
      {images.map((src, index) => (
        <img
          key={index}
          src={src}
          loading="lazy"
          alt={`hero-${index}`}
          className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
    </div>
  );
};

export default HeroMob;
