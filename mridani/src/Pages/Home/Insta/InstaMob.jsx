// InstaMob.jsx
import React from "react";
import one from '../../../assets/Home/insta/first.webp';
import two from '../../../assets/Home/insta/sec.webp';
import three from '../../../assets/Home/insta/third.webp';
import four from '../../../assets/Home/insta/fourth.webp';
import five from '../../../assets/Home/insta/five.webp';
import six from '../../../assets/Home/insta/seventh.webp';
import seven from '../../../assets/Home/insta/eight.webp';
import eight from '../../../assets/Home/insta/nineth.webp';
import nine from '../../../assets/Home/insta/tenth.webp';
import ten from '../../../assets/Home/insta/elev.webp';
import eleven from '../../../assets/Home/insta/twelth.webp';
import twelve from '../../../assets/Home/insta/sixth.webp';

const images = [
  one, two, three, four, five, six,
  seven, eight, nine, ten, eleven, twelve,
];

const InstaMob = () => {
  return (
    <div className="bg-white py-10 px-4" id="insta">
      <h2 className="text-center text-[#708135] text-3xl font-semibold mb-10">@Mridani.Madhubani</h2>
      <div className="grid grid-cols-4 gap-1">
        {images.map((src, index) => (
          <div
            key={index}
            className="relative group overflow-hidden"
          >
            <img
              src={src}
              alt={`Insta ${index + 1}`}
              loading="lazy"
              className="w-full h-[100px] object-cover transition-transform duration-300 transform group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 transition duration-300" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default InstaMob;
