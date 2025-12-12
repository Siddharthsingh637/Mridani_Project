import React from "react";
import {
  Truck,
  Headphones,
  RotateCcw,
  Gift,
} from "lucide-react";

const items = [
  {
    icon: <Truck className="w-8 h-8 mx-auto mb-2 text-black" />,
    title: "Free Shipping",
    desc: "From all orders over ₹5000",
  },
  {
    icon: <Headphones className="w-8 h-8 mx-auto mb-2 text-black" />,
    title: "Quality Support",
    desc: "24/7 online feedback",
  },
  {
    icon: <RotateCcw className="w-8 h-8 mx-auto mb-2 text-black" />,
    title: "Return & Refund",
    desc: "Return money within 3 days",
  },
  {
    icon: <Gift className="w-8 h-8 mx-auto mb-2 text-black" />,
    title: "Gift Voucher",
    desc: "10% off when you shop online",
  },
];

const InfoBarMob = () => {
  return (
    <div className="bg-[#f9f9f9] py-10 px-4">
      <div className="max-w-5xl mx-auto grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 gap-6 text-center">
        {items.map((item, index) => (
          <div key={index} className="flex flex-col items-center">
            {item.icon}
            <h4 className="text-base font-semibold text-black mb-1">
              {item.title}
            </h4>
            <p className="text-sm text-gray-600 leading-snug">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InfoBarMob;
