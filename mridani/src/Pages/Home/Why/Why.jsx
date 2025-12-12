import React from "react";
import GridImage from "../../../assets/Home/grid.webp"; // Adjust the path if needed

const Why = () => {
  return (
    <div className="bg-white px-6 md:px-20 py-16" id="why">
      <div className="flex flex-col lg:flex-row items-center gap-12">
        {/* Left: Image Grid */}
        <div className="max-w-2xl w-full">
          <img
            src={GridImage}
            loading="lazy"
            alt="Saree Closeup"
            className="row-span-2 object-cover h-full w-full"
          />

        </div>

        {/* Right: Text Content */}
        <div className="flex-1">
          <h4 className="text-[12px] text-red-500 tracking-widest font-semibold uppercase mb-6">
            Why Madhubani?
          </h4>
          <h2 className="text-4xl font-semibold text-gray-900 mb-14">
            Madhubani @ Mridani
          </h2>
          <p className="text-gray-700 mb-4 leading-relaxed text-[15px]">
            Why Madhubani? The irresistible impulse to acknowledge the ancient styles of Mithila (Madhubani) painting is what Mridani has dreamt since past few years. It has always accounted to exhilarate the drudgery of the rural artisans. Artisans of various villages come up together at the rostrum of Mridani to show their skilled workmanship related to the art of Madhubani painting especially.
          </p>
          <p className="text-gray-700 leading-relaxed text-[15px]">
            Since the Madhubani paintings are confined to a limited geographical range, the themes, as well as the styles, are more or less the same. It has got its both nationwide and worldwide reflections through its thorough practices rooted from Mithilanchal. Mridani truly pays an emblematic homage to the Madhubani artists from Bihar with an exemplary range of handcrafted items created with unimpeachable craftsmanship and design aesthetics.
          </p>
          <button className="mt-15 px-6 py-2 border border-black text-black hover:bg-black hover:text-white transition duration-300 rounded-full font-medium">
            Read More
          </button>
        </div>
      </div>
    </div>
  );
};

export default Why;
