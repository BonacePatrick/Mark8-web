"use client";

import React, { useState } from "react";

const CTA = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="bg-[#F5F5F5] py-10 px-4 sm:px-6 lg:px-8 my-5 rounded-xl">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between space-y-8 lg:space-y-0 lg:space-x-8">
        {/* Left Text Section */}
        <div className="text-center lg:text-left lg:w-1/2">
          <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-4">
            <span className="text-secondary">Open </span>your Store
          </h2>
        </div>

        {/* Email Input Form */}
        <div className="w-full lg:w-1/2 max-w-md">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row items-center"
          >
            <div className="relative w-full mb-4 sm:mb-0 sm:mr-4">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                {/* Email icon (replace with your SVG or FontAwesome icon) */}
                <svg
                  className="h-5 w-5 text-secondary"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
              </div>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 pr-4 py-2 w-full text-sm rounded-lg bg-gray-200 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#C1CF16]"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full flex items-center justify-center md:justify-start space-x-2 sm:w-auto px-6 py-2 hover:scale-105 bg-[#C1CF16] font-black text-black rounded-md hover:bg-white hover:border-secondary hover:border transition duration-500"
            >
              <span className="text-sm">Submit</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-4 text-black"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CTA;
