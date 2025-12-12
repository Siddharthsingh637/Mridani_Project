import React, { useEffect, useState } from "react";
import CartCard from "../../../../Components/Productcards/CartCard/CartCard";
import PricingMob from "./PricingMob";
import { getCart, deleteCart } from "../../../../Service/API/Cart";

const CartpageMob = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = sessionStorage.getItem("authToken");

  const fetchCartData = async () => {
    try {
      const data = await getCart(token);
      setCartItems(data);
    } catch (err) {
      console.error("Error fetching cart:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCartData();
  }, []);

  const handleRemoveFromCart = async (cartId) => {
    try {
      await deleteCart(cartId, token);
      fetchCartData();
    } catch (err) {
      console.error("Failed to delete:", err);
    }
  };

  return (
    <div className="relative min-h-screen bg-gray-50">
      {/* Header */}
      <div className="px-4 py-4 bg-gray-50 sticky top-0 z-10">
        <h2 className="text-xl font-bold">My Cart</h2>
      </div>

      {/* Cart Items */}
      <div className="p-4 space-y-4">
        {loading ? (
          <p>Loading...</p>
        ) : cartItems.length === 0 ? (
          <p className="text-center text-gray-500">Your cart is empty.</p>
        ) : (
          cartItems.map((item) => (
            <CartCard
              key={item.id}
              cartItem={item}
              token={token}
              onRemove={handleRemoveFromCart}
              onQuantityChange={fetchCartData}
            />
          ))
        )}
      </div>

      {/* Bottom Bar – PricingMob */}
      <PricingMob cartItems={cartItems} />
    </div>
  );
};

export default CartpageMob;
