import React, { useEffect, useState } from 'react';
import Title from '../../Components/Title';
import WishListCard from '../../Components/Productcards/WishlistCard';
import { getWishlist, deleteWishlist } from "../../Service/API/Wishlist";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = sessionStorage.getItem("authToken"); // ✅ Correct token

  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    try {
      const data = await getWishlist(token);
      setWishlist(data);
    } catch (err) {
      console.error("Error fetching wishlist:", err);
    } finally {
      setLoading(false);
    }
  };

  const removeFromWishlist = async (wishlistId) => {
    try {
      await deleteWishlist(wishlistId, token);
      setWishlist(prev => prev.filter(item => item.id !== wishlistId));
    } catch (err) {
      console.error("Error deleting wishlist item:", err);
    }
  };

  return (
    <div className='bg-grey-50'>
      <Title title="WishList" />

      <div className={`px-6 ${wishlist.length === 0 ? "min-h-[60vh]" : ""}`}>
        {loading ? (
          <div className="flex justify-center items-center h-[30vh]">
            <div className="text-xl font-semibold">Loading...</div>
          </div>
        ) : wishlist.length === 0 ? (
          <div className="flex items-center justify-center h-[30vh]">
            <div className="bg-gradient-to-r from-yellow-100 via-yellow-200 to-yellow-100 text-yellow-900 px-8 py-6 shadow-xl text-center max-w-xl w-full">
              <p className="text-2xl font-bold mb-2">No products in your wishlist</p>
              <p className="text-base text-yellow-800">Start exploring and add your favorites now!</p>
            </div>
          </div>
        ) : (
          <div className="flex flex-wrap gap-4 justify-center sm:justify-start">
            {wishlist.map(item => (
              <WishListCard
                key={item.id}
                product={item}
                onRemove={(id) => removeFromWishlist(id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
