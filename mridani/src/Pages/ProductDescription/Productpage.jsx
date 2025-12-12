import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../../Service/API/api";

import ProductGallery from "./ProductGallery";
import ProductInfo from "./ProductInfo";
import Description from "./Description";
import RelatedProducts from "./RelatedProducts";
import StickyCartBar from "./StickyCartBar";
import InfoBar from "./Infobar";
import FAQ from "./FAQ";
import Showcasing from "./Showcasing";
import Footer from "../../Components/Footer";

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  // ✅ Notification state
  const [notification, setNotification] = useState("");
  const [showNotification, setShowNotification] = useState(false);

  const showMessage = (msg) => {
    setNotification(msg);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductById(id);
        setProduct(data);
      } catch (error) {
        console.error("Failed to load product:", error);
      }
    };
    fetchProduct();
  }, [id]);

  if (!product) return <div className="text-center p-8">Loading...</div>;

  return (
    <>
      <div className="w-full py-10">
        <div className="flex flex-col lg:flex-row gap-12">
          <div className="w-full lg:w-[740px]">
            <ProductGallery
              images={product.image_field}
              descriptionImages={product.description_images}
              title={product.product_title}
            />
          </div>

          <div className="flex-1">
            <ProductInfo
              title={product.product_title}
              price={product.price}
              description={product.product_description}
              productId={product.id}
              image_field={product.image_field}
              showMessage={showMessage} // ✅ pass function
            />
          </div>
        </div>

        <Description
          description={product.product_description}
          features={product.product_features}
        />
        <Showcasing />
        <InfoBar />
        <FAQ />
        <RelatedProducts />
        <Footer />
      </div>

      <StickyCartBar product={product} />

      {/* ✅ NotificationBar placed once here */}
    </>
  );
};

export default ProductPage;
