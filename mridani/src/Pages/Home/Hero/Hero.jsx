import { useEffect, useState } from "react";

const images = [
  "https://ik.imagekit.io/siddharth637/assets/Home/Picsart_25-07-02_13-15-03-320.jpg?updatedAt=1751444242025",
  "https://ik.imagekit.io/siddharth637/assets/Home/hero.jpeg?updatedAt=1751443118843"
];

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [opacity, setOpacity] = useState(1);
  const [fadeIn, setFadeIn] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFadeIn(false); // start fading out
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
        setFadeIn(true); // fade in new image
      }, 500); // match half of fade duration
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const fadeStart = 0;
      const fadeEnd = window.innerHeight * 0.9;

      const newOpacity =
        scrollY <= fadeStart
          ? 1
          : scrollY >= fadeEnd
          ? 0
          : 1 - (scrollY - fadeStart) / (fadeEnd - fadeStart);

      setOpacity(newOpacity);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className="relative w-full h-[80vh] sm:h-screen overflow-hidden"
      style={{
        opacity,
        transition: "opacity 0.2s linear"
      }}
    >
      <div
        className={`absolute inset-0 w-full h-full transition-opacity duration-1000`}
        style={{
          backgroundImage: `url(${images[currentIndex]})`,
          backgroundAttachment: "fixed",
          backgroundSize: "cover",
          backgroundPosition: currentIndex === 0 ? "65% center" : "center",
          opacity: fadeIn ? 1 : 0.4,
          pointerEvents: "none"
        }}
      ></div>
    </div>
  );
};

export default Hero;
