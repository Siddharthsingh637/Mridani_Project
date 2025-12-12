import React, { useEffect, useState } from "react";
import CartCard from "../../../../Components/Productcards/CartCard/CartCard";
import Pricing from "./Pricing";
import Explore from "../../../../Components/Explore/Explore";
import { getCart, deleteCart } from "../../../../Service/API/Cart";

const Cartpage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = sessionStorage.getItem("authToken");

  // ✅ Unified function name: fetchCartData
  const fetchCartData = async () => {
    try {
      const data = await getCart(token);
      console.log("🛒 Cart API response:", data); // <== ADD THIS
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
    console.log("🔴 Trying to remove cart item with ID:", cartId);
    try {
      await deleteCart(cartId, token);
      console.log("✅ Removed successfully.");
      fetchCartData();
    } catch (err) {
      console.error("❌ Failed to delete:", err);
    }
  };
  

  return (
    <div className="flex h-[calc(100vh-180px)] overflow-hidden">
      {/* Pricing Sidebar */}
      <div className="w-full max-w-sm h-full overflow-hidden">
        <Pricing cartItems={cartItems} />
      </div>
  
      {/* Scrollable Cart Section */}
      <div className="flex-1 h-full overflow-y-auto bg-gray-50 p-6 space-y-4">
        {loading ? (
          <div>Loading...</div>
        ) : cartItems.length === 0 ? (
          <div className="text-center text-xl text-gray-500 mt-20">
            Your cart is empty.
          </div>
        ) : (
          <>
            {cartItems.map((item) => (
              <CartCard
                key={item.id}
                cartItem={item}
                token={token}
                onRemove={handleRemoveFromCart}
                onQuantityChange={fetchCartData}
              />
            ))}
            <Explore />
          </>
        )}
      </div>
    </div>
  );
  
  
};

export default Cartpage;
