import React from "react";
import '../../index.css';

const RecommendCard = ({ item }) => {
  return (
    <div className="group relative w-64 sm:w-72 bg-white shadow-lg overflow-hidden flex-shrink-0 transition-transform duration-300 hover:-translate-y-1">
      
      {/* Image Section with aspect ratio */}
      <div className="relative aspect-[3/4] overflow-hidden">
        <img
          src={item.img}
          alt={item.name}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Hover Overlay */}
        <div className="absolute inset-0 flex items-center justify-center transition duration-500 pointer-events-none">
          <div className="opacity-0 group-hover:opacity-50 pointer-events-auto bg-black bg-opacity-50 w-full h-full absolute top-0 left-0 transition duration-500"></div>
          <button className="opacity-0 group-hover:opacity-100 text-black bg-white bg-opacity-70 border border-white px-5 py-2 uppercase tracking-wider text-xs font-medium rounded-md hover:scale-105 transition duration-300 z-10">
            View
          </button>
        </div>
      </div>

      {/* Info Section */}
      <div className="px-4 py-3 bg-white">
        <h3 className="text-center text-gray-800 text-sm font-semibold truncate">
          {item.name}
        </h3>
      </div>
    </div>
  );
};

export default RecommendCard;
