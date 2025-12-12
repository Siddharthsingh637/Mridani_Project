import React from "react";
import Title from '../../Components/Title';


const Ask = () => {
  return (
    <div className="w-full bg-white py-8 px-4 md:px-24">
      <Title title="Got any Question" subtitle="ask here" />

      <form className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Name */}
        <div className="flex flex-col">
          <label className="mb-1 text-gray-700 font-medium text-sm">Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            className="px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black transition"
          />
        </div>

        {/* Email */}
        <div className="flex flex-col">
          <label className="mb-1 text-gray-700 font-medium text-sm">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            className="px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black transition"
          />
        </div>

        {/* Phone (full width) */}
        <div className="flex flex-col md:col-span-2">
          <label className="mb-1 text-gray-700 font-medium text-sm">Phone No.</label>
          <input
            type="tel"
            placeholder="Enter your phone number"
            className="px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black transition"
          />
        </div>

        {/* Message */}
        <div className="flex flex-col md:col-span-2">
          <label className="mb-1 text-gray-700 font-medium text-sm">Message</label>
          <textarea
            rows="4"
            placeholder="Write your message"
            className="px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black transition resize-none"
          ></textarea>
        </div>

        {/* Submit Button */}
        <div className="md:col-span-2 flex justify-center mt-1">
          <button
            type="submit"
            className="bg-black text-white px-6 py-2.5 rounded-md hover:bg-gray-800 transition text-sm"
          >
            Submit
          </button>
        </div>

        {/* reCAPTCHA Notice */}
        <p className="md:col-span-2 text-xs text-center text-gray-500 mt-1">
          This site is protected by reCAPTCHA and the Google{" "}
          <a
            href="https://policies.google.com/privacy"
            className="underline hover:text-black"
            target="_blank"
            rel="noopener noreferrer"
          >
            Privacy Policy
          </a>{" "}
          and{" "}
          <a
            href="https://policies.google.com/terms"
            className="underline hover:text-black"
            target="_blank"
            rel="noopener noreferrer"
          >
            Terms of Service
          </a>{" "}
          apply.
        </p>
      </form>
    </div>
  );
};

export default Ask;
