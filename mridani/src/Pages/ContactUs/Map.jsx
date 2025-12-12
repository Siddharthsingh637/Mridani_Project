import React from "react";

const Map = () => {
  return (
    <div className="relative w-full h-[400px]">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d230.29084150300526!2d85.11624567880206!3d25.61842988683769!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ed58e0341d3349%3A0x348b935a4765efcc!2sHira%20Place%2C%20Lodipur%2C%20Patna%2C%20Bihar%20800001!5e0!3m2!1sen!2sin!4v1716040921231!5m2!1sen!2sin"
        width="100%"
        height="100%"
        className="border-0"
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>

      <div className="absolute top-10 left-10 bg-white p-8 rounded-xl shadow-lg max-w-md">
        <h2 className="text-3xl font-semibold mb-3">Our store</h2>
        <p className="mb-2">
          Mridani, First Floor, Mridani, Hira Place, New Dak Bungalow Rd, Lodipur, Patna, Bihar 800001
        </p>
        <p className="mb-1">Mon – Sat, 11am – 7:30pm</p>
        <p className="mb-4">Sunday – 11:30am – 7:30pm</p>
        <a
          href="https://www.google.com/maps/dir/?api=1&destination=Hira+Place,+Lodipur,+Patna,+Bihar+800001"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-2 border rounded-full font-medium hover:bg-gray-100 transition"
        >
          <span>📍</span> Get Directions
        </a>
      </div>
    </div>
  );
};

export default Map;
