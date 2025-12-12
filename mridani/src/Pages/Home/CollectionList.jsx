import React from "react";
import Title from "../../Components/Title";
import One from "../../assets/Home/col1.webp";
import Two from "../../assets/Home/col2.webp";
import Three from "../../assets/Home/col3.webp";
import Four from "../../assets/Home/col4.webp";
import { Link } from "react-router-dom";

const collections = [
  {
    name: "Bandhika Madhubani",
    img: One,
    path: "/products/Bandhika-Madhubani"
  },
  {
    name: "Hastkari Madhubani",
    img: Two,
    path: "/products/Hastkari-Madhubani"
  },
  {
    name: "Kathrang Madhubani",
    img: Three,
    path: "/products/Kathrang-Madhubani"
  },
  {
    name: "Rang Soot Sujni",
    img: Four,
    path: "/products/Rang-Soot-Sujni"
  },
];

const CollectionList = () => {
  return (
    <section className="py-12">
      <Title title="Collection List" subtitle="explore our collections" />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
        {collections.map((item, index) => (
          <Link
            to={item.path}
            key={index}
            className="group relative w-full overflow-hidden shadow-lg cursor-pointer"
          >
            {/* Image */}
            <img
              src={item.img}
              alt={item.name}
              loading="lazy"
              className="w-full h-[350px] object-cover transform transition-transform duration-500 group-hover:scale-105"
            />

            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-opacity-0 group-hover:bg-opacity-60 flex items-center justify-center transition-all duration-500">
              <button className="opacity-0 group-hover:opacity-100 text-black bg-white border cursor-pointer border-white px-4 py-2 uppercase tracking-wider text-sm hover:scale-105 transition duration-300">
                View
              </button>
            </div>

            {/* Name Section */}
            <div className="bg-white py-3 text-center">
              <p className="text-sm font-medium text-gray-800">{item.name}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default CollectionList;
