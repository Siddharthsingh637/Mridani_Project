import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAllProducts } from "../../../Service/API/api";
import Footer from "../../../Components/Footer";

import GalleryMob from "./GalleryMob.";
import InfoMob from "./InfoMob";
import DescriptionMob from "./DescriptionMob";
import InfoBarMob from "./InfobarMob";
import Showcasing from "../Showcasing";
import RelatedMob from "./RelatedMob";

const ProductPageMob = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const allProducts = await getAllProducts();
        const foundProduct = allProducts.find(
          (item) => item.id === parseInt(id)
        );
        setProduct(foundProduct);
      } catch (error) {
        console.error("Failed to load product:", error);
      }
    };
    fetchProduct();
  }, [id]);

  if (!product) return <div className="text-center p-8">Loading...</div>;

  return (
    <div className="w-full flex flex-col overflow-x-hidden">
      {/* Product Image Gallery */}
      <GalleryMob
        images={product.image_field}
        descriptionImages={product.description_images}
        title={product.product_title}
      />

      {/* Product Info Section (title, price, buttons) */}
      <InfoMob
  title={product.product_title}
  price={product.price}
  productId={product.id}
  image_field={product.image_field}
/>


      {/* Product Description and Highlights */}
      <DescriptionMob
        description={product.product_description}
        features={product.product_features}
      />

      {/* Informational Icons Bar */}
      <InfoBarMob />

      {/* Showcasing banner */}
      <Showcasing />

      {/* Related Products */}
      <RelatedMob />
      <Footer/>
    </div>
  );
};

export default ProductPageMob;
