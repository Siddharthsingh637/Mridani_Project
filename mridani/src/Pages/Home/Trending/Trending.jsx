import React, { useEffect, useState } from "react";
import Title from "../../../Components/Title";
import PriceCard from "../../../Components/Productcards/Pricecard"; // Adjust path if needed
import { getAllProducts } from "../../../Service/API/api"; // ← Adjust based on your setup

const Trending = () => {
  const [trendingProducts, setTrendingProducts] = useState([]);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const data = await getAllProducts(); // Your existing API
        const filtered = data.filter((product) => product.trending);
        setTrendingProducts(filtered);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };

    fetchTrending();
  }, []);

  return (
    <section className="py-10">
      <Title title="Trending Products" subtitle="Our trending products" />

      <div className="mt-18 max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
        {trendingProducts.map((product, idx) => (
          <div
            key={product.id}
            className={`${idx > 3 ? "hidden lg:block" : "block"}`} // Show first 4 on mobile, all on desktop
          >
            <PriceCard product={product} />
          </div>
        ))}
      </div>

      {trendingProducts.length > 4 && (
        <div className="text-center mt-10">
          <button className="bg-red-500 text-white font-semibold px-6 py-2 rounded hover:bg-red-800 transition">
            View All →
          </button>
        </div>
      )}
    </section>
  );
};

export default Trending;
