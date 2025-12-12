import React, { useEffect, useState } from "react";
import { getAllProducts } from "../../Service/API/api";
import PriceCard from "../../Components/Productcards/Pricecard"; // adjust path if different
import { useParams } from "react-router-dom";

const RelatedProducts = () => {
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
    <div className="w-full bg-gray-50 py-12 px-4 md:px-8">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800 text-center">
        Related Products
      </h2>

      <div className="flex flex-wrap justify-center gap-6">
        {related.map((product) => (
          <PriceCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
