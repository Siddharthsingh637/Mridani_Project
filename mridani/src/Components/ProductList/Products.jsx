import React from "react";
import ProductCard from "../Productcards/Pricecard";
import ProductMob from "./ProductsMob";

const Products = ({ products }) => {
  return (
    <>
      {/* Desktop and Tablet View */}
      <div className="hidden sm:block px-4 sm:px-6 md:px-10 lg:px-16 mt-6">
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
          {products.map((item, idx) => (
            <ProductCard key={idx} product={item} />
          ))}
        </div>
      </div>

      {/* Mobile View */}
      <div className="block sm:hidden">
        <ProductMob products={products} />
      </div>
    </>
  );
};

export default Products;
