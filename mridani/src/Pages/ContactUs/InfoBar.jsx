import React from "react";
import {
  MapPin,
  Phone,
  CheckCircle,
  Mail
} from "lucide-react";

const InfoBar = () => {
  const infoItems = [
    {
      icon: <MapPin className="w-40 h-6 text-black" />,
      title: "Address",
      text: "1st Floor, Hira Place, Hira Place, Dak Bunglow Road",
    },
    {
      icon: <Phone className="w-6 h-6 text-black" />,
      title: "Call Us",
      text: "(+877) 834-1434\n(+877) 834-1255",
    },
    {
      icon: <CheckCircle className="w-6 h-6 text-black" />,
      title: "Open",
      text: "Mon - Sat, 11am – 7:30pm\nSunday – 11:30am – 7:30pm",
    },
    {
      icon: <Mail className="w-6 h-6 text-black" />,
      title: "Emails",
      text: "mridani.patna@gmail.com",
    },
  ];

  return (
    <div className="w-full bg-white py-10 px-6 md:px-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 border-t border-gray-100">
      {infoItems.map((item, index) => (
        <div key={index} className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-full border border-dashed border-gray-300 flex items-center justify-center transition-all duration-300 hover:border-black hover:bg-gray-100 cursor-pointer">
  {item.icon}
</div>

          <div>
            <h4 className="text-lg font-semibold text-black mb-1">
              {item.title}
            </h4>
            <p className="text-gray-600 whitespace-pre-line">{item.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default InfoBar;
