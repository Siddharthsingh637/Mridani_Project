import React, { useEffect } from 'react';
import BuyCard from '../../../../Components/Productcards/BuyCard/BuyCard';
import { useLocation } from 'react-router-dom';

const List = ({ products: propProducts, onProductsChange }) => {
  const location = useLocation();
  const stateProducts = location.state?.products || [];

  // Prefer propProducts, fallback to stateProducts from navigation
  const products = propProducts?.length ? propProducts : stateProducts;

  // Notify parent if new products arrived via route state
  useEffect(() => {
    if (onProductsChange) {
      onProductsChange(products);
    }
  }, [products, onProductsChange]);
  
  const total = products.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="h-full p-4 flex flex-col">
      <div className="overflow-y-auto max-h-[400px] pr-2">
        {products.map((product, index) => (
          <BuyCard key={index} product={product} />
        ))}
      </div>

      <hr className="my-4" />

      <div className="flex justify-between items-center text-lg font-semibold mt-auto">
        <h2 className="text-gray-700">Total</h2>
        <span className="text-gray-900">₹{total.toLocaleString()}</span>
      </div>
    </div>
  );
};

export default List;
