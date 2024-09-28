"use client";

import { useShopStore } from "@/store/shop-stores/shopStore";
import { FC, useEffect } from "react";

const StoreHero: FC = () => {
  const {
    setSearchTerm,
    fetchTopStores,
    totalStores,
    setCategory,
    clearSearchAndFetch,
    resetStores,
    searchTerm,
  } = useShopStore();

  useEffect(() => {
    fetchTopStores();
  }, []);

  const handleSearch = () => {
    setSearchTerm(searchTerm);
    resetStores();
    fetchTopStores();
  };

  const handleFilter = (category: string) => {
    if (category.toLowerCase() === "all") {
      clearSearchAndFetch();
    } else {
      setCategory(category.toLowerCase());
      resetStores();
      fetchTopStores();
    }
  };

  return (
    <section className="flex flex-col items-center justify-center mx-2 md:mx-6 rounded-xl px-4 py-16 mt-6 text-center Store-hero-bg space-y-6 md:py-24 lg:py-32">
      {/* Title */}
      <h1 className="text-3xl font-bold text-white md:text-4xl lg:text-5xl">
        <span className="text-[#c1cf16]">Mark8 </span>
        <span className="text-black">Stores</span>
      </h1>

      {/* Subtitle with total stores count */}
      <p className="text-sm text-gray-600 md:text-base lg:text-lg">
        {totalStores()} Stores
      </p>

      {/* Search Box */}
      <div className="relative w-full max-w-md mt-8">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3">
          {/* Search Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5 text-[#c1cf16]"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-4.35-4.35M10 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16z"
            />
          </svg>
        </div>

        <input
          type="text"
          placeholder="Search Stores"
          className="w-full pl-10 pr-10 py-3 rounded-lg bg-gray-100 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#c1cf16]"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
        />

        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
          {/* Filter Icon */}
          <div
            className="span text-black cursor-pointer"
            onClick={handleSearch}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 13.5V3.75m0 9.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 3.75V16.5m12-3V3.75m0 9.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 3.75V16.5m-6-9V3.75m0 3.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 9.75V10.5"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Category Buttons */}
      <div className="flex items-center space-x-2 mt-6">
        {["All", "Vectors", "Icons", "Backgrounds"].map((category) => (
          <button
            key={category}
            onClick={() => handleFilter(category)}
            className="px-3 md:px-6 py-2.5 rounded-2xl border text-sm font-medium text-black bg-gray-50 duration-500 transition hover:border-secondary hover:scale-105"
          >
            {category}
          </button>
        ))}
      </div>
    </section>
  );
};

export default StoreHero;
