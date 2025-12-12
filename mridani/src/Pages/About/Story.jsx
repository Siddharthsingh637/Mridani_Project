import React from 'react';
import { motion } from 'framer-motion';
// import Image2 from '../../assets/About/ab2.webp';

const Story = () => {
  return (
    <div className="bg-[#fcf3ed] w-full py-20 px-4 flex flex-col items-center">
      
      {/* Text Section with Gradient Background */}
      <motion.div 
        className="w-full max-w-7xl h-auto bg-gradient-to-r from-black via-[#5c1a1b] to-black text-white text-center px-8 py-12 shadow-2xl"
        initial={{ opacity: 0, y: 50 }} 
        whileInView={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-wide">
          Our Story
        </h2>
        <p className="text-lg md:text-xl leading-relaxed max-w-5xl mx-auto">
          Born from a deep love for Indian culture and craftsmanship, <span className="font-semibold text-[#f9a8d4]">Mridani</span> was created to connect you with the timeless elegance of traditional Indian art. 
          Inspired by the vibrant culture of <span className="text-pink-300 font-medium">North Bihar</span>, especially the world-renowned <span className="italic text-pink-200">Madhubani art</span>, our store pays homage to folk traditions and the unparalleled skill of local artisans. 
          From exquisite sarees and suits to unique home décor items, we hand-pick and curate each piece, ensuring that every item resonates with the cultural richness of India.
        </p>
      </motion.div>

      {/* Image Section with subtle animation */}
      <motion.div 
        className="w-full py-16 px- md:px-20 flex justify-center"
        initial={{ opacity: 0, scale: 0.95 }} 
        whileInView={{ opacity: 1, scale: 1 }} 
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <img
          src='https://ik.imagekit.io/siddharth637/outer_asset/tinified/ab2.webp?updatedAt=1748981719323'
          loading="lazy"
          alt="Bihar Couture Runway"
          className=" shadow-xl w-full max-w-6xl object-cover"
        />
      </motion.div>
    </div>
  );
};

export default Story;
