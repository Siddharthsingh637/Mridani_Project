import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAllProducts } from "../../../Service/API/api";
import PriceCardMob from "../../../Components/Productcards/PricecardMob"; // Adjust if needed

const RelatedMob = () => {
  const { id } = useParams();
  const [related, setRelated] = useState([]);

  useEffect(() => {
    const fetchRelated = async () => {
      try {
        const allProducts = await getAllProducts();
        const currentProduct = allProducts.find((item) => item.id === parseInt(id));

        if (!currentProduct) return;

        const sameCategory = allProducts.filter(
          (item) =>
            item.category_id === currentProduct.category_id && item.id !== currentProduct.id
        );

        const randomEight = sameCategory.sort(() => 0.5 - Math.random()).slice(0, 8);
        setRelated(randomEight);
      } catch (error) {
        console.error("Error fetching related products:", error);
      }
    };

    fetchRelated();
  }, [id]);

  if (related.length === 0) return null;

  return (
    <div className="w-full bg-gray-50 py-10 px-4">
      <h2 className="text-xl font-bold mb-6 text-gray-800 text-center">
        Related Products
      </h2>

      <div className="grid grid-cols-2 gap-4">
        {related.map((product) => (
          <PriceCardMob key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default RelatedMob;
