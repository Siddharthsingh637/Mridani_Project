import { useEffect, useState, useRef, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Title from "../../Components/Title";
import { Link } from "react-router-dom";


import cat1 from "../../assets/Home/cat1.webp";
import cat2 from "../../assets/Home/cat2.webp";
import cat3 from "../../assets/Home/cat3.webp";
import cat4 from "../../assets/Home/cat4.webp";
import cat5 from "../../assets/Home/cat5.webp";

const categories = [
  { label: "Saree", img: 'https://ik.imagekit.io/siddharth637/assets/Home/Screenshot%202025-07-07%20at%202.02.17%E2%80%AFPM.png?updatedAt=1751877514370', path: "/products/saree" },
  { label: "Potli", img: 'https://ik.imagekit.io/siddharth637/assets/Home/Screenshot%202025-07-07%20at%202.03.41%E2%80%AFPM.png?updatedAt=1751877514332', path: "/products/potli" },
  { label: "Stole", img: 'https://ik.imagekit.io/siddharth637/assets/Home/Screenshot%202025-07-07%20at%202.04.42%E2%80%AFPM.png?updatedAt=1751877514331', path: "/products/stoles" },
  { label: "Dupatta", img: 'https://ik.imagekit.io/siddharth637/assets/Home/Screenshot%202025-07-07%20at%202.19.01%E2%80%AFPM.png?updatedAt=1751878163925', path: "/products/dupatta" },
  { label: "Suits", img: 'https://ik.imagekit.io/siddharth637/assets/Home/Screenshot%202025-07-07%20at%202.02.59%E2%80%AFPM.png?updatedAt=1751877514371', path: "/products/suites" },
  { label: "Blouse", img: cat1, path: "/products/blouses" },
];


const Category = () => {
  const [startIndex, setStartIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(4);
  const [itemWidth, setItemWidth] = useState(288);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const autoSlideRef = useRef();
  const sliderRef = useRef();

  const totalItems = categories.length;
  const clonedCategories = [...categories, ...categories.slice(0, itemsPerView)];

  const updateItemsPerView = useCallback(() => {
    const width = window.innerWidth;
    if (width < 640) {
      setItemsPerView(1);
      setItemWidth(width * 0.9);
    } else if (width < 768) {
      setItemsPerView(2);
      setItemWidth(width * 0.45);
    } else if (width < 1024) {
      setItemsPerView(3);
      setItemWidth(width * 0.3);
    } else {
      setItemsPerView(4);
      setItemWidth(288);
    }
  }, []);

  useEffect(() => {
    updateItemsPerView();
    window.addEventListener("resize", updateItemsPerView);
    return () => window.removeEventListener("resize", updateItemsPerView);
  }, [updateItemsPerView]);

  const handleNext = () => {
    setIsTransitioning(true);
    setStartIndex((prev) => prev + 1);
  };

  const handlePrev = () => {
    setIsTransitioning(true);
    setStartIndex((prev) => prev - 1);
  };

  // Infinite loop reset logic
  useEffect(() => {
    if (!isTransitioning) return;

    const transitionEnd = setTimeout(() => {
      setIsTransitioning(false);

      if (startIndex >= totalItems) {
        // reached cloned items → jump to start
        setStartIndex(0);
      }

      if (startIndex < 0) {
        // looped back before first → jump to last set
        setStartIndex(totalItems - 1);
      }
    }, 700); // match transition duration

    return () => clearTimeout(transitionEnd);
  }, [startIndex, isTransitioning, totalItems]);

  useEffect(() => {
    autoSlideRef.current = setInterval(handleNext, 3000);
    return () => clearInterval(autoSlideRef.current);
  }, []);

  const pauseAutoSlide = () => clearInterval(autoSlideRef.current);
  const resumeAutoSlide = () => {
    autoSlideRef.current = setInterval(handleNext, 3000);
  };

  return (
    <section
      id="category-section"
      className="py-16 text-center relative shadow-top before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-4 before:shadow-[0_-30px_30px_-10px_rgba(0,0,0,0.3)] z-10"
    >
      <Title subtitle="Our Exclusive Collections" title="Shop By Categories" />

      <div className="relative mt-10 max-w-7xl mx-auto px-6">
        <button
          onClick={handlePrev}
          className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 p-2 bg-white shadow-lg rounded-full hover:bg-gray-100"
        >
          <ChevronLeft />
        </button>

        {/* Carousel */}
        <div className="overflow-hidden">
          <div
            ref={sliderRef}
            className="flex gap-8"
            style={{
              width: clonedCategories.length * itemWidth + (clonedCategories.length - 1) * 32,
              transform: `translateX(-${startIndex * (itemWidth + 32)}px)`,
              transition: isTransitioning ? "transform 0.7s ease-in-out" : "none"
            }}
          >
            {clonedCategories.map((cat, idx) => (
              <Link to={cat.path} key={idx}>
                <div
                  style={{ width: `${itemWidth}px` }}
                  className="flex-shrink-0 text-center"
                  onMouseEnter={pauseAutoSlide}
                  onMouseLeave={resumeAutoSlide}
                >
                  <div className="w-60 h-60 sm:w-64 sm:h-64 rounded-full overflow-hidden border-0 group relative mx-auto">
                    <img
                      src={cat.img}
                      alt={cat.label}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="costum absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <button className="bg-white cursor-pointer text-black px-4 py-1 font-semibold shadow hover:bg-gray-200 transition-all duration-300">
                        View
                      </button>
                    </div>
                  </div>
                  <p className="mt-4 text-base sm:text-lg font-medium">{cat.label}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <button
          onClick={handleNext}
          className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 p-2 bg-white shadow-lg rounded-full hover:bg-gray-100"
        >
          <ChevronRight />
        </button>
      </div>
    </section>
  );
};

export default Category;
