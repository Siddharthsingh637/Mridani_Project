import React, { useState } from "react";

const ProductGallery = ({ images = [], descriptionImages = [], title = "" }) => {
  const [selectedImage, setSelectedImage] = useState(
    descriptionImages?.[0] || images?.[0]
  );
  const [isFullScreen, setIsFullScreen] = useState(false);

  const allThumbnails = [...(descriptionImages || images)];

  const openFullScreen = () => setIsFullScreen(true);
  const closeFullScreen = () => setIsFullScreen(false);

  return (
    <>
      {/* Image Gallery Section */}
      <div className="flex flex-col md:flex-row gap-6 justify-center items-start px-4">
        {/* Thumbnails */}
        <div className="hidden md:flex flex-col items-center gap-4 max-h-[800px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
          {allThumbnails.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Thumbnail ${index}`}
              onClick={() => setSelectedImage(img)}
              className={`w-34 h-32 object-cover cursor-pointer transition-all duration-300 shadow-sm hover:shadow-lg hover:scale-105 ${
                selectedImage === img ? "opacity-100 scale-105" : "opacity-80"
              }`}
            />
          ))}
        </div>

        {/* Main Image */}
        <div
          className="w-[1000px] overflow-hidden shadow-xl transition-all duration-500 cursor-zoom-in"
          onClick={openFullScreen}
        >
          <img
            src={selectedImage}
            alt={title}
            className="w-full h-[800px] object-contain transition-all duration-500 ease-in-out"
          />
        </div>
      </div>

      {/* Full Screen View */}
      {isFullScreen && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center"
          onClick={closeFullScreen}
        >
          <img
            src={selectedImage}
            alt="Full screen"
            className="max-w-full max-h-full object-contain cursor-zoom-out"
          />
        </div>
      )}
    </>
  );
};

export default ProductGallery;
