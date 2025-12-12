import React from "react";
import { FaFacebookF, FaInstagram } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-[#1e1e1e] text-white pt-12">
            {/* Newsletter */}
            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center pb-8 border-b border-gray-700">
                <h2 className="text-4xl md:text-3xl font-semibold text-center md:text-left mb-6 md:mb-0 max-w-2xl">
                    Fashion Forward: Stay In The Know With Our Newsletter
                </h2>
                <div className="flex items-center bg-white rounded-full p-1 shadow-md w-full max-w-[600px]">
                    <input
                        type="email"
                        placeholder="Your email"
                        className="flex-grow px-6 py-3 md:py-4 bg-transparent text-black placeholder-gray-500 focus:outline-none rounded-full text-base"
                    />
                    <button className="bg-black text-white rounded-full px-6 py-3 md:py-5 text-sm font-semibold uppercase tracking-wider hover:bg-[#333] transition-all duration-300">
                        Subscribe →
                    </button>
                </div>
            </div>

            {/* Footer content */}
            <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-10 text-sm">
                {/* Get in Touch */}
                <div>
                    <h4 className="text-[#E55353] font-bold uppercase mb-4">Get In Touch</h4>
                    <p className="mb-2">T: + (08) 9055 0269</p>
                    <p className="mb-2">E: mridani.patna@gmail.com</p>
                    <p>
                        1st Floor, Hira Place, <br />
                        Hira Place, Dak Bunglow Road
                    </p>
                </div>

                {/* Info */}
                <div>
                    <h4 className="text-[#E55353] font-bold uppercase mb-4">Information</h4>
                    <ul className="space-y-2">
                        <li>About Us</li>
                        <li>Privacy Policy</li>
                        <li>Refund Policy</li>
                        <li>Shipping Policy</li>
                        <li>Terms of Service</li>
                    </ul>
                </div>

                {/* Menu */}
                <div>
                    <h4 className="text-[#E55353] font-bold uppercase mb-4">Main Menu</h4>
                    <ul className="space-y-2">
                        <li>Home</li>
                        <li>About</li>
                        <li>Women's Wear</li>
                        <li>Men's Wear</li>
                        <li>Home Decor</li>
                        <li>Collection</li>
                        <li>Gift Items</li>
                        <li>Contact Us</li>
                    </ul>
                </div>

                {/* Description + Socials */}
                <div>
                    <h4 className="text-[#E55353] font-bold uppercase mb-4">Welcome to Mridani</h4>
                    <p className="mb-4 leading-relaxed">
                        At Mridani, we bring the timeless beauty of India’s rich cultural heritage to life through our handcrafted collections.
                        Our store is rooted in the celebration of folk art, blending centuries-old design traditions with modern elegance.
                    </p>
                    <div className="flex space-x-4">
                        <a href="#" className="text-white hover:text-[#E55353]">
                            <FaFacebookF size={18} />
                        </a>
                        <a href="#" className="text-white hover:text-[#E55353]">
                            <FaInstagram size={18} />
                        </a>
                    </div>
                </div>
            </div>

            {/* Copyright */}
            <div className="text-center text-xs text-gray-400 py-4 border-t border-gray-700">
                Copyright © 2024 Mridani. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
