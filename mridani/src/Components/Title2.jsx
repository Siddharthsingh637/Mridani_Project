import React from 'react';

const Title2 = ({ title }) => {
  return (
    <div
      className="w-full h-[150px] sm:h-[180px] md:h-[210px] flex items-center justify-center text-white shadow-lg px-4 text-center"
      style={{
        background: 'linear-gradient(to right, black, #5c1a1b, black)',
      }}
    >
      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-wide font-['Playfair_Display'] drop-shadow-md">
        {title}
      </h1>
    </div>
  );
};

export default Title2;
