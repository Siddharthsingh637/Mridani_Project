import React from "react";
import GridImage from "../../../assets/Home/grid.webp"; // Adjust the path if needed

const WhyMob = () => {
  return (
    <div className="bg-white px-6 py-12" id="why">
      <div className="flex flex-col gap-8">
        {/* Text Content First */}
        <div>
          <h4 className="text-[12px] text-red-500 tracking-widest font-semibold uppercase mb-3">
            Why Madhubani?
          </h4>
          <h2 className="text-3xl font-semibold text-gray-900 mb-6">
            Madhubani @ Mridani
          </h2>
          <p className="text-gray-700 mb-4 leading-relaxed text-[15px]">
            Why Madhubani? The irresistible impulse to acknowledge the ancient styles of Mithila (Madhubani) painting is what Mridani has dreamt since past few years...
          </p>
          <p className="text-gray-700 leading-relaxed text-[15px]">
            Since the Madhubani paintings are confined to a limited geographical range...
          </p>
          <button className="mt-6 px-6 py-2 border border-black text-black hover:bg-black hover:text-white transition duration-300 rounded-full font-medium">
            Read More
          </button>
        </div>

        {/* Image Last */}
        <div>
          <img
            src={GridImage}
            alt="Saree Closeup"
            className="object-cover w-full rounded-md"
          />
        </div>
      </div>
    </div>
  );
};

export default WhyMob;
