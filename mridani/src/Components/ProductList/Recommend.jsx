import React from "react";
import RecommendCard from "../../Components/Productcards/RecommendCard";

// Example products data
const sampleProducts = [
  {
    name: "Handcrafted Saree",
    img: "https://planetpatna.com/wp-content/uploads/2025/05/eight.webp",
  },
  {
    name: "Silk Kurta Set",
    img: "https://planetpatna.com/wp-content/uploads/2025/05/eight.webp",
  },
  {
    name: "Traditional Dupatta",
    img: "https://planetpatna.com/wp-content/uploads/2025/05/eight.webp",
  },
  {
    name: "Traditional Dupatta",
    img: "https://planetpatna.com/wp-content/uploads/2025/05/eleven.webp",
  },{
    name: "Traditional Dupatta",
    img: "https://planetpatna.com/wp-content/uploads/2025/05/eight.webp",
  },{
    name: "Traditional Dupatta",
    img: "https://planetpatna.com/wp-content/uploads/2025/05/ten.webp",
  },{
    name: "Traditional Dupatta",
    img: "https://planetpatna.com/wp-content/uploads/2025/05/ten.webp",
  },{
    name: "Traditional Dupatta",
    img: "https://planetpatna.com/wp-content/uploads/2025/05/ten.webp",
  },
  // Add more items...
];

const Recommend = () => {
  return (
    <div className="px-4 py-6">
      <h2 className="text-xl font-semibold text-center mb-4">Recommended for You</h2>
      <div className="flex space-x-6 overflow-x-auto scrollbar-hide">
        {sampleProducts.map((item, index) => (
          <RecommendCard key={index} item={item} />
        ))}
      </div>
    </div>
  );
};

export default Recommend;
