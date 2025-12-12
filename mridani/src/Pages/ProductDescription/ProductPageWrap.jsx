import React, { useEffect, useState } from 'react';
import ProductPage from './Productpage';
import ProductPageMob from './Responsive/ProductPageMob';

const ProductPageWrap = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 767);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 767);
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return isMobile ? <ProductPageMob /> : <ProductPage />;
};

export default ProductPageWrap;
