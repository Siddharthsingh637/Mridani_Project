import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import Header from "./Header";
import OrderCard from "../../Components/OrderCard/OrderCard";
import OrderCardMob from "../../Components/OrderCard/OrderCardMob";
import { getOrders } from "../../Service/API/orders";
import { getProductById } from "../../Service/API/api";

const OrderPage = () => {
  const [orders, setOrders] = useState([]);
  const [sort, setSort] = useState("all");
  const [loading, setLoading] = useState(true);
  const isMobile = useMediaQuery({ maxWidth: 767 }); // Tailwind md breakpoint

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const rawOrders = await getOrders();

        const enrichedOrders = await Promise.all(
          rawOrders.map(async (order) => {
            const enrichedProducts = await Promise.all(
              order.products.map(async (product) => {
                try {
                  const productId = product.id || product.product_id;
                  if (!productId) {
                    console.warn("No valid product ID found:", product);
                    return product;
                  }

                  const productData = await getProductById(productId);
                  return { ...product, ...productData };
                } catch (err) {
                  console.error(`❌ Failed to fetch details for product ID ${product.id}`, err);
                  return product;
                }
              })
            );

            return {
              ...order,
              products: enrichedProducts,
            };
          })
        );

        setOrders(enrichedOrders);
      } catch (error) {
        console.error("❌ Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const filteredOrders = orders.filter((order) => {
    if (sort === "delivered") return order.status?.toLowerCase() === "delivered";
    if (sort === "notDelivered") return order.status?.toLowerCase() !== "delivered";
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50 px-4 md:px-10 pt-[50px] py-6 pt-0">
      <div className="max-w-6xl mx-auto">
        <Header sort={sort} setSort={setSort} />

        {loading ? (
          <p className="text-center text-gray-500 mt-20 text-lg">Loading orders...</p>
        ) : filteredOrders.length > 0 ? (
          <div className="mt-6 grid gap-6">
            {filteredOrders.map((order) =>
              isMobile ? (
                <OrderCardMob key={order.order_id} order={order} />
              ) : (
                <OrderCard key={order.order_id} order={order} />
              )
            )}
          </div>
        ) : (
          <p className="text-center text-gray-500 mt-20 text-lg">No orders found.</p>
        )}
      </div>
    </div>
  );
};

export default OrderPage;
