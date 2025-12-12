import React, { useState } from "react";

const GalleryMob = ({ images = [], descriptionImages = [], title = "" }) => {
  const allThumbnails = [...(descriptionImages || images)];
  const [selectedImage, setSelectedImage] = useState(allThumbnails?.[0]);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const openFullScreen = () => setIsFullScreen(true);
  const closeFullScreen = () => setIsFullScreen(false);

  return (
    <>
      {/* Main Image */}
      <div className="flex flex-col px-4 items-center">
        <div
          className="w-full rounded shadow-md overflow-hidden cursor-zoom-in"
          onClick={openFullScreen}
        >
          <img
            src={selectedImage}
            alt={title}
            className="w-full h-[400px] object-contain transition-all duration-500 ease-in-out"
          />
        </div>

        {/* Thumbnails Below */}
        <div className="flex gap-3 mt-4 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent w-full">
          {allThumbnails.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Thumbnail ${index}`}
              onClick={() => setSelectedImage(img)}
              className={`w-20 h-20 rounded object-cover cursor-pointer transition-all duration-300 ${
                selectedImage === img ? "scale-105" : "opacity-80"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Full Screen Overlay */}
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

export default GalleryMob;
