import React from "react";
import {
  Truck,
  Headphones,
  RotateCcw,
  Gift,
} from "lucide-react";

const items = [
  {
    icon: <Truck className="w-10 h-10 mx-auto mb-4 text-black" />,
    title: "Free Shipping",
    desc: "From all orders over ₹5000",
  },
  {
    icon: <Headphones className="w-10 h-10 mx-auto mb-4 text-black" />,
    title: "Quality Support",
    desc: "24/7 online feedback",
  },
  {
    icon: <RotateCcw className="w-10 h-10 mx-auto mb-4 text-black" />,
    title: "Return & Refund",
    desc: "Return money within 3 days",
  },
  {
    icon: <Gift className="w-10 h-10 mx-auto mb-4 text-black" />,
    title: "Gift Voucher",
    desc: "10% off when you shop online",
  },
];

const InfoBar = () => {
  return (
    <div className="bg-[#f9f9f9] py-14 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 text-center">
        {items.map((item, index) => (
          <div key={index}>
            {item.icon}
            <h4 className="text-lg font-semibold text-black mb-1">
              {item.title}
            </h4>
            <p className="text-sm text-gray-500">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InfoBar;
