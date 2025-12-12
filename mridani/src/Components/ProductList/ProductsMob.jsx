// src/components/ProductList/ProductMob.jsx

import React from "react";
import PriceCardMob from "../Productcards/PricecardMob";

const ProductMob = ({ products }) => {
  return (
    <div className="px-4">
      <div className="grid grid-cols-2 gap-4">
        {products.map((product, idx) => (
          <PriceCardMob key={idx} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductMob;
