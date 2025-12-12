import { FiHeart } from "react-icons/fi";
import Title from "../../../Components/Title";

const products = [
    {
        name: "Mridani",
        title: "Hand-Embroidered Hand-Painted Murshidabad Silk Saree",
        price: "₹19,999",
        img: "https://ik.imagekit.io/siddharth637/outer_asset/plp/saree/description/pro47.webp?updatedAt=1750486189875",
      },
      {
        name: "Mridani",
        title: "Floral, Hand Embroidered Sujni Saree on Tussar Munga Silk",
        price: "₹21,499",
        img: "https://ik.imagekit.io/siddharth637/outer_asset/plp/saree/ten.webp?updatedAt=1748981724239",
      },
      {
        name: "Mridani",
        title: "Hand-embroidered Hand-painted Murshidabad Silk Saree",
        price: "₹33,999",
        img: "https://ik.imagekit.io/siddharth637/outer_asset/plp/saree/three.webp?updatedAt=1748981723990",
      },
      {
        name: "Mridani",
        title: "Hand-Painted Madhubani Mayur Saree",
        price: "₹14,999",
        img: "https://ik.imagekit.io/siddharth637/outer_asset/plp/saree/five.webp?updatedAt=1748981724751",
      },
      {
        name: "Mridani",
        title: "Hand-Painted Madhubani Mayur Saree",
        price: "₹21,899",
        img: "https://ik.imagekit.io/siddharth637/outer_asset/plp/saree/six.webp?updatedAt=1748981719188",
      },
      {
        name: "Mridani",
        title: "Hand-painted Madhubani Tussar Staple Silk Saree on Purple",
        price: "₹22,999",
        img: "https://ik.imagekit.io/siddharth637/outer_asset/plp/saree/twelve.webp?updatedAt=1748981723995",
      },
      {
        name: "Mridani",
        title: "Hand-painted Raas-Leela Madhubani Saree",
        price: "₹11,799",
        img: "https://ik.imagekit.io/siddharth637/outer_asset/plp/saree/three.webp?updatedAt=1748981723990",
      },
      {
        name: "Mridani",
        title: "Hand-Painted Radha Krishna Jhulan Madhubani Saree",
        price: "₹11,999",
        img: "https://ik.imagekit.io/siddharth637/outer_asset/plp/saree/ten.webp?updatedAt=1748981724239",
      },
];

const TrendingMob = () => {
    return (
        <div className="block lg:hidden px-4 py-10">
            <div className="text-center mb-6">
                <Title title="Trending" subtitle="Our trending products"/>
            </div>

            <div className="grid grid-cols-2 gap-4">
                {products.map((prod, idx) => (
                    <div key={idx} className="bg-white shadow rounded overflow-hidden">
                        <div className="relative">
                            <img src={prod.img} loading="lazy" alt={prod.title} className="w-full h-40 object-cover" />
                            <FiHeart className="absolute top-2 right-2 text-gray-500 hover:text-red-500" />
                        </div>
                        <div className="p-3">
                            <span className="text-xs text-gray-600 border px-2 py-1 rounded">{prod.name}</span>
                            <h3 className="text-sm font-semibold mt-2 line-clamp-2">{prod.title}</h3>
                            <div className="mt-2 flex justify-between items-center">
                                <span className="text-sm font-bold">{prod.price}</span>
                                <span className="bg-red-400 text-white text-xs px-2 py-1 rounded">Trending</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="text-center mt-6">
                <button className="bg-red-500 text-white font-semibold px-6 py-2 rounded hover:bg-red-800 transition">
                    View All →
                </button>
            </div>
        </div>
    );
};


export default TrendingMob;
